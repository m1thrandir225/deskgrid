import { getFileUrl } from '@/lib/utils';
import { SharedData } from '@/types';
import { ReservationDesk } from '@/types/desk';
import { Floor } from '@/types/floor';
import { usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import React, { useCallback, useRef, useState } from 'react';

interface FloorViewerCanvasProps {
    desks: ReservationDesk[];
    selectedDesk: ReservationDesk | null;
    currentDate: Date;
    onDeskSelect: (desk: ReservationDesk | null) => void;
    floor: Floor;
}

export const FloorViewerCanvas: React.FC<FloorViewerCanvasProps> = (props) => {
    const { currentDate, onDeskSelect, selectedDesk, desks, floor } = props;

    const { auth } = usePage<SharedData>().props;
    const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
    const floorPlanRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleImageLoad = useCallback(() => {
        if (imageRef.current) {
            setImageSize({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight,
            });
        }
    }, []);

    const getDeskStatus = (desk: ReservationDesk, date: Date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');

        const reservation = desk.reservations.find((res) => {
            return res.reservation_date === formattedDate;
        });
        return {
            isReserved: !!reservation,
            isOwnReservation: reservation?.user?.id === auth.user?.id,
            reservation: reservation || null,
        };
    };

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
    return (
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
                    const { isReserved, isOwnReservation } = getDeskStatus(desk, currentDate);
                    const position = relativeToAbsolute(desk.x_position, desk.y_position);
                    const isSelected = selectedDesk?.id === desk.id;

                    return (
                        <div
                            key={desk.id}
                            onClick={() => onDeskSelect(desk)}
                            className={`absolute flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 text-xs font-bold transition-all select-none ${
                                isSelected
                                    ? 'border-blue-700 bg-blue-500 text-white'
                                    : isReserved
                                      ? isOwnReservation
                                          ? 'border-purple-700 bg-purple-500 text-white'
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
    );
};
