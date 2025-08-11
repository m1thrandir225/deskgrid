<?php

namespace App\Providers;

use App\Enums\UserRole;
use App\Models\Floor;
use App\Models\Office;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\ServiceProvider;

class DemoUserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (!config("demo.enabled")) {
            return;
        }
        $adminEmail = config("demo.admin_email");
        $userEmail = config("demo.user_email");
        $password = config("demo.password");

        if (!User::where('email', $adminEmail)->exists()) {
            User::create([
                'name' => 'Demo Admin',
                'email' => $adminEmail,
                'password' => Hash::make($password),
                "role" => UserRole::Admin
            ]);
        }

        if (!User::where('email', $userEmail)->exists()) {
            User::create([
                'name' => 'Demo User',
                'email' => $userEmail,
                'password' => Hash::make($password),
                "role" => UserRole::Employee
            ]);
        }

        if (Office::where('name', 'Demo Office')->doesntExist()) {
            $office = Office::create([
                'name' => 'Demo Office',
                'address' => '123 Demo Street',
                'user_id' => User::where('email', $adminEmail)->first()->id,
            ]);

            Floor::create([
                'name' => 'Ground Floor',
                'office_id' => $office->id,
                'plan_image' => 'floor_plans/ground_floor.png'
            ]);
            Floor::create([
                'name' => 'First Floor',
                'office_id' => $office->id,
                'plan_image' => 'floor_plans/first_floor.png'
            ]);
        }
    }
}
