<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::table('desks', function (Blueprint $table) {
            $table->index(['floor_id', 'is_active']);
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->index(['reservation_date', 'status']);

            $table->index(['user_id', 'reservation_date', 'status']);

            $table->index(['desk_id', 'reservation_date', 'status']);
        });

        Schema::table('floors', function (Blueprint $table) {
            $table->index('office_id');
        });

        Schema::table('reservation_notifications', function (Blueprint $table) {
            $table->index(['user_id', 'notified']);

            $table->dropIndex(['notified', 'desk_id', 'reservation_date']);
            $table->index(['desk_id', 'reservation_date', 'notified']);

            $table->index('reservation_date');
        });


        Schema::table('users', function (Blueprint $table) {
            $table->index(['email', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('desks', function (Blueprint $table) {
            $table->dropIndex(['floor_id', 'is_active']);
        });

        Schema::table('reservations', function (Blueprint $table) {
            $table->dropIndex(['reservation_date', 'status']);
            $table->dropIndex(['user_id', 'reservation_date', 'status']);
            $table->dropIndex(['desk_id', 'reservation_date', 'status']);
        });

        Schema::table('floors', function (Blueprint $table) {
            $table->dropIndex(['office_id']);
        });

        Schema::table('reservation_notifications', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'notified']);
            $table->dropIndex(['desk_id', 'reservation_date', 'notified']);
            $table->dropIndex(['reservation_date']);

            $table->index(['notified', 'desk_id', 'reservation_date']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['email', 'role']);
        });
    }
};
