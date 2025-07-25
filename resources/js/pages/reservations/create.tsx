import { Desk } from '@/types/desk';
import React, { FormEvent, FormEventHandler } from 'react';
import { Floor } from '@/types/floor';

interface PageProps {
    desks: Desk[];
    floors: Floor[];
}

const ReservationsCreatePage: React.FC<PageProps> = (props) => {
    const { desks, floors } = props;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();


    }
    return (
        <div>
            <h1>Create Reservation</h1>
            <form onSubmit={handleSubmit}>
                {floors.map((floor) => (
                    <h1>{floor.name}</h1>
                ))}
            </form>
            {desks.map((desk) => {
                return (
                    <div>
                        <h1> Desk: {desk.desk_number}</h1>
                    </div>
                );
            })}
        </div>
    );
};

export default ReservationsCreatePage;
