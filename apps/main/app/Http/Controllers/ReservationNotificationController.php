<?php

namespace App\Http\Controllers;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use App\Models\ReservationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
        $request->validate([
            'desk_id' => 'required|exists:desks,id',
            'reservation_date' => 'required|date',
        ]);

        $user = $request->user();
        $deskId = $request->input('desk_id');
        $reservationDate = $request->input('reservation_date');

        // Check if desk is reserved
        $isReserved = Reservation::where('desk_id', $deskId)
            ->where('reservation_date', $reservationDate)
            ->whereIn('status', [ReservationStatus::Approved, ReservationStatus::Pending])
            ->exists();

        // Check if user already has notification
        $hasNotification = $user->hasNotificationFor($deskId, $reservationDate);

        // Get queue position
        $queuePosition = null;
        if ($isReserved && $hasNotification) {
            // Get actual position for existing notification
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
        } elseif ($isReserved) {
            // Get what the position would be if they joined
            $queuePosition = ReservationNotification::where('desk_id', $deskId)
                ->where('reservation_date', $reservationDate)
                ->where('notified', false)
                ->count() + 1;
        }

        return response()->json([
            'is_reserved' => $isReserved,
            'has_notification' => $hasNotification,
            'queue_position' => $queuePosition,
            'can_request_notification' => $isReserved && !$hasNotification,
        ]);
    }
}
