<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use App\Models\ReservationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ReservationNotificationController extends Controller
{
    //

    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'desk_id' => 'required|exists:desks,id',
            'reservation_date' => 'required|date|after_or_equal:today',
        ]);

        $user = $request->user();
        $deskId = $request->input('desk_id');
        $reservationDate = $request->input('reservation_date');

        $existingReservation = Reservation::where('desk_id', $deskId)
            ->where('reservation_date', $reservationDate)
            ->whereIn('status', [ReservationStatus::Approved, ReservationStatus::Pending])
            ->exists();

        if (!$existingReservation) {
            return response()->json([
                'message' => 'This desk is not currently reserved for the selected date.'
            ], 422);
        }

        // Check if user already has a notification for this desk/date
        $existingNotification = $user->hasNotificationFor($deskId, $reservationDate);

        if ($existingNotification) {
            return response()->json([
                'message' => 'You already have a notification request for this desk and date.'
            ], 422);
        }

        // Create the notification request
        $notification = ReservationNotification::create([
            'user_id' => $user->id,
            'desk_id' => $deskId,
            'reservation_date' => $reservationDate,
        ]);

        return response()->json([
            'message' => 'Notification request created successfully. You will be notified if this reservation gets cancelled.',
            'notification' => $notification,
        ]);
    }

    public function destroy(Request $request, ReservationNotification $notification): JsonResponse
    {
        // Ensure user can only delete their own notifications
        if ($notification->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $notification->delete();

        return response()->json([
            'message' => 'Notification request removed successfully.'
        ]);
    }

    public function index(Request $request): JsonResponse
    {
        $notifications = $request->user()
            ->reservationNotifications()
            ->with(['desk.floor.office'])
            ->where('notified', false)
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'notifications' => $notifications
        ]);
    }

    public function checkAvailability(Request $request): JsonResponse
    {
        $user = $request->user();
        $deskId = $request->input('desk_id');
        $reservationDate = $request->input('reservation_date');

        $globalAvailability = Cache::remember("desk_global_availability_{$deskId}_{$reservationDate}", 300, function () use ($deskId, $reservationDate) {
            return [
                'is_reserved' => Reservation::where('desk_id', $deskId)
                    ->where('reservation_date', $reservationDate)
                    ->whereIn('status', [ReservationStatus::Approved, ReservationStatus::Pending])
                    ->exists(),
                'total_queue' => ReservationNotification::where('desk_id', $deskId)
                    ->where('reservation_date', $reservationDate)
                    ->where('notified', false)
                    ->count()
            ];
        });

        $hasNotification = $user->hasNotificationFor($deskId, $reservationDate);
        $queuePosition = null;

        if ($globalAvailability['is_reserved'] && $hasNotification) {
            $userNotification = $user->reservationNotifications()
                ->where('desk_id', $deskId)
                ->where('reservation_date', $reservationDate)
                ->where('notified', false)
                ->first();

            if ($userNotification) {
                $queuePosition = ReservationNotification::where('desk_id', $deskId)
                    ->where('reservation_date', $reservationDate)
                    ->where('notified', false)
                    ->where('created_at', '<=', $userNotification->created_at)
                    ->count();
            }
        } elseif ($globalAvailability['is_reserved']) {
            $queuePosition = $globalAvailability['total_queue'] + 1;
        }

        return response()->json([
            'is_reserved' => $globalAvailability['is_reserved'],
            'has_notification' => $hasNotification,
            'queue_position' => $queuePosition,
            'can_request_notification' => $globalAvailability['is_reserved'] && !$hasNotification,
        ]);
    }
}
