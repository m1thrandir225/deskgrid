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
        Schema::create('reservation_notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->cascadeOnDelete();
            $table->foreignId("desk_id")->constrained()->cascadeOnDelete();
            $table->date("reservation_date");
            $table->boolean("notified")->default(false);
            $table->timestamps();

            $table->unique(['user_id', 'desk_id', 'reservation_date']);
            $table->index(['notified', 'desk_id', 'reservation_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_notifications');
    }
};
