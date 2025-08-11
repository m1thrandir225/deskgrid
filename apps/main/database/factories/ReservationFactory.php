<?php

namespace Database\Factories;

use App\Enums\ReservationStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'reservation_date' => fake()->dateTimeBetween('+1day', '+1 year'),
            'status' => ReservationStatus::Approved
        ];
    }

    public function cancelled()
    {
        return $this->state([
            'status' => ReservationStatus::Cancelled
        ]);
    }

    public function pending()
    {
        return $this->state([
            'status' => ReservationStatus::Pending
        ]);
    }
}
