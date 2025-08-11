import { useState, useCallback, useEffect } from 'react';
import { format, startOfWeek,  addDays } from 'date-fns';
import { router } from '@inertiajs/react';
import { ReservationDesk } from '@/types/desk';


interface UseReservationsProps {
    selectedOffice: number;
    selectedFloor: number;
}

export function useReservations({ selectedOffice, selectedFloor }: UseReservationsProps) {
    const [currentDate, setCurrentDate] = useState(() => {
        const today = new Date();
        return startOfWeek(today, { weekStartsOn: 1 });
    });
    const [selectedDesk, setSelectedDesk] = useState<ReservationDesk | null>(null);

    const fetchReservations = useCallback((date: Date) => {
        if (!selectedOffice || !selectedFloor) return;

        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = addDays(weekStart, 4);

        console.log('Fetching reservations for:', {
            weekStart: format(weekStart, 'yyyy-MM-dd'),
            weekEnd: format(weekEnd, 'yyyy-MM-dd'),
            office: selectedOffice,
            floor: selectedFloor
        });


        router.get(
            route('reservations.index'),
            {
                office_id: selectedOffice,
                floor_id: selectedFloor,
                start_date: format(weekStart, 'yyyy-MM-dd'),
                end_date: format(weekEnd, 'yyyy-MM-dd'),
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, [selectedOffice, selectedFloor]);


    const handleDateChange = useCallback((newDate: Date) => {
        // Ensure we're always working with the Monday of the selected week
        const mondayOfWeek = startOfWeek(newDate, { weekStartsOn: 1 });

        console.log('Date changing to week starting:', format(mondayOfWeek, 'yyyy-MM-dd (EEEE)'));
        setCurrentDate(mondayOfWeek);
        fetchReservations(mondayOfWeek);
    }, [fetchReservations]);

    useEffect(() => {
        if (selectedOffice && selectedFloor) {
            fetchReservations(currentDate);
        }
    }, [selectedOffice, selectedFloor, fetchReservations]);


    const handleReserveDesk = useCallback((desk: ReservationDesk, date: Date) => {
        router.post(
            route('reservations.store'),
            {
                desk_id: desk.id,
                reservation_date: format(date, 'yyyy-MM-dd'),
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    }, []);

    const handleCancelReservation = useCallback((reservationId: number) => {
        router.delete(route('reservations.destroy', reservationId), {
            preserveState: true,
            preserveScroll: true,
        });
    }, []);

    return {
        currentDate,
        selectedDesk,
        setSelectedDesk,
        handleDateChange,
        handleReserveDesk,
        handleCancelReservation,
    };
}
