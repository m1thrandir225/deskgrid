import { Button } from '@/components/ui/button';
import { useReservationNotifications } from '@/hooks/use-reservation-notifications';
import { format } from 'date-fns';
import { Bell, BellRing, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface NotifyMeButtonProps {
    deskId: number;
    reservationDate: Date;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'default' | 'lg';
}

interface NotificationStatus {
    is_reserved: boolean;
    has_notification: boolean;
    queue_position: number | null;
    can_request_notification: boolean;
}

export const NotifyMeButton: React.FC<NotifyMeButtonProps> = ({ deskId, reservationDate, className = '', variant = 'outline', size = 'sm' }) => {
    const { requestNotification, removeNotification, checkAvailability, isLoading, getUserNotifications } = useReservationNotifications();
    const [status, setStatus] = useState<NotificationStatus | null>(null);
    const [isChecking, setIsChecking] = useState(true);
    const [notificationId, setNotificationId] = useState<number | null>(null);

    const dateString = format(reservationDate, 'yyyy-MM-dd');

    useEffect(() => {
        const checkStatus = async () => {
            setIsChecking(true);

            try {
                const availability = await checkAvailability(deskId, dateString);
                setStatus(availability);

                if (availability?.has_notification) {
                    const notifications = await getUserNotifications();
                    const notification = notifications.find((n) => n.desk_id === deskId && n.reservation_date === dateString);
                    setNotificationId(notification?.id || null);
                } else {
                    setNotificationId(null);
                }
            } catch (error) {
                toast.error('Failed to check notification status');
                console.error('Error checking status:', error);
            } finally {
                setIsChecking(false);
            }
        };

        checkStatus();
    }, [deskId, dateString, checkAvailability]);

    const handleToggleNotification = async () => {
        if (!status) return;

        try {
            let result;

            if (status.has_notification && notificationId) {
                result = await removeNotification(notificationId);
            } else {
                result = await requestNotification(deskId, dateString);
            }

            if (result.success) {
                // Show success toast
                toast.success(result.message);

                // Refresh status
                const newStatus = await checkAvailability(deskId, dateString);
                setStatus(newStatus);

                // Update notification ID
                if (!newStatus?.has_notification) {
                    setNotificationId(null);
                } else if (!status.has_notification && newStatus?.has_notification) {
                    // New notification was created, get the ID
                    const notifications = await getUserNotifications();
                    const notification = notifications.find((n) => n.desk_id === deskId && n.reservation_date === dateString);
                    setNotificationId(notification?.id || null);
                }
            } else {
                // Show error toast
                toast.error(result.error || 'An error occurred');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
            console.error('Error toggling notification:', error);
        }
    };

    if (isChecking) {
        return (
            <Button variant={variant} size={size} disabled className={className}>
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
        );
    }

    if (!status?.is_reserved) {
        return null; // Don't show button if desk is not reserved
    }

    const Icon = status.has_notification ? BellRing : Bell;
    const buttonText = status.has_notification ? `Notifying (${status.queue_position})` : 'Notify Me';

    return (
        <Button variant={variant} size={size} onClick={handleToggleNotification} disabled={isLoading} className={className}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon className="mr-2 h-4 w-4" />}
            {buttonText}
        </Button>
    );
};
