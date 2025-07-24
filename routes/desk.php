<?php

use App\Http\Controllers\DeskController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "admin"])->group(function () {
    Route::resource('desk', DeskController::class)
        ->except(['index']);

    Route::post("/desk/multiple", [DeskController::class, "storeMultiple"])
        ->name("desk.storeMultiple");
});

