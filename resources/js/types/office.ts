import { Desk } from './desk';

export interface Office {
    id: number;
    name: string;
    employer_id: number;
    address: string;
    floor_plan_image: string;
    desks: Desk[] | undefined;
}
