<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;


Route::get("employees/import", [EmployeeController::class, "showImportPage"])
    ->name("employees.import")
    ->middleware("auth");

Route::post("employees/import", [EmployeeController::class, "storeMultiple"])
    ->name('employees.storeMultiple')
    ->middleware('auth');

Route::resource("employees", EmployeeController::class)
    ->middleware('auth');


