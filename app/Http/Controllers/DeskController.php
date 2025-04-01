<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\CreateDeskRequest;
use App\Http\Requests\Desk\UpdateDeskRequest;
use App\Models\Desk;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DeskController extends Controller
{
    /**
    * Show the create desk page.
    */
    public function create(Request $request): Response
    {
        Gate::authorize('create', Desk::class);

        return Inertia::render('desk/create', [
        ]);
    }

    /**
    * Handle an incoming new desk request
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function store(CreateDeskRequest $request): RedirectResponse
    {
        Gate::authorize('create', Desk::class);

        $validated = $request->validated();

        Desk::create([
            'floor_id' => $validated['floor_id'],
            'desk_number' => $validated['desk_number'],
            'location_description' => $validated['location_description'],
            'x_position' => $validated['x_position'],
            'y_position' => $validated['y_position']
        ]);

        return to_route('dashboard');
    }

    /**
    * Show the current desk
    * -> should include all reservations
    */
    public function show(Desk $desk): Response
    {
        Gate::authorize('view', $desk);

        return Inertia::render('desks/show', [
            'desk' => $desk
        ]);
    }

    /*
    * Show the edit form
    */
    public function edit(Desk $desk): Response
    {
        Gate::authorize('update', $desk);
        return Inertia::render("desks/edit", [
            "desk" => $desk
        ]);
    }

    /*
    * Handle an edit request for the resource
    */

    public function update(UpdateDeskRequest $request, Desk $desk): RedirectResponse
    {
        Gate::authorize('update', $desk);


        $validated = $request->validated();

        $desk->update([
            ''
        ]);
        return to_route('desks.show', $desk->id);
    }


    /*
    * Handle a delete request
    */
    public function delete(Desk $desk): RedirectResponse
    {
        Gate::authorize('delete', $desk);

        $desk->delete();
        return to_route('desks.index');
    }
}
