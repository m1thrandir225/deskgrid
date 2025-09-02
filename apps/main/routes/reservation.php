<?php

use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ReservationNotificationController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('reservations', ReservationController::class);

    Route::get('/my-reservations', [ReservationController::class, 'myReservations'])
        ->name('reservations.my');

    Route::prefix("reservation-notifications")->group(function () {
        Route::get('/', [ReservationNotificationController::class, 'index'])
            ->name('reservation-notifications.index');
        Route::post('/', [ReservationNotificationController::class, 'store'])
            ->name('reservation-notifications.store');
        Route::delete('/{notification}', [ReservationNotificationController::class, 'destroy'])
            ->name('reservation-notifications.destroy');
        Route::post('/check-availability', [ReservationNotificationController::class, 'checkAvailability'])
            ->name('reservation-notifications.check-availability');
    });
});
