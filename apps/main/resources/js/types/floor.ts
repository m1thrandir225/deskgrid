import { Desk } from './desk';
import { Office } from '@/types/office';

export interface Floor {
    id: number;
    office_id: number;
    plan_image: string;
    plan_image_url: string | undefined;
    name: string;
    desks: Desk[] | undefined;
}

export interface FloorWithOffice extends Floor {
    office: Office
}
