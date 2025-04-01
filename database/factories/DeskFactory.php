<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Desk>
 */
class DeskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'desk_number' => fake()->buildingNumber(),
            'location_description' => fake()->realText(),
            'x_position' => fake()->numberBetween(0, 1280),
            "y_position" => fake()->numberBetween(0, 900),
            'is_active' => fake()->boolean()
        ];
    }
}
