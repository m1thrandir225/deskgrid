import { Desk } from './desk';

export interface Floor {
    id: number;
    office_id: number;
    plan_image: string;
    plan_image_url: string | undefined;
    name: string;
    desks: Desk[] | undefined;
}
