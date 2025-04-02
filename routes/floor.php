<?php

use App\Http\Controllers\FloorController;
use Illuminate\Support\Facades\Route;

Route::resource('offices.floors', FloorController::class)
    ->middleware('auth');
