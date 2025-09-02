<?php

namespace App\Jobs;

use App\Mail\ReservationCancelledNotification;
use App\Models\ReservationNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendReservationCancelledNotifications implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $deskId,
        public string $reservationDate
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //

        $notifications = ReservationNotification::getPendingForDeskAndDate(
            $this->deskId,
            $this->reservationDate
        );

        if ($notifications->isEmpty()) {
            return;
        }

        foreach ($notifications as $index => $notification) {
            $isFirstInLine = $index === 0;

            Mail::to($notification->user->email)->send(
                new ReservationCancelledNotification(
                    $notification->user,
                    $notification->desk,
                    $this->reservationDate,
                    $isFirstInLine
                )
            );

            $notification->markAsNotified();
        }
    }
}
