<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Floor;
use App\Models\User;

class FloorPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Floor $floor): bool
    {
        $floor->load('office.user');

        $floor_user_id = $floor->office->user->id;
        return $user->id === $floor_user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === UserRole::Admin;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Floor $floor): bool
    {
        $$floor->load('office.user');

        $floor_user_id = $floor->office->user->id;

        return $user->id === $floor_user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Floor $floor): bool
    {
        $floor->load('office.user');

        $floor_user_id = $floor->office->user->id;

        return $user->id === $floor_user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Floor $floor): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Floor $floor): bool
    {
        return false;
    }
}
