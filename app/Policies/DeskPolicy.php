<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Desk;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DeskPolicy
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
    public function view(User $user, Desk $desk): bool
    {
        $employer_id = $desk->floor()->office()->employer()->id;
        return $user->id === $employer_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {

        return $user->role() === UserRole::Admin;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Desk $desk): bool
    {
        $employer_id = $desk->floor()->office()->employer()->id;
        return $user->id === $employer_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Desk $desk): bool
    {
        $employer_id = $desk->floor()->office()->employer()->id;
        return $user->id === $employer_id;

    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Desk $desk): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Desk $desk): bool
    {
        return false;
    }
}
