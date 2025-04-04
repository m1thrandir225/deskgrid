import { useEffect, useRef, useState } from 'react';

interface Desk {
    id: number;
    x: number;
    y: number;
    name: string;
    settings?: unknown;
}

interface FloorPlanEditorProps {
    initialImage: string;
    initialDesks: Desk[];
    onSave?: (desks: Desk[]) => void;
}

const FloorPlanEditor: React.FC<FloorPlanEditorProps> = ({ initialDesks = [], initialImage, onSave }) => {
    const [desks, setDesks] = useState<Desk[]>(initialDesks);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [nextId, setNextId] = useState<number>(initialDesks.length > 0 ? Math.max(...initialDesks.map((desk) => desk.id)) + 1 : 1);
    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    // References
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Update image size when the image loads
    useEffect(() => {
        if (imageRef.current) {
            const updateImageSize = () => {
                if (imageRef.current) {
                    setImageSize({
                        width: imageRef.current.naturalWidth,
                        height: imageRef.current.naturalHeight,
                    });
                }
            };

            // Set initial size if image is already loaded
            if (imageRef.current.complete) {
                updateImageSize();
            }

            // Or wait for it to load
            imageRef.current.addEventListener('load', updateImageSize);
            return () => {
                imageRef.current?.removeEventListener('load', updateImageSize);
            };
        }
    }, [initialImage]);

    // Convert screen coordinates to percentage-based coordinates
    const getRelativePercentageCoordinates = (e: React.MouseEvent): { x: number; y: number } => {
        if (!imageRef.current) return { x: 0, y: 0 };

        const rect = imageRef.current.getBoundingClientRect();

        // Calculate percentage of the image width/height
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

        return {
            x: xPercent,
            y: yPercent,
        };
    };

    // Convert percentage coordinates to pixel coordinates for display
    const percentToPixelCoordinates = (xPercent: number, yPercent: number): { x: number; y: number } => {
        if (!imageRef.current) return { x: 0, y: 0 };

        const rect = imageRef.current.getBoundingClientRect();

        return {
            x: (xPercent / 100) * rect.width,
            y: (yPercent / 100) * rect.height,
        };
    };

    // Handle clicking on the image or overlay to add a desk when in add mode
    const handleImageClick = (e: React.MouseEvent) => {
        // Don't add if we're dragging
        if (!isAddMode || isDragging) return;

        const { x, y } = getRelativePercentageCoordinates(e);

        const newDesk: Desk = {
            id: nextId,
            x,
            y,
            name: `Desk ${nextId}`,
        };

        setDesks([...desks, newDesk]);
        setNextId(nextId + 1);
        setIsAddMode(false); // Turn off add mode after placing a desk
    };

    // Handle overlay click (which is the same as image click in add mode)
    const handleOverlayClick = (e: React.MouseEvent) => {
        handleImageClick(e);
    };

    // Toggle desk add mode
    const toggleAddMode = () => {
        setIsAddMode(!isAddMode);
        setSelectedDesk(null); // Clear selection when toggling mode
    };

    // Start dragging a desk
    const handleDeskMouseDown = (e: React.MouseEvent, desk: Desk) => {
        e.stopPropagation();
        setIsDragging(true);
        setSelectedDesk(desk);
    };

    // Handle dragging movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && selectedDesk && imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();

                // Calculate percentage of the image width/height
                const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

                // Clamp values to prevent dragging outside the image
                const clampedX = Math.max(0, Math.min(100, xPercent));
                const clampedY = Math.max(0, Math.min(100, yPercent));

                // Update desk position with percentage values
                setDesks(desks.map((desk) => (desk.id === selectedDesk.id ? { ...desk, x: clampedX, y: clampedY } : desk)));
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, selectedDesk, desks]);

    // Handle desk selection from the list
    const handleDeskSelection = (desk: Desk) => {
        setSelectedDesk(desk);
        setIsAddMode(false); // Exit add mode if selecting a desk
    };

    // Handle saving desks
    const handleSave = () => {
        if (onSave) {
            onSave(desks);
        }
    };

    return (
        <div className="flex flex-row gap-4" ref={containerRef}>
            {/* Floor plan image and desks */}
            <div className="relative flex-1 border border-gray-300">
                {/* Add Desk Button */}
                <div className="absolute top-4 left-4 z-20">
                    <button
                        className={`rounded-md px-4 py-2 font-medium ${isAddMode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                        onClick={toggleAddMode}
                    >
                        {isAddMode ? 'Cancel' : 'Add Desk'}
                    </button>
                </div>

                <img ref={imageRef} src={initialImage} alt="Floor Plan" className="h-auto w-full" onClick={handleImageClick} />

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
                    const { x, y } = percentToPixelCoordinates(desk.x, desk.y);

                    return (
                        <div
                            key={desk.id}
                            className={`absolute z-30 flex h-6 w-6 cursor-move items-center justify-center rounded-full ${
                                selectedDesk?.id === desk.id ? 'bg-blue-500 text-white' : 'bg-blue-300'
                            }`}
                            style={{
                                left: `${x - 12}px`, // Center the dot (24px/2)
                                top: `${y - 12}px`,
                            }}
                            onMouseDown={(e) => handleDeskMouseDown(e, desk)}
                        >
                            {desk.id}
                        </div>
                    );
                })}
            </div>

            {/* Desks Overview Panel */}
            <div className="flex w-1/3 flex-col items-start gap-4 rounded-md border p-4">
                <h2 className="text-lg font-medium">Desks</h2>

                <div className="w-full">
                    {desks.length === 0 ? (
                        <p className="text-gray-500">No desks added yet. Click "Add Desk" to place desks on the floor plan.</p>
                    ) : (
                        <div className="flex w-full flex-col gap-2">
                            {desks.map((desk) => (
                                <div
                                    key={desk.id}
                                    className={`flex cursor-pointer items-center justify-between rounded-md border p-3 hover:bg-gray-50 ${
                                        selectedDesk?.id === desk.id ? 'border-blue-500 bg-blue-50' : ''
                                    }`}
                                    onClick={() => handleDeskSelection(desk)}
                                >
                                    <div>
                                        <h3 className="font-medium">{desk.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            Position: {desk.x.toFixed(1)}%, {desk.y.toFixed(1)}%
                                        </p>
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-red-500"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setDesks(desks.filter((d) => d.id !== desk.id));
                                            if (selectedDesk?.id === desk.id) {
                                                setSelectedDesk(null);
                                            }
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {desks.length > 0 && (
                    <button className="mt-4 self-end rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleSave}>
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
};

export default FloorPlanEditor;
