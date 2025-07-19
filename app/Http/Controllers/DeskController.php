<?php

namespace App\Http\Controllers;

use App\Http\Requests\Desk\CreateDeskRequest;
use App\Http\Requests\Desk\CreateDesksRequest;
use App\Http\Requests\Desk\UpdateDeskRequest;
use App\Models\Desk;
use App\Models\Floor;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function storeMultiple(CreateDesksRequest $request): RedirectResponse
    {
        Gate::authorize('create', Desk::class);

        $validated = $request->validated();

        $floor = Floor::find($validated['floor_id']);
        $office = Office::find($validated['office_id']);

        DB::transaction(function () use ($validated) {

            // 1. Handle Deletions
            // Check if the 'desks_to_delete' array is not empty.
            if (!empty($validated['desks_to_delete'])) {
                Desk::destroy($validated['desks_to_delete']);
            }

            // 2. Handle Updates
            // Check if the 'desks_to_edit' array is not empty.
            if (!empty($validated['desks_to_edit'])) {
                foreach ($validated['desks_to_edit'] as $deskData) {
                    // Find the desk by its ID and update it.
                    // The existence of the ID is already verified by CreateDesksRequest.
                    $desk = Desk::find($deskData['id']);
                    if ($desk) {
                        $desk->update($deskData);
                    }
                }
            }

            // 3. Handle Creations
            // Check if the 'desks_to_create' array is not empty.
            if (!empty($validated['desks_to_create'])) {
                // Use `insert` for better performance with multiple records, as it
                // executes a single query. Note: `insert` does not trigger model
                // events (like 'creating' or 'created') and requires manual timestamps.
                $now = now();
                $desksToInsert = array_map(function ($deskData) use ($now) {
                    // You can add any other default fields here
                    $deskData['created_at'] = $now;
                    $deskData['updated_at'] = $now;
                    return $deskData;
                }, $validated['desks_to_create']);

                Desk::insert($desksToInsert);
            }
        });

        return to_route('offices.floors.show', [$office->id, $floor->id]);
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
            'desk_number' => $validated['desk_number'],
            'location_description' => $validated['location_description'],
            'x_position' => $validated['x_position'],
            'y_position' => $validated['y_position']
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
