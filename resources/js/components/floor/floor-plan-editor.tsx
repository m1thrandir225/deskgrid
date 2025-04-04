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

const FloorPlanEditor: React.FC<FloorPlanEditorProps> = ({ initialDesks, initialImage, onSave }) => {
    const [desks, setDesks] = useState<Desk[]>([] as Desk[]);
    const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [nextId, setNextId] = useState<number>(initialDesks!.length > 0 ? Math.max(...initialDesks!.map((desk) => desk.id)) + 1 : 1);

    // References
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Get relative coordinates within the image
    const getRelativeCoordinates = (e: React.MouseEvent): { x: number; y: number } => {
        if (!imageRef.current) return { x: 0, y: 0 };

        const rect = imageRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    // Handle clicking on the image to add a desk
    const handleImageClick = (e: React.MouseEvent) => {
        // Don't add a desk if we're already in drag mode or if a desk is selected
        const { x, y } = getRelativeCoordinates(e);

        if (isDragging) return;

        const newDesk: Desk = {
            id: nextId,
            x,
            y,
            name: `Desk ${nextId}`,
        };

        setDesks([...desks, newDesk]);
        setSelectedDesk(newDesk);
        setNextId(nextId + 1);
    };

    // Handle desk selection
    const handleDeskClick = (e: React.MouseEvent, desk: Desk) => {
        e.stopPropagation();
        setSelectedDesk(desk);
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
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update desk position
                setDesks(desks.map((desk) => (desk.id === selectedDesk.id ? { ...desk, x, y } : desk)));
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

    // Handle saving desks
    const handleSave = () => {
        if (onSave) {
            onSave(desks);
        }
    };

    // Close settings panel
    const closeSettings = () => {
        setSelectedDesk(null);
    };
    return (
        <div className="flex flex-row gap-4" ref={containerRef}>
            {/* Floor plan image and desks */}
            <div className="relative flex-1 border border-gray-300">
                <img ref={imageRef} src={initialImage} alt="Floor Plan" className="h-auto w-full" onClick={handleImageClick} />

                {/* Render all desks as dots */}
                {desks.map((desk) => (
                    <div
                        key={desk.id}
                        className={`absolute flex h-6 w-6 cursor-move items-center justify-center rounded-full ${
                            selectedDesk?.id === desk.id ? 'bg-blue-500 text-white' : 'bg-blue-300'
                        }`}
                        style={{
                            left: `${desk.x - 12}px`, // Center the dot (24px/2)
                            top: `${desk.y - 12}px`,
                        }}
                        onClick={(e) => handleDeskClick(e, desk)}
                        onMouseDown={(e) => handleDeskMouseDown(e, desk)}
                    >
                        {desk.id}
                    </div>
                ))}
            </div>

            {/* Current Desks Overview */}
            <div className="flex w-1/3 flex-col items-start gap-8 rounded-md border p-4">
                <div className="flex w-full flex-col gap-4">
                    {desks.map((desk) => (
                        <h1> {desk.id}</h1>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FloorPlanEditor;
