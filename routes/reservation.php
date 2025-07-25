<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::resource('reservations', ReservationController::class)
    ->except(["show", "edit"])
    ->middleware('auth');
