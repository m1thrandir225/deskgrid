import { Desk } from './desk';

export interface Floor {
    id: number;
    office_id: number;
    plan_image: string;
    name: string;
    desks: Desk[] | undefined;
}
