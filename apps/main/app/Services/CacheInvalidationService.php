<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheInvalidationService
{
    public static function invalidateOfficeCache(int $officeId, int $userId): void
    {
        Cache::forget("all_offices");
        Cache::forget("user_offices_{$userId}");
        Cache::forget("office_floors_{$officeId}");
        Cache::forget("dashboard_stats_{$userId}");

        Cache::tags(["office_{$officeId}"])->flush();
    }

    public static function invalidateFloorCache(int $floorId, int $officeId, int $userId): void
    {
        Cache::forget("floor_desks_{$floorId}");
        Cache::forget("office_floors_{$officeId}");
        Cache::forget("dashboard_stats_{$userId}");
    }

    public static function invalidateDeskCache(int $deskId, int $floorId, int $officeId, int $userId): void
    {
        Cache::forget("floor_desks_{$floorId}");
        Cache::forget("dashboard_stats_{$userId}");

        $today = now();
        for ($i = 0; $i < 14; $i++) {
            $date = $today->copy()->addDays($i)->toDateString();
            Cache::forget("desk_availability_{$deskId}_{$date}");
        }
    }

    public static function invalidateReservationCache(int $deskId, string $reservationDate, int $userId): void
    {
        Cache::forget("desk_availability_{$deskId}_{$reservationDate}");
        Cache::forget("desk_global_availability_{$deskId}_{$reservationDate}");
        Cache::forget("dashboard_stats_{$userId}");

        $patterns = ["user_reservations_{$userId}_*"];
        foreach ($patterns as $pattern) {
            $today = now();
            for ($i = -7; $i <= 7; $i++) {
                $date = $today->copy()->addDays($i);
                $startWeek = $date->copy()->startOfWeek()->toDateString();
                $endWeek = $date->copy()->addDays(4)->toDateString();
                Cache::forget("user_reservations_{$userId}_{$startWeek}_{$endWeek}");
            }
        }
    }
}
