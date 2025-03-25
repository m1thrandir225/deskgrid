export interface Reservation {
    id: number;
    desk_id: number;
    user_id: number;
    reservation_date: string;
    status: 'pending' | 'approved' | 'cancelled';
}
