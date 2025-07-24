<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Http\Requests\Reservation\CreateReservationRequest;
use App\Http\Requests\Reservation\UpdateReservationRequest;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{

    public function index(): Response
    {
        $reservations = Reservation::query()->select()->get();
        return Inertia::render("reservations/index", [
            "reservations" => $reservations,
        ]);
    }

    /**
    * Show the create reservation page.
    */
    public function create(Request $request): RedirectResponse
    {
        return to_route("reservations.index");
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
            'user_id' => $validated['user_id'],
            'reservation_date' => $validated['reservation_date'],
            'status' => ReservationStatus::Approved
        ]);

        return to_route('reservations.index')->with('success', 'Reservation created successfully.');
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
