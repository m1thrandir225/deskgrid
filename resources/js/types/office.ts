import { Floor } from './floor';

export interface Office {
    id: number;
    name: string;
    user_id: number;
    address: string;
    floors: Floor[] | undefined;
}
