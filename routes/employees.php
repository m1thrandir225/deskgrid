<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;


Route::get("employees/import", [EmployeeController::class, "showImportPage"])
    ->name("employees.import")

    ->middleware("auth");

Route::post("employees/import", [EmployeeController::class, "storeMultiple"])
    ->name('employees.storeMultiple')
    ->middleware('auth');

Route::post("/employees/{employee}/resend-invitation", [EmployeeController::class, "resendInvitation"])
    ->name("employees.resend")
    ->middleware("auth");

Route::resource("employees", EmployeeController::class)
    ->except(["show"])
    ->middleware('auth');


