<?php

use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

Route::resource('reservation', ReservationController::class)
    ->middleware('auth');
