import { FloorViewerCanvas } from '@/components/floor/viewer/floor-viewer-canvas';
import { useReservations } from '@/hooks/use-reservations';
import { ReservationDesk } from '@/types/desk';
import { Floor } from '@/types/floor';
import React, { useEffect } from 'react';
import { FloorViewerReservationPanel } from '@/components/floor/viewer/floor-viewer-reservation-panel';

interface FloorViewerProps {
    desks: ReservationDesk[];
    floor: Floor;
}

const FloorViewer: React.FC<FloorViewerProps> = (props) => {
    const { desks, floor } = props;

    const {
        currentDate,
        selectedDesk,
        setSelectedDesk,
        handleDateChange,
        handleReserveDesk,
        handleCancelReservation
    } = useReservations({
        selectedOffice: floor.office_id,
        selectedFloor: floor.id,
    });

    useEffect(() => {
        if (selectedDesk && desks.length > 0) {
            const updatedDesk = desks.find(desk => desk.id === selectedDesk.id);
            if (updatedDesk) {
                console.log('Updating selected desk with fresh reservation data:', {
                    deskId: updatedDesk.id,
                    oldReservations: selectedDesk.reservations.length,
                    newReservations: updatedDesk.reservations.length
                });
                setSelectedDesk(updatedDesk);
            }
        }
    }, [desks, selectedDesk, setSelectedDesk]);


    return (
        <div className="relative grid w-full grid-cols-3 rounded-lg border">
            <FloorViewerCanvas
                desks={desks}
                selectedDesk={selectedDesk}
                currentDate={currentDate}
                onDeskSelect={(desk) => setSelectedDesk(desk)}
                floor={floor} />
            <FloorViewerReservationPanel
                desk={selectedDesk}
                currentDate={currentDate}
                onDateChange={handleDateChange}
                onReserve={handleReserveDesk}
                onCancel={handleCancelReservation}
                onClearSelection={() => setSelectedDesk(null)}
            />
        </div>
    );
};

export default FloorViewer;
