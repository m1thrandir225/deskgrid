<?php

use App\Http\Controllers\DeskController;
use Illuminate\Support\Facades\Route;

Route::resource('desk', DeskController::class)
    ->except(['index'])
    ->middleware('auth');
