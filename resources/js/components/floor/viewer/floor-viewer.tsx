import React, { useCallback, useRef, useState } from 'react';
import { Desk } from '@/types/desk';
import { Reservation } from '@/types/reservation';
import { eachDayOfInterval, endOfWeek, format, isBefore, startOfToday, startOfWeek, isWeekend} from 'date-fns';
import { router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';
import { Floor } from '@/types/floor';
import { getFileUrl } from '@/lib/utils';
import { MousePointerClick, SquareX, TicketX } from 'lucide-react';

interface FloorViewerProps {
    desks: Desk[];
    reservations: Reservation[];
    selectedDate: Date;
    floor: Floor;
}

const FloorViewer: React.FC<FloorViewerProps> = ({ desks, reservations, selectedDate, floor }) => {
    const { auth } = usePage<SharedData>().props;
    const [selectedDesk, setSelectedDesk] = React.useState<Desk | null>(null);
    const floorPlanRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

    const today = startOfToday();
    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    const weekDays = eachDayOfInterval({
        start: isBefore(weekStart, today) ? today : weekStart,
        end: weekEnd
    }).filter(date => !isWeekend(date)); // Filter out weekends


    const handleImageLoad = useCallback(() => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight,
            });
        }
    }, []);

    const relativeToAbsolute = useCallback(
        (relativeX: number, relativeY: number) => {
            if (!imageRef.current || !imageSize) return { x: 0, y: 0 };

            return {
                x: relativeX * imageSize.width,
                y: relativeY * imageSize.height,
            };
        },
        [imageSize],
    );

    const getDeskStatus = (desk: Desk, date: Date) => {
        const reservation = reservations.find((r) => r.desk_id === desk.id && r.reservation_date === format(date, 'yyyy-MM-dd'));

        return {
            isReserved: !!reservation,
            isOwnReservation: reservation?.user_id === auth.user.id,
            reservation,
        };
    };

    const handleDeskClick = (desk: Desk) => {
        setSelectedDesk(desk);
    };

    const handleReserveDesk = (desk: Desk) => {
        router.post(route('reservations.store'), {
            desk_id: desk.id,
            reservation_date: format(selectedDate, 'yyyy-MM-dd'),
        });
    };

    const handleCancelReservation = (reservationId: number) => {
        router.delete(route('reservations.destroy', reservationId));
    };

    return (
        <div className="relative grid w-full grid-cols-3 rounded-lg border">
            <div ref={floorPlanRef} className="relative col-span-2 h-full w-auto bg-red-50 p-4">
                <img
                    ref={imageRef}
                    src={getFileUrl(floor.plan_image)}
                    alt={floor.name}
                    className="h-auto w-full object-contain"
                    onLoad={handleImageLoad}
                    draggable={false}
                />

                {/* Desks */}
                {imageSize &&
                    desks.map((desk) => {
                        const { isReserved, isOwnReservation } = getDeskStatus(desk, selectedDate);
                        const position = relativeToAbsolute(desk.x_position, desk.y_position);
                        const isSelected = selectedDesk?.id === desk.id;

                        return (
                            <div
                                key={desk.id}
                                onClick={() => handleDeskClick(desk)}
                                className={`absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 text-xs font-bold transition-all select-none ${
                                    isSelected
                                        ? 'border-blue-700 bg-blue-500 text-white'
                                        : isReserved
                                            ? isOwnReservation
                                                ? 'border-blue-700 bg-blue-500 text-white'
                                                : 'border-red-700 bg-red-500 text-white'
                                            : 'border-green-600 bg-green-400 text-white'
                                }`}
                                style={{
                                    left: position.x,
                                    top: position.y,
                                }}
                            >
                                {desk.desk_number}
                            </div>

                        );
                    })}
            </div>

            <div className={'relative col-span-1 flex flex-col items-start gap-4 border-l'}>
                <div className={'w-full border-b p-4 '}>
                    <h1 className={'text-lg font-bold'}>Reservation Dates</h1>
                    <p>Choose an available slot to reserve the desk.</p>
                    {selectedDesk && (
                        <div className={"w-full flex flex-row items-center justify-between my-2"}>
                            <p className={'text-sm text-gray-500 '}>
                                Selected desk: {selectedDesk.desk_number}
                            </p>

                            <Button size={"sm"} variant={"outline"} onClick={() => setSelectedDesk(null)} className={"text-xs"}>
                                <TicketX  size={16}/>
                                Clear
                            </Button>
                        </div>

                    )}
                </div>
                <div className={'flex w-full flex-col gap-2 p-4'}>
                    {selectedDesk ? (
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                {weekDays.map((date) => {
                                    const { isReserved, isOwnReservation, reservation } = getDeskStatus(selectedDesk, date);
                                    return (
                                        <div key={date.toISOString()} className="flex items-center justify-between rounded border p-2">
                                            <div>
                                                <p className="font-medium">{format(date, 'EEEE')}</p>
                                                <p className="text-sm text-gray-500">{format(date, 'MMM d, yyyy')}</p>
                                            </div>
                                            {isReserved ? (
                                                <div className="text-right">
                                                    <p className="text-sm">Reserved</p>
                                                    {isOwnReservation && (
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => reservation && handleCancelReservation(reservation.id)}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    )}
                                                </div>
                                            ) : (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleReserveDesk(selectedDesk)}
                                                    disabled={format(date, 'yyyy-MM-dd') !== format(selectedDate, 'yyyy-MM-dd')}
                                                >
                                                    Reserve
                                                </Button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="flex flex-row gap-2 items-center border p-2 rounded-md border-yellow-200 bg-yellow-50">
                            <MousePointerClick/>
                            Please click on one of the desks to see available reservation slots.
                        </p>
                    )}

                </div>
            </div>
        </div>
    );
};

export default FloorViewer;
