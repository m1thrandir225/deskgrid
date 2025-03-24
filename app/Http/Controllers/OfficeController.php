<?php

namespace App\Http\Controllers;

use App\Models\Office;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfficeController extends Controller
{
    /**
    * Show the create office page.
    */
    public function create(Request $request): Response
    {
        return Inertia::render('desk/create', [
        ]);
    }

    /**
    * Handle an incoming new office request
    *
    * @throws \Illuminate\Validation\ValidationException
    */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([

        ]);

        $desk = Office::create([

        ]);

        return to_route('dashboard');
    }

    /**
    * Show the current desk
    * -> should include all desks
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
