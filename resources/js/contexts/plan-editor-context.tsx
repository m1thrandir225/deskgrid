import React, { createContext, useContext} from 'react';
import { EditorDesk } from '@/types/desk';

interface FloorPlanEditorContext {
    editorDesks:  EditorDesk[]
    visibleDesks:   EditorDesk[]
    selectDeskId: number | null;
    canUndo: boolean;
    canRedo: boolean;
    historyState: { current: number; total: number};
    floorPlanRef: React.RefObject<HTMLDivElement | null>;
    imageRef: React.RefObject<HTMLDivElement | null>;
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
