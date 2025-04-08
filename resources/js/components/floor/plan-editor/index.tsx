import { DeskDTO } from '@/types/desk';
import { useEffect, useMemo, useRef, useState } from 'react';
import FloorPlanEditorImage from './plan-editor-image';
import FloorPlanEditorSidebar from './plan-editor-sidebar';

interface FloorPlanEditorProps {
    initialImage: string;
    initialDesks: DeskDTO[];
    onSave?: (desks: DeskDTO[]) => void;
}

/**
 * Component should have initial desks which are already created
 * as well as the ability to add new ones, drag the current ones and save the
 * state which will update all of the data of the changed desks.
 */

const FloorPlanEditor: React.FC<FloorPlanEditorProps> = ({ initialDesks = [], initialImage, onSave }) => {
    const [desks, setDesks] = useState<DeskDTO[]>(initialDesks);
    const [newDesks, setNewDesks] = useState<DeskDTO[]>([]);

    const [selectedDesk, setSelectedDesk] = useState<DeskDTO | null>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const [nextId, setNextId] = useState<number>(initialDesks.length > 0 ? Math.max(...initialDesks.map((desk) => desk.desk_number)) + 1 : 1);
    const [isAddMode, setIsAddMode] = useState<boolean>(false);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

    //This whill be given to the editor, contains all the already existing desks
    //and the new desks
    const allDesks = useMemo(() => {
        return [...desks, ...newDesks].sort((a, b) => a.desk_number - b.desk_number);
    }, [desks, newDesks]);

    const nextDeskNumber = useMemo(() => {
        return allDesks[allDesks.length].desk_number + 1;
    }, [allDesks]);

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

        const newDesk: DeskDTO = {
            x_position: x,
            y_position: y,
            office_id: 1,
            desk_number: nextId,
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
    const handleDeskMouseDown = (e: React.MouseEvent, desk: DeskDTO) => {
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
                setDesks(desks.map((desk) => (desk.desk_number === selectedDesk.desk_number ? { ...desk, x: clampedX, y: clampedY } : desk)));
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
    const handleDeskSelection = (desk: DeskDTO) => {
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
        <div className="grid w-full grid-cols-3 gap-x-4" ref={containerRef}>
            <FloorPlanEditorImage image={initialImage} desks={desks} />
            <FloorPlanEditorSidebar desks={desks} />
        </div>
    );
};

export default FloorPlanEditor;
