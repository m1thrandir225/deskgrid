<?php

namespace App\Http\Controllers;

use App\Http\Requests\Office\UpdateOfficeRequest;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        return Inertia::render('offices/create');
    }

    /**
    * Handle an incoming new office request
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
        ]);

        $user = $request->user();

        Office::create([
            'name' => $request->name,
            'address' => $request->address,
            'user_id' => $user->id
        ]);

        return to_route('offices.index');
    }

    /**
    * Show the current desk
    * -> should include all desks
    */
    public function show(Request $request)
    {
        $office = Office::query()->where('id', $request->office)->with(['floors'])->first();

        return Inertia::render('offices/show', [
            'office' => $office,
        ]);
    }

    /*
    * Show the edit form
    */
    public function edit(Office $office)
    {
        return Inertia::render('offices/edit', [
            'office' => $office,
        ]);
    }

    /*
    * Handle an edit request for the resource
    */

    public function update(UpdateOfficeRequest $request, Office $office): RedirectResponse
    {
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
        $office->delete();
        return to_route('offices.index');

    }
}
