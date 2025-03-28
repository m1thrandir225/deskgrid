<?php

namespace App\Http\Controllers;

use App\Http\Requests\Office\CreateOfficeRequest;
use App\Http\Requests\Office\UpdateOfficeRequest;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class OfficeController extends Controller
{
    /**
    * Render index page for all offices that are avaliable to
    * the user
    */
    public function index(Request $request): Response
    {
        $user = $request->user();

        $offices = Office::query()->where('user_id', $user->id)->get();

        return Inertia::render('offices/index', [
            'offices' => $offices
        ]);
    }
    /**
    * Show the create office page.
    */
    public function create(Request $request): Response
    {
        Gate::authorize('create', Office::class);

        return Inertia::render('offices/create');
    }

    /**
    * Handle an incoming new office request
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function store(CreateOfficeRequest $request): RedirectResponse
    {
        Gate::authorize('create', Office::class);

        $validated = $request->validated();
        $user = $request->user();

        Office::create([
            'name' => $validated['name'],
            'address' => $validated['address'],
            'user_id' => $user->id
        ]);

        return to_route('offices.index');
    }

    /**
    * Show the current desk
    * -> should include all desks
    */
    public function show(Office $office)
    {

        Gate::authorize('view', $office);

        return Inertia::render('offices/show', [
            'office' => $office,
        ]);
    }

    /*
    * Show the edit form
    */
    public function edit(Office $office)
    {
        Gate::authorize('update', $office);

        return Inertia::render('offices/edit', [
            'office' => $office,
        ]);
    }

    /*
    * Handle an edit request for the resource
    */

    public function update(UpdateOfficeRequest $request, Office $office): RedirectResponse
    {
        Gate::authorize('update', $office);

        $validated = $request->validated();

        $office->update([
            'name' => $validated['name'],
            'address' => $validated['address']
        ]);

        return to_route('offices.show', $office->id);
    }

    /*
    * Handle a delete request
    */
    public function destroy(Office $office): RedirectResponse
    {
        Gate::authorize('delete', $office);

        $office->delete();
        return to_route('offices.index');

    }
}
