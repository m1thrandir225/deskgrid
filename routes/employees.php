<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;


Route::middleware(["auth", "admin"])->group(function () {
    Route::get("employees/import", [EmployeeController::class, "showImportPage"])
        ->name("employees.import");

    Route::post("employees/import", [EmployeeController::class, "storeMultiple"])
        ->name('employees.storeMultiple');

    Route::post("/employees/{employee}/resend-invitation", [EmployeeController::class, "resendInvitation"])
        ->name("employees.resend");

    Route::resource("employees", EmployeeController::class)
        ->except(["show"]);
});

