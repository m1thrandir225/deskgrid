<?php

namespace App\Console\Commands;

use App\Models\ReservationNotification;
use Illuminate\Console\Command;

class CleanupOldNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cleanup-old-notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Delete notifications that are older than 30 days
        ReservationNotification::where('reservation_date', '<', now()->subDays(30))
            ->delete();
    }
}
