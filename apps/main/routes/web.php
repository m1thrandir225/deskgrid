<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $hasUsers = User::where('role', UserRole::Admin)->exists();
    if ($hasUsers) {
        return redirect()->route("login");
    } else {
        return redirect()->route("register");
    }
})->name('home');

Route::middleware(['auth', 'verified', "admin"])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/office.php';
require __DIR__.'/floor.php';
require __DIR__.'/desk.php';
require __DIR__.'/reservation.php';
require __DIR__.'/employees.php';
