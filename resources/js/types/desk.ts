import { Reservation } from './reservation';

export interface Desk {
    id: number;
    office_id: number;
    desk_number: number;
    location_description: string;
    x_position: number;
    y_position: number;
    is_active: boolean;
    reservations: Reservation[] | undefined;
}
