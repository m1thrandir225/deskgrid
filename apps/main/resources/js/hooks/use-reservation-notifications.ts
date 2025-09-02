import { useCallback, useState } from 'react';

interface NotificationAvailability {
    is_reserved: boolean;
    has_notification: boolean;
    queue_position: number | null;
    can_request_notification: boolean;
}

interface ReservationNotification {
    id: number;
    desk_id: number;
    reservation_date: string;
    created_at: string;
    desk: {
        id: number;
        name?: string;
        floor: {
            name: string;
            office: {
                name: string;
            };
        };
    };
}

interface ApiResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export function useReservationNotifications() {
    const [isLoading, setIsLoading] = useState(false);

    const requestNotification = useCallback(async (deskId: number, reservationDate: string): Promise<ApiResponse> => {
        setIsLoading(true);

        try {
            const response = await fetch(route('reservation-notifications.store'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    desk_id: deskId,
                    reservation_date: reservationDate,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    message: data.message || 'Notification request created successfully',
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Failed to request notification',
                };
            }
        } catch (error) {
            console.error('Error requesting notification:', error);
            return {
                success: false,
                error: 'Network error. Please try again.',
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const removeNotification = useCallback(async (notificationId: number): Promise<ApiResponse> => {
        setIsLoading(true);

        try {
            const response = await fetch(route('reservation-notifications.destroy', notificationId), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            const data = await response.json();

            if (response.ok) {
                return {
                    success: true,
                    message: data.message || 'Notification request removed successfully',
                };
            } else {
                return {
                    success: false,
                    error: data.message || 'Failed to remove notification',
                };
            }
        } catch (error) {
            console.error('Error removing notification:', error);
            return {
                success: false,
                error: 'Network error. Please try again.',
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const checkAvailability = useCallback(async (deskId: number, reservationDate: string): Promise<NotificationAvailability | null> => {
        try {
            const response = await fetch(route('reservation-notifications.check-availability'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    desk_id: deskId,
                    reservation_date: reservationDate,
                }),
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            console.error('Error checking notification availability:', error);
        }

        return null;
    }, []);

    const getUserNotifications = useCallback(async (): Promise<ReservationNotification[]> => {
        try {
            const response = await fetch(route('reservation-notifications.index'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.notifications || [];
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }

        return [];
    }, []);

    return {
        requestNotification,
        removeNotification,
        checkAvailability,
        getUserNotifications,
        isLoading,
    };
}
