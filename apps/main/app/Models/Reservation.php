<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use App\Services\CacheInvalidationService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    /** @use HasFactory<\Database\Factories\ReservationFactory> */
    use HasFactory;

    protected $fillable = [
        'desk_id',
        'user_id',
        'reservation_date',
        'status',
    ];

    protected $casts = [
        'reservation_date' => 'date:Y-m-d',
        'status' => ReservationStatus::class,
    ];

    /*
    * Relationships
    */
    public function desk(): BelongsTo
    {
        return $this->belongsTo(Desk::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /*
    * Methods
    */
    public function changeStatus(ReservationStatus $status)
    {
        return $this->update([
            'status' => $status
        ]);
    }

    protected static function booted()
    {
        static::saved(function ($reservation) {
            $desk = $reservation->desk()->with('floor.office')->first();
            CacheInvalidationService::invalidateReservationCache(
                $reservation->desk_id,
                $reservation->reservation_date,
                $desk->floor->office->user_id
            );
        });

        static::deleted(function ($reservation) {
            $desk = $reservation->desk()->with('floor.office')->first();
            CacheInvalidationService::invalidateReservationCache(
                $reservation->desk_id,
                $reservation->reservation_date,
                $desk->floor->office->user_id
            );
        });
    }
}
