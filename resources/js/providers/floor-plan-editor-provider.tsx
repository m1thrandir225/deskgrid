import { Office } from '@/types/office';
import { Floor } from '@/types/floor';
import FloorPlanEditorContext from '@/contexts/plan-editor-context';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EditorDesk } from '@/types/desk';
import { router } from '@inertiajs/react';

interface HistoryState {
    desks: EditorDesk[];
    nextClientId: number;
}

const useFloorPlanEditorState = (props: { floor: Floor, office: Office}) => {
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
    const canUndo = useMemo(() => {
        return historyIndex > 0;
    }, [historyIndex]);

    const canRedo = useMemo(() => {
        return historyIndex < history.length - 1;
    }, [history, historyIndex]);

    return {
        editorDesks,
        visibleDesks,
        setSelectedDeskId,
        canUndo,
        canRedo,
        historyState: { current: historyIndex + 1, total: history.length },
        floorPlanRef,
        imageRef,
        handleImageLoad,
        office,
        floor,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        addDesk,
        deleteDesk,
        undo,
        redo,
        selectedDeskId,
        selectDesk: (clientId: number | null) => setSelectedDeskId(clientId),
        saveChanges: handleSave,
        relativeToAbsolute,
        isDragging,
        historyIndex,
    }

}

export const FloorPlanEditorProvider: React.FC<{ children: React.ReactNode, office: Office, floor: Floor }> = (props) => {
    const { children, floor, office} = props;

    const value = useFloorPlanEditorState({ floor, office });

    return (
        <FloorPlanEditorContext.Provider value={value}>
            {children}
        </FloorPlanEditorContext.Provider>
    )
}
