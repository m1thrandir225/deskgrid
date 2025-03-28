<?php

namespace App\Http\Controllers;

use App\Models\Floor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        return Inertia::render('floors/create');
    }

    public function store(Request $request): RedirectResponse
    {
        return to_route('floors.index');
    }

    public function show(Floor $floor): Response
    {
        return Inertia::render('floors/show', [
            "floor" => $floor
        ]);
    }

    public function edit(Floor $floor): Response
    {
        return Inertia::render('floors/edit', [
            "floor" => $floor,
        ]);
    }

    public function update(Request $request, Floor $floor): RedirectResponse
    {
        return to_route('floors.show', $floor);
    }

    public function delete(Floor $floor): RedirectResponse
    {
        return to_route('floors.index');
    }
}
