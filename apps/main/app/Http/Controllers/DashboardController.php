<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Enums\UserRole;
use App\Models\Desk;
use App\Models\Office;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $stats = Cache::remember("dashboard_stats_{$userId}", 300, function () use ($userId) {
            return [
                'total_offices' => Office::where('user_id', $userId)->count(),
                'total_desks' => Desk::whereHas('floor.office', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })->count(),
                'total_employees' => User::where('role', UserRole::Employee)->count(),
                'todays_reservations' => Reservation::whereDate('reservation_date', today())
                    ->whereNotIn('status', [ReservationStatus::Cancelled])
                    ->whereHas('desk.floor.office', function ($query) use ($userId) {
                        $query->where('user_id', $userId);
                    })
                    ->count(),
            ];
        });

        return Inertia::render('dashboard', compact('stats'));
    }
}
