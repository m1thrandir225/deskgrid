<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Http\Requests\Reservation\CreateReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Models\Desk;
use App\Models\Floor;
use App\Models\Office;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function index(Request $request): Response
    {
        $offices = Office::query()->get();
        $selectedOfficeId = $request->input('office_id');
        $selectedFloorId = $request->input('floor_id');

        $reservationDate = $request->date('reservation_date');

        if (!$reservationDate) {
            $reservationDate = today();
        }
//        if($reservationDate->isAfter(today()->addDay())) {
//            $reservationDate = today()->addDay();
//        }

        $floors = collect();
        if($selectedOfficeId) {
            $floors = Floor::query()
                ->where('office_id', $selectedOfficeId)
                ->get();
        }

        $desks = collect();

        if($selectedFloorId) {
            $desks = Desk::query()
                ->with("floor")
                ->with(['reservations' => function ($query) use ($reservationDate) {
                    $query
                        ->where('reservation_date', $reservationDate->toDateString())
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
                "reservation_date" => $reservationDate->toDateString(),
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

        $reservation = Reservation::create([
            'desk_id' => $validated['desk_id'],
            'user_id' => $request->user()->id,
            'reservation_date' => $validated['reservation_date'],
            'status' => ReservationStatus::Approved
        ]);

        return to_route('reservations.index')->with('message', 'Reservation created successfully.');
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
    public function delete(Reservation $reservation): RedirectResponse
    {
        Gate::authorize('delete', $reservation);

        $reservation->delete();

        return to_route('reservations.index')->with("message", "Reservation deleted.");
    }
}
