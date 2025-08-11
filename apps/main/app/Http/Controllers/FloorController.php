<?php

namespace App\Http\Controllers;

use App\Http\Requests\Floor\CreateFloorRequest;
use App\Http\Requests\Floor\UpdateFloorRequest;
use App\Models\Floor;
use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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

    public function create(Office $office): Response
    {
        Gate::authorize('create', Floor::class);

        return Inertia::render('offices/floors/create', [
            "office" => $office
        ]);
    }

    public function store(CreateFloorRequest $request, Office $office): RedirectResponse
    {
        Gate::authorize('create', Floor::class);

        $validated = $request->validated();

        $filePath = $request->file('plan_image')->store('floor_plans');

        $floor = Floor::create([
            'office_id' => $validated['office_id'],
            'name' => $validated['name'],
            'plan_image' => $filePath,
        ]);
        return to_route('offices.floors.show', [$office->id, $floor->id]);
    }

    public function show(Office $office, Floor $floor): Response
    {
        Gate::authorize('view', $floor);
        $floor->load('desks');

        if (config('demo.enabled')) {
            $floor->plan_image_url = asset($floor->plan_image);
        } else {
            $floor->plan_image_url = Storage::url($floor->plan_image);
        }

        return Inertia::render('offices/floors/show', [
            "floor" => $floor,
            "office" => $office
        ]);
    }

    public function edit(Office $office, Floor $floor): Response
    {

        Gate::authorize('update', $floor);

        if (config('demo.enabled')) {
            $floor["plan_image_url"] = asset($floor["plan_image"]);
        } else {
            $floor["plan_image_url"] = Storage::url($floor["plan_image"]);
        }

        return Inertia::render('offices/floors/edit', [
            "office" => $office,
            "floor" => $floor,
        ]);
    }

    public function update(UpdateFloorRequest $request, Office $office, Floor $floor): RedirectResponse
    {
        //Gate::authorize('update', $floor);
        $validated = $request->validated();
        $dataToUpdate = [
            'name' => $validated['name'],
        ];

        if ($request->hasFile("plan_image")) {
            Storage::delete($floor->plan_image);
            $filePath = $request->file('plan_image')->store('floor_plans');
            $dataToUpdate["plan_image"] = $filePath;
        }

        $floor->update($dataToUpdate);

        return to_route('offices.floors.show', [$office->id, $floor->id]);
    }

    public function destroy(Office $office, Floor $floor): RedirectResponse
    {
        Gate::authorize('delete', $floor);

        $floor->delete();

        return to_route('offices.show', $office->id);
    }
}
