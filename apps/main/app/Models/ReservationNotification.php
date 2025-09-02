<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationNotification extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        "user_id",
        "desk_id",
        "reservation_date",
        "notified"
    ];

    protected $casts = [
        "reservation_date" => "date",
        "notified" => "boolean"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function desk(): BelongsTo
    {
        return $this->belongsTo(Desk::class);
    }

    public function markAsNotified(): bool
    {
        return $this->update([
            "notified" => true
        ]);
    }

    public static function getPendingForDeskAndDate(int $deskId, string $date)
    {
        return static::with("user", 'desk.floor.office')
            ->where("desk_id", $deskId)
            ->where("reservation_date", $date)
            ->where("notified", false)
            ->orderBy('created_at')
            ->get();
    }
}
