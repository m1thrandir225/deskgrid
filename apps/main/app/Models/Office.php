<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    /** @use HasFactory<\Database\Factories\OfficeFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        "timezone"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function floors(): HasMany
    {
        return $this->hasMany(Floor::class);
    }

    public function getCurrentTime(): Carbon
    {
        return now()->setTimezone($this->timezone);
    }

    public function isBusinessHours(): bool
    {
        $currentTime = $this->getCurrentTime();

        return $currentTime->hour >= 8 && $currentTime->hour < 18 && !$currentTime->isWeekend();
    }

    public function getTodayInOfficeTimezone(): Carbon
    {
        return $this->getCurrentTime()->startOfDay();
    }
}
