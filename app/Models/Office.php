<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Office extends Model
{
    /** @use HasFactory<\Database\Factories\OfficeFactory> */
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'name',
        'address',
        'floor_plan_image'
    ];

    public function desks(): HasMany
    {
        return $this->HasMany(Desk::class);
    }
}
