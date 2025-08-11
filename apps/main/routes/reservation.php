<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('reservations', ReservationController::class);

    Route::get('/my-reservations', [ReservationController::class, 'myReservations'])
        ->name('reservations.my');
});



