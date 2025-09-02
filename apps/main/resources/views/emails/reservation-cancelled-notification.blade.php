<!DOCTYPE html>
<html>

<head>
    <title>{{ $isFirstInLine ? 'Desk Available!' : 'Desk Cancellation Notification' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .desk-info {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            color: white;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 0;
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            font-size: 14px;
            color: #6c757d;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>{{ $isFirstInLine ? '🎉 Great News!' : '📢 Reservation Update' }}</h1>
        </div>

        <div class="content">
            <p>Hi {{ $user->name }},</p>

            @if($isFirstInLine)
            <p><strong>A desk you were waiting for is now available!</strong></p>
            <p>A reservation for the desk you requested notification for has been cancelled. As the first person in
                line, you now have the opportunity to book it.</p>
            @else
            <p>This is to inform you that a reservation for a desk you're monitoring has been cancelled.</p>
            <p>Other users ahead of you in the notification queue have been notified first, but we wanted to keep you
                informed of the cancellation.</p>
            @endif

            <div class="desk-info">
                <h3>Desk Details:</h3>
                <p><strong>Desk:</strong> {{ $desk->name ?? "Desk #{$desk->id}" }}</p>
                <p><strong>Floor:</strong> {{ $desk->floor->name }}</p>
                <p><strong>Office:</strong> {{ $desk->floor->office->name }}</p>
                <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($reservationDate)->format('l, F j, Y') }}</p>
            </div>

            @if($isFirstInLine)
            <p>You can now try to book this desk. Please note that bookings are still subject to the regular reservation
                rules and availability.</p>

            <a href="{{ route('reservations.index', ['office_id' => $desk->floor->office_id, 'floor_id' => $desk->floor_id]) }}"
                class="button">
                Book This Desk
            </a>
            @endif

            <p>Thank you for using DeskGrid!</p>
        </div>

        <div class="footer">
            <p>This is an automated notification from DeskGrid. If you no longer wish to receive these notifications,
                you can manage your preferences in your account settings.</p>
        </div>
    </div>
</body>

</html>