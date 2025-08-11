import React, { createContext, useContext} from 'react';
import { EditorDesk } from '@/types/desk';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';

export interface FloorPlanEditorContext {
    floor: Floor,
    office: Office,
    editorDesks:  EditorDesk[]
    visibleDesks:   EditorDesk[]
    selectedDeskId: number | null;
    canUndo: boolean;
    canRedo: boolean;
    isDragging: boolean;
    historyState: { current: number; total: number};
    floorPlanRef: React.RefObject<HTMLDivElement | null>;
    imageRef: React.RefObject<HTMLImageElement | null>;
    handleImageLoad: () => void;
    handleMouseDown: (e: React.MouseEvent, desk: EditorDesk) => void;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
    addDesk: () => void;
    deleteDesk: (clientId: number) => void;
    selectDesk: (clientId: number | null) => void;
    undo: () => void;
    redo: () => void;
    saveChanges: () => void;
    relativeToAbsolute: (relativeX: number, relativeY: number) => {x: number, y: number};
    historyIndex: number;
    updateDeskLocationDescription: (newDescription: string) => void;
    hasChanges: boolean;
}

const FloorPlanEditorContext = createContext<FloorPlanEditorContext | null>(null)

export const useFloorPlanEditorContext = () => {
    const context = useContext(FloorPlanEditorContext);
    if (!context) {
        throw new Error('useFloorPlanEditorContext must be used within a FloorPlanEditorProvider');
    }
    return context;
}

export default FloorPlanEditorContext;
