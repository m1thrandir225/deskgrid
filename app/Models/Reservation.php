<?php

namespace App\Models;

use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function desk(): BelongsTo
    {
        return $this->belongsTo(Desk::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function changeStatus(ReservationStatus $status)
    {
        return $this->update([
            'status' => $status
        ]);
    }
}
