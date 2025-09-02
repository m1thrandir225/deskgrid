<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Http\Requests\Reservation\CreateReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Jobs\SendReservationCancelledNotifications;
use App\Models\Desk;
use App\Models\Floor;
use App\Models\Office;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ReservationController extends Controller
{
    public function index(Request $request): Response
    {
        $offices = Office::query()->get();
        $selectedOfficeId = $request->input('office_id');
        $selectedFloorId = $request->input('floor_id');


        $startDate = $request->date('start_date') ?? now();
        $endDate = $request->date('end_date') ?? $startDate->copy()->endOfWeek();


        $floors = collect();

        if ($selectedOfficeId) {
            $floors = Floor::query()
                ->where('office_id', $selectedOfficeId)
                ->get();

            $floors->each(function ($floor) {
                if (config('demo.enabled')) {
                    $floor->plan_image_url = asset($floor->plan_image);
                } else {
                    $floor->plan_image_url = asset(Storage::url($floor->plan_image));
                }
            });
        }

        $desks = collect();

        if ($selectedFloorId) {
            $desks = Desk::query()
                ->with("floor")
                ->with(['reservations' => function ($query) use ($startDate, $endDate) {
                    $query
                        ->whereBetween('reservation_date', [
                            $startDate->toDateString(),
                            $endDate->toDateString(),
                        ])
                        ->whereNotIn("status", [ReservationStatus::Cancelled])
                        ->with("user:id,name,email")
                        ->get();
                }])
                ->where('floor_id', $selectedFloorId)
                ->get();
        }

        return Inertia::render("reservations/index", [
            "offices" => $offices,
            "floors" => $floors,
            "desks" => $desks,
            "filters" => [
                "office_id" => $selectedOfficeId,
                "floor_id" => $selectedFloorId,
                "start_date" => $startDate->toDateString(),
                "end_date" => $endDate->toDateString(),

            ]
        ]);
    }

    /**
     * Show the create reservation page.
     */
    public function create(Request $request): RedirectResponse
    {
        return to_route("reservations.index", $request->all());
    }

    /**
     * Handle an incoming new reservation request
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(CreateReservationRequest $request): RedirectResponse
    {
        Gate::authorize('create', Reservation::class);

        $validated = $request->validated();

        $desk = Desk::with('floor.office')->findOrFail($validated['desk_id']);
        $office = $desk->floor->office;

        $officeToday = $office->getTodayInOfficeTimezone();
        $reservationDate = Carbon::parse($validated['reservation_date']);

        if ($reservationDate->isSameDay($officeToday)) {
            $officeCurrentTime = $office->getCurrentTime();
            if ($officeCurrentTime->hour >= 8) {
                return back()->with("error", "Reservations for today can only be made before 8 AM office time ({$office->timezone}).");
            }
        }

        try {
            DB::transaction(function () use ($validated, $request, $reservationDate) {
                $existingUserReservation = Reservation::query()
                    ->where("user_id", $request->user()->id)
                    ->where("reservation_date", $reservationDate->toDateString())
                    ->whereNotIn("status", [ReservationStatus::Cancelled])
                    ->lockForUpdate()
                    ->first();


                if ($existingUserReservation) {
                    throw new \Exception("You already have a reservation for this date. Please cancel your existing reservation before making a new one.");
                }

                $existingDeskReservation = Reservation::query()
                    ->where('desk_id', $validated['desk_id'])
                    ->where('reservation_date', $reservationDate->toDateString())
                    ->whereNotIn("status", [ReservationStatus::Cancelled])
                    ->lockForUpdate()
                    ->first();

                if ($existingDeskReservation) {
                    throw new \Exception("This desk is already reserved for the selected date.");
                }

                Reservation::create([
                    'desk_id' => $validated['desk_id'],
                    'user_id' => $request->user()->id,
                    'reservation_date' => $reservationDate->toDateString(),
                    'status' => ReservationStatus::Approved
                ]);
            });

            return back()->with("message", "Reservation created successfully");
        } catch (\Exception $e) {
            return back()->with("error", $e->getMessage());
        }
    }

    /**
     * Show the current reservation
     */
    public function show(Reservation $reservation): RedirectResponse
    {
        return to_route("reservations.index", $reservation);
    }

    /*
    * Show the edit form
    */
    public function edit(Reservation $reservation): RedirectResponse
    {
        return to_route("reservations.index");
    }

    /*
    * Handle an edit request for the resource
    */

    public function update(UpdateReservationRequest $request, Reservation $reservation): RedirectResponse
    {
        Gate::authorize('update', $reservation);

        $validated = $request->validated();

        $reservation->update([
            'status' => $validated['status'],
            'reservation_date' => $validated['reservation_date']
        ]);

        return to_route('reservations.show', $reservation->desk_id)->with("message", "Reservation updated successfully");
    }

    /*
    * Handle a delete request
    */
    public function destroy(Reservation $reservation): RedirectResponse
    {
        Gate::authorize('delete', $reservation);

        $deskId = $reservation->desk_id;
        $reservationDate = $reservation->reservation_date->toDateString();

        $reservation->update([
            "status" => ReservationStatus::Cancelled
        ]);

        //Send notification to the users who are waiting for this desk
        SendReservationCancelledNotifications::dispatch($deskId, $reservationDate);

        return back()->with("message", "Reservation cancelled.");
    }

    public function myReservations(Request $request): Response
    {
        $startDate = $request->date('start_date') ?? now()->startOfWeek();
        $endDate = $request->date('end_date') ?? $startDate->copy()->addDays(4); // Friday

        $reservations = $request->user()
            ->reservations()
            ->with([
                'desk.floor.office',
            ])
            ->whereBetween('reservation_date', [
                $startDate->toDateString(),
                $endDate->toDateString(),
            ])
            ->whereNotIn('status', [ReservationStatus::Cancelled])
            ->orderBy('reservation_date')
            ->get();

        $reservations->each(function ($reservation) {
            $floor = $reservation->desk->floor;
            if ($floor) {
                $plan_image = $reservation->desk->floor()->first()->plan_image;
                if (config("demo.enabled")) {
                    $reservation->desk->floor->plan_image_url = asset($plan_image);
                } else {
                    $reservation->desk->floor->plan_image_url = asset(Storage::url($plan_image));
                }
            }
        });

        return Inertia::render("reservations/my-reservations", [
            "reservations" => $reservations,
            "filters" => [
                "start_date" => $startDate->toDateString(),
                "end_date" => $endDate->toDateString(),
            ]
        ]);
    }
}
