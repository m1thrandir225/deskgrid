export interface Reservation {
    id: number;
    desk_id: number;
    user_id: number;
    reservation_date: string;
    status: 'pending' | 'approved' | 'cancelled';
}

export interface ReservationWithUser extends Reservation {
    user: {
        name: string;
        id: string;
        email: string;
    }
}
