import React, { useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DeskWithFloor } from '@/types/desk';

interface ComponentProps {
    desk: DeskWithFloor;
}

const DeskLocationPopover: React.FC<ComponentProps> = ({ desk }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const imageRef = React.useRef<HTMLImageElement>(null);

    // Fixed container dimensions
    const CONTAINER_WIDTH = 300;
    const CONTAINER_HEIGHT = 250;

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    // Convert relative position (0-1) to absolute pixel position within our fixed container
    const relativeToAbsolute = (relativeX: number, relativeY: number) => {
        return {
            x: relativeX * CONTAINER_WIDTH,
            y: relativeY * CONTAINER_HEIGHT,
        };
    };

    const absolutePos = relativeToAbsolute(desk.x_position, desk.y_position);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <MapPin size={16} />
                    Show Desk
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-lg">Desk Location</h3>
                        <p className="text-sm text-muted-foreground">
                            {desk.floor.office.name} - {desk.floor.name} - Desk {desk.desk_number}
                        </p>
                    </div>

                    {desk.floor.plan_image_url ? (
                        <div
                            className="relative border rounded-lg overflow-hidden bg-gray-50"
                            style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
                        >
                            <img
                                ref={imageRef}
                                src={desk.floor.plan_image_url}
                                alt={`${desk.floor.name} floor plan`}
                                className="w-full h-full object-fill"
                                style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
                                onLoad={handleImageLoad}
                                draggable={false}
                            />

                            {imageLoaded && (
                                <div
                                    className="absolute w-6 h-6 bg-red-500 border-2 border-red-700 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse z-10"
                                    style={{
                                        left: absolutePos.x - 12, // Center the marker
                                        top: absolutePos.y - 12,
                                        transform: 'translate(0, 0)',
                                    }}
                                >
                                    {desk.desk_number}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className="flex items-center justify-center bg-gray-100 rounded-lg"
                            style={{ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }}
                        >
                            <p className="text-gray-500">No floor plan available</p>
                        </div>
                    )}

                    <div className="text-xs text-muted-foreground">
                        <p>Red marker shows your reserved desk location</p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default DeskLocationPopover;

