<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    /**
    * Show the create reservation page.
    */
    public function create(Request $request): Response
    {
        return Inertia::render('desk/create', [
        ]);
    }

    /**
    * Handle an incoming new reservation request
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([

        ]);

        $desk = Reservation::create([

        ]);

        return to_route('dashboard');
    }

    /**
    * Show the current reservation
    */
    public function show(Request $request)
    {

    }

    /*
    * Show the edit form
    */
    public function edit(Request $request)
    {
    }

    /*
    * Handle an edit request for the resource
    */

    public function update(Request $request)
    {
    }

    /*
    * Show the destroy page
    * TODO: might not be needed
    */
    public function destroy()
    {
    }

    /*
    * Handle a elete request
    */
    public function delete()
    {
    }
}
