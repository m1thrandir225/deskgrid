import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Desk } from '@/types/desk';
import { Reservation } from '@/types/reservation';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { router, usePage } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SharedData } from '@/types';
import { Floor } from '@/types/floor';
import { getFileUrl } from '@/lib/utils';

interface FloorViewerProps {
    desks: Desk[];
    reservations: Reservation[];
    selectedDate: Date;
    floor: Floor;
}

const FloorViewer: React.FC<FloorViewerProps> = ({ desks, reservations, selectedDate, floor }) => {
    const { auth } = usePage<SharedData>().props;
    const [selectedDesk, setSelectedDesk] = React.useState<Desk | null>(null);
    const [isSheetOpen, setIsSheetOpen] = React.useState(false);
    const floorPlanRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

    const weekStart = startOfWeek(selectedDate);
    const weekEnd = endOfWeek(selectedDate);
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const handleImageLoad = useCallback(() => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight,
            });
        }
    }, []);

    const relativeToAbsolute = useCallback((relativeX: number, relativeY: number) => {
        if (!imageRef.current || !imageSize) return { x: 0, y: 0 };

        return {
            x: relativeX * imageSize.width,
            y: relativeY * imageSize.height,
        };
    }, [imageSize]);

    const getDeskStatus = (desk: Desk, date: Date) => {
        const reservation = reservations.find(
            r => r.desk_id === desk.id && r.reservation_date === format(date, 'yyyy-MM-dd')
        );

        return {
            isReserved: !!reservation,
            isOwnReservation: reservation?.user_id === auth.user.id,
            reservation
        };
    };

    const handleDeskClick = (desk: Desk) => {
        setSelectedDesk(desk);
        setIsSheetOpen(true);
    };

    const handleReserveDesk = (desk: Desk) => {
        router.post(route('reservations.store'), {
            desk_id: desk.id,
            reservation_date: format(selectedDate, 'yyyy-MM-dd')
        });
    };

    const handleCancelReservation = (reservationId: number) => {
        router.delete(route('reservations.destroy', reservationId));
    };

    return (
        <div className="relative">
            <div ref={floorPlanRef} className="border rounded-lg relative inline-block min-w-full min-h-full">
                <img
                    ref={imageRef}
                    src={getFileUrl(floor.plan_image)}
                    alt={floor.name}
                    className="max-w-full h-full object-contain"
                    onLoad={handleImageLoad}
                    draggable={false}
                />

                {/* Desks */}
                {imageSize && desks.map((desk) => {
                    const { isReserved, isOwnReservation } = getDeskStatus(desk, selectedDate);
                    const position = relativeToAbsolute(desk.x_position, desk.y_position);

                    return (
                        <div
                            key={desk.id}
                            onClick={() => handleDeskClick(desk)}
                            className={`absolute w-10 h-10 rounded-lg border-2 cursor-pointer flex items-center justify-center text-xs font-bold select-none transition-all ${
                                isReserved
                                    ? isOwnReservation
                                        ? 'bg-blue-500 border-blue-700 text-white'
                                        : 'bg-red-500 border-red-700 text-white'
                                    : 'bg-green-400 border-green-600 text-white'
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

            {/* Side Sheet for Desk Information */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Desk {selectedDesk?.desk_number}</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(100vh-120px)] mt-4">
                        {selectedDesk && (
                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    {weekDays.map((date) => {
                                        const { isReserved, isOwnReservation, reservation } = getDeskStatus(selectedDesk, date);
                                        return (
                                            <div key={date.toISOString()} className="flex items-center justify-between p-2 border rounded">
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
                        )}
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default FloorViewer;
