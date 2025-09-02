<?php

namespace App\Http\Requests\Reservation;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class CreateReservationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "desk_id" => ["required", "exists:desks,id"],
            "reservation_date" => [
                "required",
                "date",
                "after_or_equal:today",
                "before:" . now()->addDays(14)->toDateString(), // max 2 weeks  from now,
                function ($attribute, $value, $fail) {
                    $date = Carbon::parse($value);
                    if ($date->isWeekend()) {
                        $fail('Reservations can only be made for weekdays.');
                    }
                }
            ],
        ];
    }
}
