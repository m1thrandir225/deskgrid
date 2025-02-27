<?php

use App\Enums\ReservationStatus;
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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId("desk_id")->constrained();
            $table->foreignId("user_id")->constrained();
            $table->date("reservation_date");
            $table->enum("status", array_column(ReservationStatus::cases(), 'value'))->default(ReservationStatus::Pending);
            $table->timestamps();

            $table->unique(["desk_id", "reservation_date"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
