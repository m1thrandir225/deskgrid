import { DeskDTO } from '@/types/desk';
import { useCallback, useRef, useState } from 'react';

interface Props {
    image: string;
    desks: DeskDTO[];
}

const FloorPlanEditorImage: React.FC<Props> = (props) => {
    const { image, desks } = props;

    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const imageRef = useRef<HTMLImageElement>(null);

    const overlayRef = useRef<HTMLDivElement>(null);

    const toggleAddMode = useCallback(() => {
        setIsAddMode(!!isAddMode);
    }, [isAddMode]);
    return (
        <div className="relative col-span-2 flex-1 border border-gray-300">
            {/* Add Desk Button */}
            <div className="absolute top-4 left-4 z-20">
                <button
                    className={`rounded-md px-4 py-2 font-medium ${isAddMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={toggleAddMode}
                >
                    {isAddMode ? 'Cancel' : 'Add Desk'}
                </button>
            </div>

            <img ref={imageRef} src={image} alt="Floor Plan" className="h-auto w-full" onClick={handleImageClick} />

            {/* Overlay for add mode - now positioned correctly and capture clicks */}
            {isAddMode && (
                <div
                    ref={overlayRef}
                    className="absolute inset-0 cursor-crosshair bg-black opacity-20"
                    onClick={handleOverlayClick}
                    style={{ pointerEvents: 'all' }}
                />
            )}

            {/* Render all desks as dots - higher z-index than overlay */}
            {desks.map((desk) => {
                // Convert percentage-based coordinates to pixel coordinates for display
                const { x, y } = percentToPixelCoordinates(desk.x_position, desk.y_position);

                return (
                    <div
                        key={desk.desk_number}
                        className={`absolute z-30 flex h-6 w-6 cursor-move items-center justify-center rounded-full ${
                            selectedDesk?.desk_number === desk.desk_number ? 'bg-blue-500 text-white' : 'bg-blue-300'
                        }`}
                        style={{
                            left: `${x - 12}px`, // Center the dot (24px/2)
                            top: `${y - 12}px`,
                        }}
                        onMouseDown={(e) => handleDeskMouseDown(e, desk)}
                    >
                        {desk.desk_number}
                    </div>
                );
            })}
        </div>
    );
};

export default FloorPlanEditorImage;
