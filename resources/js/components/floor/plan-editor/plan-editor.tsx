import { useCallback, useEffect, useRef, useState } from 'react';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { EditorDesk } from '@/types/desk';
import { Move, Plus, Save, Trash2 } from 'lucide-react';
import { getFileUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ComponentProps {
    office: Office,
    floor: Floor

}

const FloorPlanEditor: React.FC<ComponentProps> = (props) => {
    const { floor } = props;
    const [editorDesks, setEditorDesks] = useState<EditorDesk[]>([]);
    const [selectedDeskId, setSelectedDeskId] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [nextClientId, setNextClientId] = useState(1000);
    const [floorPlanDimensions, setFloorPlanDimensions] = useState({ width: 0, height: 0 });

    const floorPlanRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Initialize editor desks from existing floor data
    useEffect(() => {
        if (floor.desks) {
            const initialDesks: EditorDesk[] = floor.desks.map(desk => ({
                ...desk,
                clientId: desk.id || nextClientId,
                status: 'initial'
            }));
            setEditorDesks(initialDesks);
            setNextClientId(prev => prev + floor.desks!.length);
        }
    }, [floor.desks, nextClientId]);

    // Handle floor plan image load to get dimensions
    const handleImageLoad = useCallback(() => {
        if (imageRef.current) {
            setFloorPlanDimensions({
                width: imageRef.current.clientWidth,
                height: imageRef.current.clientHeight
            });
        }
    }, []);

    // Convert relative position (0-1) to absolute pixels
    const relativeToAbsolute = useCallback((relativeX: number, relativeY: number) => {
        return {
            x: relativeX * floorPlanDimensions.width,
            y: relativeY * floorPlanDimensions.height
        };
    }, [floorPlanDimensions]);

    // Convert absolute pixels to relative position (0-1)
    const absoluteToRelative = useCallback((absoluteX: number, absoluteY: number) => {
        return {
            x: floorPlanDimensions.width > 0 ? absoluteX / floorPlanDimensions.width : 0,
            y: floorPlanDimensions.height > 0 ? absoluteY / floorPlanDimensions.height : 0
        };
    }, [floorPlanDimensions]);

    // Add a new desk
    const addDesk = useCallback(() => {
        const newDesk: EditorDesk = {
            clientId: nextClientId,
            office_id: floor.office_id,
            desk_number: editorDesks.length + 1,
            location_description: `Desk ${editorDesks.length + 1}`,
            x_position: 0.1, // 10% from left edge
            y_position: 0.1, // 10% from top edge
            is_active: true,
            status: 'new'
        };

        setEditorDesks(prev => [...prev, newDesk]);
        setNextClientId(prev => prev + 1);
    }, [nextClientId, editorDesks.length, floor.office_id]);

    // Delete a desk
    const deleteDesk = useCallback((clientId: number) => {
        setEditorDesks(prev => prev.map(desk =>
            desk.clientId === clientId
                ? { ...desk, status: 'deleted' as const }
                : desk
        ));
        setSelectedDeskId(null);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent, desk: EditorDesk) => {
        e.preventDefault();

        setSelectedDeskId(desk.clientId);
        setIsDragging(true);

        const rect = floorPlanRef.current?.getBoundingClientRect();
        const absolutePos = relativeToAbsolute(desk.x_position, desk.y_position);

        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left - absolutePos.x,
                y: e.clientY - rect.top - absolutePos.y
            });
        }
    }, [relativeToAbsolute]);

    // Handle mouse move (dragging)
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging || selectedDeskId === null) return;

        const rect = floorPlanRef.current?.getBoundingClientRect();
        if (!rect) return;

        const absoluteX = Math.max(0, Math.min(
            floorPlanDimensions.width - 40,
            e.clientX - rect.left - dragOffset.x
        ));
        const absoluteY = Math.max(0, Math.min(
            floorPlanDimensions.height - 40,
            e.clientY - rect.top - dragOffset.y
        ));

        const relativePos = absoluteToRelative(absoluteX, absoluteY);

        setEditorDesks(prev => prev.map(desk =>
            desk.clientId === selectedDeskId
                ? {
                    ...desk,
                    x_position: relativePos.x,
                    y_position: relativePos.y,
                    status: desk.status === 'initial' ? 'updated' : desk.status
                }
                : desk
        ));
    }, [isDragging, selectedDeskId, dragOffset, floorPlanDimensions, absoluteToRelative]);

    // Handle mouse up (stop dragging)
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setSelectedDeskId(null);
    }, []);

    // Handle save
    const handleSave = useCallback(() => {
        const desksToSave = editorDesks.filter(desk => desk.status !== 'deleted');
        console.log('Saving desks:', desksToSave);
        // Here you would call your Laravel API
        alert(`Would save ${desksToSave.length} desks to the server`);
    }, [editorDesks]);

    // Get visible desks (not deleted)
    const visibleDesks = editorDesks.filter(desk => desk.status !== 'deleted');

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-background border-b px-4 pb-4 ">
                <div className="flex justify-between items-center">
                    <h1 className={"text-lg font-extrabold"}>Desk orientation</h1>
                    <div className="flex gap-3">
                        <Button onClick={addDesk}>
                            <Plus size={16}/>
                            Add Desk
                        </Button>
                        <Button variant={"outline"} onClick={handleSave}>
                            <Save size={16}/>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Floor Plan Area (70%) */}
                <div className="flex-1 relative bg-white border-r overflow-auto" style={{ width: '70%' }}>
                    <div
                        ref={floorPlanRef}
                        className="relative inline-block min-w-full min-h-full"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* Floor Plan Image */}
                        <img
                            ref={imageRef}
                            src={getFileUrl(floor.plan_image)}
                            alt={floor.name}
                            className="max-w-none"
                            onLoad={handleImageLoad}
                            draggable={false}
                        />

                        {/* Desks */}
                        {visibleDesks.map(desk => {
                            const absolutePos = relativeToAbsolute(desk.x_position, desk.y_position);
                            return (
                                <div
                                    key={desk.clientId}
                                    className={`absolute w-10 h-10 rounded-lg border-2 cursor-move flex items-center justify-center text-xs font-bold select-none transition-all ${
                                        selectedDeskId === desk.clientId
                                            ? 'bg-blue-500 border-blue-700 text-white shadow-lg scale-110'
                                            : desk.status === 'new'
                                                ? 'bg-green-400 border-green-600 text-white'
                                                : desk.status === 'updated'
                                                    ? 'bg-yellow-400 border-yellow-600 text-gray-900'
                                                    : 'bg-gray-200 border-gray-400 text-gray-700'
                                    } ${isDragging && selectedDeskId === desk.clientId ? 'z-50' : 'z-10'}`}
                                    style={{
                                        left: absolutePos.x,
                                        top: absolutePos.y,
                                    }}
                                    onMouseDown={(e) => handleMouseDown(e, desk)}
                                >
                                    {desk.desk_number}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Desk List (30%) */}
                <div className="bg-white" style={{ width: '30%' }}>
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Desks</h2>
                        <p className="text-sm text-gray-600">{visibleDesks.length} total desks</p>
                    </div>

                    <div className="overflow-y-auto h-full pb-20">
                        {visibleDesks.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No desks yet. Click "Add Desk" to get started.
                            </div>
                        ) : (
                            <div className="space-y-2 p-4">
                                {visibleDesks.map(desk => (
                                    <div
                                        key={desk.clientId}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                            selectedDeskId === desk.clientId
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                        onClick={() => setSelectedDeskId(desk.clientId)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-gray-900">
                                                        Desk {desk.desk_number}
                                                    </span>
                                                    {desk.status === 'new' && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                            New
                                                        </span>
                                                    )}
                                                    {desk.status === 'updated' && (
                                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                                            Modified
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    Position: ({(desk.x_position * 100).toFixed(1)}%, {(desk.y_position * 100).toFixed(1)}%)
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Move size={16} className="text-gray-400" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        deleteDesk(desk.clientId);
                                                    }}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloorPlanEditor;
