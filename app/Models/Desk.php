<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Desk extends Model
{
    /** @use HasFactory<\Database\Factories\DeskFactory> */
    use HasFactory;

    protected $fillable = [
        'office_id',
        'desk_number',
        'location_description',
        'x_position',
        'y_position',
        'is_active'
    ];

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }
}
