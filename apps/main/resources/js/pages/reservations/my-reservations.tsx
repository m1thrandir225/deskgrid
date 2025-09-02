import DeskLocationPopover from '@/components/desk/desk-location-popover';
import { Button } from '@/components/ui/button';
import WeekSelector from '@/components/week-selector';
import AppLayout from '@/layouts/app-layout';
import { getDateFromISOString } from '@/lib/utils';
import { ReservationWithDesk } from '@/types/reservation';
import { router } from '@inertiajs/react';
import { addDays, format, startOfWeek } from 'date-fns';
import { Building, CalendarCheck, CircleOff, MapPin } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Filters {
    start_date?: string;
    end_date?: string;
}

interface PageProps {
    reservations: ReservationWithDesk[];
    filters: Filters;
}

const MyReservationsPage: React.FC<PageProps> = (props) => {
    const { reservations, filters } = props;
    const [currentDate, setCurrentDate] = useState(() => {
        if (filters.start_date) {
            return new Date(filters.start_date);
        }
        return startOfWeek(new Date(), { weekStartsOn: 1 });
    });

    useEffect(() => {
        // Fetch reservations for the current week when date changes
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const weekEnd = addDays(weekStart, 4); // Friday

        router.get(
            route('reservations.my'),
            {
                start_date: format(weekStart, 'yyyy-MM-dd'),
                end_date: format(weekEnd, 'yyyy-MM-dd'),
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }, [currentDate]);

    const handleWeekChange = (newDate: Date) => {
        const mondayOfWeek = startOfWeek(newDate, { weekStartsOn: 1 });
        setCurrentDate(mondayOfWeek);
    };

    const handleCancelReservation = (reservationId: number) => {
        router.delete(route('reservations.destroy', reservationId), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getWeekDays = () => {
        const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        const days = [];
        for (let i = 0; i < 5; i++) {
            // Monday to Friday
            days.push(addDays(weekStart, i));
        }
        return days;
    };

    const getReservationForDay = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd');
        return reservations.find((res) => {
            const reservationDate = getDateFromISOString(res.reservation_date);
            return reservationDate === dateString;
        });
    };

    const weekDays = getWeekDays();

    return (
        <AppLayout title={'My Reservations'} breadcrumbs={[]}>
            <div className="container mx-auto py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">My Reservations</h1>
                    <p className="text-gray-600">View and manage your desk reservations</p>
                </div>

                <div className="mb-6">
                    <WeekSelector currentWeek={currentDate} onWeekChange={handleWeekChange} />
                </div>

                <div className="bg-background rounded-lg border shadow-sm">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">
                            Week of {format(currentDate, 'MMM d')} - {format(addDays(currentDate, 4), 'MMM d, yyyy')}
                        </h2>
                    </div>

                    <div className="divide-y">
                        {weekDays.map((date) => {
                            const reservation = getReservationForDay(date);
                            const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

                            return (
                                <div key={date.toISOString()} className={`flex items-center justify-between p-6 ${isToday ? 'bg-accent' : ''}`}>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <h3 className={`font-medium ${isToday ? 'text-primary' : ''}`}>
                                                    {format(date, 'EEEE')}
                                                    {isToday && <span className="text-primary ml-2 text-sm">(Today)</span>}
                                                </h3>
                                                <p className={`text-sm ${isToday ? 'text-primary' : 'text-gray-500'}`}>
                                                    {format(date, 'MMM d, yyyy')}
                                                </p>
                                            </div>
                                        </div>

                                        {reservation && (
                                            <div className="mt-3 flex items-center gap-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Building size={16} className="text-gray-400" />
                                                    <span className="text-gray-600">{reservation.desk.floor.office.name}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin size={16} className="text-gray-400" />
                                                    <span className="text-gray-600">
                                                        {reservation.desk.floor.name} - Desk {reservation.desk.desk_number}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {reservation ? (
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 text-green-600">
                                                    <CalendarCheck size={18} />
                                                    <span className="font-medium">Reserved</span>
                                                </div>
                                                <DeskLocationPopover desk={reservation.desk} />
                                                <Button variant="destructive" size="sm" onClick={() => handleCancelReservation(reservation.id)}>
                                                    <CircleOff size={16} />
                                                    Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400">No reservation</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {reservations.length === 0 && (
                        <div className="py-12 text-center">
                            <CalendarCheck size={48} className="mx-auto mb-4 text-gray-300" />
                            <h3 className="mb-2 text-lg font-medium">No reservations this week</h3>
                            <p className="mb-4 text-gray-500">You don't have any desk reservations for this week.</p>
                            <Button onClick={() => router.get(route('reservations.index'))}>
                                <CalendarCheck size={16} />
                                Make a Reservation
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};
export default MyReservationsPage;
