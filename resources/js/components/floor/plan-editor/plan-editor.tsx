import { useCallback, useEffect, useRef, useState } from 'react';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { EditorDesk } from '@/types/desk';
import { Move, Plus, Redo, Save, Trash2, Undo } from 'lucide-react';
import { getFileUrl } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { router } from "@inertiajs/react"
interface ComponentProps {
    office: Office,
    floor: Floor
}

interface HistoryState {
    desks: EditorDesk[];
    nextClientId: number;
}

const FloorPlanEditor: React.FC<ComponentProps> = (props) => {
    const { floor, office } = props;
    const [editorDesks, setEditorDesks] = useState<EditorDesk[]>([]);
    const [selectedDeskId, setSelectedDeskId] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [nextClientId, setNextClientId] = useState(1000);
    const [floorPlanDimensions, setFloorPlanDimensions] = useState({ width: 0, height: 0 });

    // History management
    const [history, setHistory] = useState<HistoryState[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isUpdatingFromHistory, setIsUpdatingFromHistory] = useState(false);

    const floorPlanRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    // Initialize desks and create initial history state
    useEffect(() => {
        if (floor.desks) {
            const initialDesks: EditorDesk[] = floor.desks.map(desk => ({
                ...desk,
                clientId: desk.id || nextClientId,
                status: 'initial'
            }));

            const initialNextClientId = nextClientId + floor.desks.length;

            setEditorDesks(initialDesks);
            setNextClientId(initialNextClientId);

            // Create initial history state
            const initialState: HistoryState = {
                desks: JSON.parse(JSON.stringify(initialDesks)), // Deep copy
                nextClientId: initialNextClientId
            };
            setHistory([initialState]);
            setHistoryIndex(0);
        }
    }, []);

    // Save state to history (but not when updating from history)
    const saveToHistory = useCallback((desks: EditorDesk[], nextId: number) => {
        if (isUpdatingFromHistory) return;

        const newState: HistoryState = {
            desks: JSON.parse(JSON.stringify(desks)), // Deep copy
            nextClientId: nextId
        };

        setHistory(prev => {
            // Remove any future history if we're not at the end
            const newHistory = prev.slice(0, historyIndex + 1);
            newHistory.push(newState);

            // Limit history size to 50 states
            if (newHistory.length > 50) {
                newHistory.shift();
                return newHistory;
            }

            return newHistory;
        });

        setHistoryIndex(prev => {
            const newIndex = prev + 1;
            return newIndex >= 50 ? 49 : newIndex;
        });
    }, [historyIndex, isUpdatingFromHistory]);

    // Undo function
    const undo = useCallback(() => {
        if (historyIndex <= 0) return;

        const prevIndex = historyIndex - 1;
        const prevState = history[prevIndex];

        setIsUpdatingFromHistory(true);
        setEditorDesks(JSON.parse(JSON.stringify(prevState.desks)));
        setNextClientId(prevState.nextClientId);
        setHistoryIndex(prevIndex);
        setSelectedDeskId(null);

        // Reset the flag after state updates
        setTimeout(() => setIsUpdatingFromHistory(false), 0);
    }, [history, historyIndex]);

    // Redo function
    const redo = useCallback(() => {
        if (historyIndex >= history.length - 1) return;

        const nextIndex = historyIndex + 1;
        const nextState = history[nextIndex];

        setIsUpdatingFromHistory(true);
        setEditorDesks(JSON.parse(JSON.stringify(nextState.desks)));
        setNextClientId(nextState.nextClientId);
        setHistoryIndex(nextIndex);
        setSelectedDeskId(null);

        // Reset the flag after state updates
        setTimeout(() => setIsUpdatingFromHistory(false), 0);
    }, [history, historyIndex]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key === 'z') {
                e.preventDefault();
                undo();
            } else if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') ||
                ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
                e.preventDefault();
                redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [undo, redo]);

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
        const visibleDesks = editorDesks.filter(desk => desk.status !== 'deleted');
        const newDeskNumber = visibleDesks.length + 1;

        const newDesk: EditorDesk = {
            clientId: nextClientId,
            office_id: floor.office_id,
            desk_number: newDeskNumber,
            location_description: `Desk ${newDeskNumber}`,
            x_position: 0.1, // 10% from left edge
            y_position: 0.1, // 10% from top edge
            is_active: true,
            status: 'new'
        };

        const newDesks = [...editorDesks, newDesk];
        const newNextClientId = nextClientId + 1;

        setEditorDesks(newDesks);
        setNextClientId(newNextClientId);

        // Save to history
        saveToHistory(newDesks, newNextClientId);
    }, [nextClientId, editorDesks, floor.office_id, saveToHistory]);

    // Recalculate desk numbers to ensure sequential numbering
    const recalculateDeskNumbers = useCallback((desks: EditorDesk[]) => {
        const visibleDesks = desks.filter(desk => desk.status !== 'deleted');
        return desks.map(desk => {
            if (desk.status === 'deleted') return desk;

            // Find the position of this desk among visible desks
            const visibleIndex = visibleDesks.findIndex(d => d.clientId === desk.clientId);
            const newDeskNumber = visibleIndex + 1;

            if (desk.desk_number !== newDeskNumber) {
                return {
                    ...desk,
                    desk_number: newDeskNumber,
                    location_description: `Desk ${newDeskNumber}`,
                    // Don't change status - renumbering is not a user modification
                };
            }
            return desk;
        });
    }, []);

    // Delete a desk
    const deleteDesk = useCallback((clientId: number) => {
        const deskToDelete = editorDesks.find(desk => desk.clientId === clientId);

        let newDesks: EditorDesk[];

        if (deskToDelete?.status === 'new') {
            // If it's a new desk, simply remove it from the list
            newDesks = editorDesks.filter(desk => desk.clientId !== clientId);
        } else {
            // If it's an existing desk (initial/updated), mark it as deleted
            newDesks = editorDesks.map(desk =>
                desk.clientId === clientId
                    ? { ...desk, status: 'deleted' as const }
                    : desk
            );
        }

        // Recalculate desk numbers after deletion
        newDesks = recalculateDeskNumbers(newDesks);

        setEditorDesks(newDesks);
        setSelectedDeskId(null);

        // Save to history
        saveToHistory(newDesks, nextClientId);
    }, [editorDesks, nextClientId, saveToHistory, recalculateDeskNumbers]);

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

    // Handle mouse up (stop dragging and save to history)
    const handleMouseUp = useCallback(() => {
        if (isDragging && selectedDeskId !== null) {
            // Save the final position to history
            saveToHistory(editorDesks, nextClientId);
        }

        setIsDragging(false);
        setSelectedDeskId(null);
    }, [isDragging, selectedDeskId, editorDesks, nextClientId, saveToHistory]);

    // Handle save
    const handleSave = useCallback(() => {
        // Only desks with 'initial', 'updated', or 'deleted' status need to be processed
        // 'new' desks that aren't deleted are included, 'new' desks that were removed are ignored
        const desksToSave = editorDesks.filter(desk => desk.status === 'new');
        const desksToEdit = editorDesks.filter(desk => desk.status === "updated");
        const desksToDelete = editorDesks.filter(desk => desk.status === 'deleted');

        // Prepare data for backend
        const submitData = {
            "desks_to_create": desksToSave.map(desk => ({
                "floor_id": floor.id,
                "desk_number": desk.desk_number.toString(),
                "x_position": desk.x_position,
                "y_position": desk.y_position,
            })),
            "desks_to_edit": desksToEdit.map(desk => ({
                "id": desk.id,
                "floor_id": floor.id,
                "desk_number": desk.desk_number.toString(),
                "x_position": desk.x_position,
                "y_position": desk.y_position,
            })),
            "desks_to_delete": desksToDelete.map(desk => desk.id).filter(Boolean),
            "office_id":  office.id,
            "floor_id": floor.id
        }

        router.post(route("desk.storeMultiple"), submitData, {
            onError: (error) => {
                console.log(error);
            },
            onSuccess: () => {
                setEditorDesks(prev => prev
                    .filter(desk => desk.status !== 'deleted')
                    .map(desk => ({ ...desk, status: 'initial' }))
                );
            }
        })
    }, [editorDesks, floor.id]);

    const visibleDesks = editorDesks.filter(desk => desk.status !== 'deleted');

    // Check if undo/redo are available
    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    return (
        <div className="h-auto bg-background flex flex-col">
            {/* Header */}
            <div className="bg-background border-b px-4 pb-4 ">
                <div className="flex justify-between items-center">
                    <h1 className={"text-lg font-extrabold"}>Desk orientation</h1>
                    <div className="flex gap-3">
                        <div className="flex gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={undo}
                                disabled={!canUndo}
                                title="Undo (Ctrl+Z)"
                            >
                                <Undo size={16}/>
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={redo}
                                disabled={!canRedo}
                                title="Redo (Ctrl+Shift+Z)"
                            >
                                <Redo size={16}/>
                            </Button>
                        </div>
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
            <div className="grid grid-cols-3">
                <div className="border-r bg-background h-full pr-2 col-span-2 w-full">
                    <div
                        ref={floorPlanRef}
                        className="relative inline-block min-w-full min-h-full"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <img
                            ref={imageRef}
                            src={getFileUrl(floor.plan_image)}
                            alt={floor.name}
                            className="max-w-full h-full object-contain"
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
                <div className="bg-background w-full h-full col-span-1" >
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">Desks</h2>
                        <p className="text-sm text-gray-600">{visibleDesks.length} total desks</p>
                        <p className="text-xs text-gray-500 mt-1">
                            History: {historyIndex + 1}/{history.length}
                        </p>
                    </div>

                    <div className="h-auto overflow-y-scroll max-h-[500px]">
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
