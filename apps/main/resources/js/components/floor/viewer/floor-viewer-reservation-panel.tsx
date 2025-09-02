import { NotifyMeButton } from '@/components/NotifyMeButton';
import { Button } from '@/components/ui/button';
import WeekSelector from '@/components/week-selector';
import { SharedData } from '@/types';
import { ReservationDesk } from '@/types/desk';
import { usePage } from '@inertiajs/react';
import { addDays, eachDayOfInterval, format, isBefore, startOfToday } from 'date-fns';
import { CalendarCheck, CircleOff, MousePointerClick, TicketX } from 'lucide-react';
import React from 'react';

interface FloorViewerReservationPanelProps {
    desk: ReservationDesk | null;
    currentDate: Date;
    onDateChange: (date: Date) => void;
    onReserve: (desk: ReservationDesk, date: Date) => void;
    onCancel: (reservationId: number) => void;
    onClearSelection: () => void;
}

export const FloorViewerReservationPanel: React.FC<FloorViewerReservationPanelProps> = (props) => {
    const { auth } = usePage<SharedData>().props;
    const { desk, currentDate, onDateChange, onReserve, onCancel, onClearSelection } = props;

    const today = startOfToday();

    const getWorkWeekDates = (weekStartDate: Date, today: Date) => {
        const weekStart = weekStartDate; // This is Monday
        const weekEnd = addDays(weekStart, 4); // Friday

        // Generate Monday to Friday
        const workDays = eachDayOfInterval({
            start: weekStart,
            end: weekEnd,
        });

        return workDays.filter((date) => {
            if (weekStart > today) return true;
            return !isBefore(date, today);
        });
    };
    const weekDays = getWorkWeekDates(currentDate, today);

    const getDeskStatus = (desk: ReservationDesk, date: Date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        const reservation = desk.reservations.find((res) => {
            return res.reservation_date === formattedDate;
        });

        return {
            isReserved: !!reservation,
            isOwnReservation: reservation?.user?.id === auth.user?.id,
            reservation: reservation || null,
            reservedBy: reservation?.user?.name || null,
        };
    };

    return (
        <div className={'relative col-span-1 flex flex-col items-start gap-4 border-l'}>
            <div className={'w-full border-b p-4'}>
                <h1 className={'text-lg font-bold'}>Reservation Dates</h1>
                <p>Choose an available slot to reserve the desk.</p>
                {desk && (
                    <div className={'my-2 flex w-full flex-row items-center justify-between'}>
                        <p className={'text-sm text-gray-500'}>Selected desk: {desk.desk_number}</p>

                        <Button size={'sm'} variant={'outline'} onClick={onClearSelection} className={'text-xs'}>
                            <TicketX size={16} />
                            Clear
                        </Button>
                    </div>
                )}
            </div>
            <div className={'flex w-full flex-col gap-2 p-4'}>
                {desk ? (
                    <div className="">
                        <WeekSelector currentWeek={currentDate} onWeekChange={onDateChange} />
                        <div className="grid gap-2">
                            {weekDays.map((date) => {
                                const { isReserved, isOwnReservation, reservation, reservedBy } = getDeskStatus(desk, date);

                                return (
                                    <div key={date.toISOString()} className="flex items-center justify-between rounded-md border p-4">
                                        <div>
                                            <p className="font-medium">{format(date, 'EEEE')}</p>
                                            <p className="text-sm text-gray-500">{format(date, 'MMM d, yyyy')}</p>
                                        </div>
                                        {isReserved ? (
                                            isOwnReservation ? (
                                                <Button variant="destructive" size="sm" onClick={() => reservation && onCancel(reservation.id)}>
                                                    <CircleOff size={16} />
                                                    Cancel
                                                </Button>
                                            ) : (
                                                <div className="flex flex-col items-end gap-2">
                                                    <NotifyMeButton deskId={desk.id} reservationDate={date} variant="outline" />
                                                    <div className="flex items-center gap-2 text-sm text-indigo-400">
                                                        <span className="font-medium">Reserved by:</span>
                                                        <span>{reservedBy}</span>
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <Button variant="default" size="sm" onClick={() => onReserve(desk, date)}>
                                                <CalendarCheck size={16} />
                                                Reserve
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <p className="bg-background flex flex-row items-center gap-2 rounded-md border border-yellow-200 p-2">
                        <MousePointerClick />
                        Please click on one of the desks to see available reservation slots.
                    </p>
                )}
            </div>
        </div>
    );
};
