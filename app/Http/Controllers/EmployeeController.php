<?php

namespace App\Http\Controllers;

use App\Enums\UserRole;
use App\Http\Requests\Employee\CreateEmployeeRequest;
use App\Http\Requests\Employee\ImportEmployeesRequest;
use App\Http\Requests\Employee\UpdateEmployeeRequest;
use App\Mail\UserInvitationEmail;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        //
        $employees = User::query()
            ->get();

        return Inertia::render("employees/index", [
            "employees" => $employees,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
        return Inertia::render("employees/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateEmployeeRequest $request)
    {
        $validated = $request->validated();

        $exists = User::query()->where("email", $validated["email"])->first();
        if($exists) {
            return redirect("/employees/create")->with("error", "Email already exists");
        }

        $user = User::create([
            "name" => $validated["first_name"] . " " . $validated["last_name"],
            "email" => $validated["email"],
            "role" => UserRole::Employee,
            "password" => null
        ]);

        $token = Password::broker()->createToken($user);

        $passwordSetupUrl = url(route("password.reset", [
            "token" => $token,
            "email" => $user->email,
        ], false));

        Mail::to($user->email)->send(new UserInvitationEmail($user, $passwordSetupUrl));

        return to_route("employees.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, User $employee)
    {
        //
        $validated = $request->validated();

        $employee->update($validated);

        return redirect("employees.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $employee)
    {
        $employee->delete();
        return redirect("employees.index");
        //
    }

    /**
     * Show the import page
     */
    public function showImportPage(): Response
    {
        return Inertia::render("employees/import");
    }

    /**
     *  Import multiple employees in bulk
     */
    public function storeMultiple(ImportEmployeesRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $file = $request->file("import_file");
        $path = $file->getRealPath();

        $records = array_map("str_getcsv", file($path));

        array_shift($records);

        foreach($records as $record) {
            $name = $record[0] ?? null;
            $email = $record[1] ?? null;

            $validator = Validator::make(
                ['name' => $name, 'email' => $email],
                ['name' => 'required|string', 'email' => 'required|email|unique:users,email']
            );
            if($validator->fails()) {
                continue;
            }

            $user = User::create([
                'name' => $name,
                'email' => $email,
                'role' => UserRole::Employee,
                'password' => null
            ]);

            $token = Password::broker()->createToken($user);

            $passwordSetupUrl = url(route("password.reset", [
                "token" => $token,
                "email" => $user->email,
            ], false));

            Mail::to($user->email)->send(new UserInvitationEmail($user, $passwordSetupUrl));
        }
        return to_route("employees.index");
    }

    public function resendInvitation(User $user) {
        if($user->password != null) {
            return redirect()->back()->with("error", "This user has already set a password");
        }

        $token = Password::broker()->createToken($user);
        $passwordSetupUrl = url(route("password.reset", [
            "token" => $token,
            "email" => $user->email,
        ], false));

        Mail::to($user->email)->send(new UserInvitationEmail($user, $passwordSetupUrl));

        return redirect()->back()->with("message", "Invitation resent to {$user->name}.");
    }
}
