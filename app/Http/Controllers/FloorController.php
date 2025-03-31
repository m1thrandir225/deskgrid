<?php

namespace App\Http\Controllers;

use App\Http\Requests\Floor\CreateFloorRequest;
use App\Http\Requests\Floor\UpdateFloorRequest;
use App\Models\Floor;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class FloorController extends Controller
{
    public function index(Request $request): Response
    {
        $floors = Floor::query()->with(['office'])->get();

        return Inertia::render('floors/index', [
            'floors' => $floors
        ]);
    }

    public function create(Request $request): Response
    {
        Gate::authorize('create', Floor::class);

        return Inertia::render('floors/create');
    }

    public function store(CreateFloorRequest $request): RedirectResponse
    {
        Gate::authorize('create', Floor::class);

        $validated = $request -> validated();

        //TODO: implement file upload

        Floor::create([
            'office_id' => $validated['office_id'],
            'name' => $validated['name'],
            'plan_image' => $validated['plan_image']
        ]);
        return to_route('floors.index');
    }

    public function show(Floor $floor): Response
    {
        Gate::authorize('view', $floor);

        return Inertia::render('floors/show', [
            "floor" => $floor
        ]);
    }

    public function edit(Floor $floor): Response
    {
        Gate::authorize('update', $floor);

        return Inertia::render('floors/edit', [
            "floor" => $floor,
        ]);
    }

    public function update(UpdateFloorRequest $request, Floor $floor): RedirectResponse
    {
        Gate::authorize('update', $floor);

        $validated = $request->validated();

        $floor->update([
            'name' => $validated['name'],
            'plan_image' => $validated['plan_image']
        ]);

        return to_route('floors.show', $floor->id);
    }

    public function delete(Floor $floor): RedirectResponse
    {
        Gate::authorize('delete', $floor);

        $floor->delete();

        return to_route('floors.index');
    }
}
