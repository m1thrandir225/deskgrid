import { Reservation } from '@/types/reservation';

interface Props {
    reservation: Reservation;
}

const ReservationListItem: React.FC<Props> = (props) => {
    const { reservation } = props;

    return (
        <div>
            <h1> {reservation.id}</h1>
        </div>
    );
};

export default ReservationListItem;
