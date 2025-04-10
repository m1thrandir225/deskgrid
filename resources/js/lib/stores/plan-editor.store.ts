import { Desk, DeskDTO, EditorDesk } from '@/types/desk';
import { temporal, type TemporalState } from 'zundo';
import { create } from 'zustand';

interface FloorPlanState {
    desks: EditorDesk[];
    initialDesksSnapshot: Desk[];
    officeId: number | null;
    //Actions
    initialize: (initialDesks: Desk[], officeId: number) => void;
    addDesk: (x: number, y: number) => void;
    updateDesk: (clientId: string, changes: Partial<Pick<EditorDesk, 'x_position' | 'y_position'>>) => void;
    deleteDesk: (clientId: string) => void;
    reorderDesks: (orderedDesks: EditorDesk[]) => void;
    undo: () => void;
    redo: () => void;

    getBackendPayload: () => { created: DeskDTO[]; updated: Desk[]; deleted: number[] };
}

type StoreState = FloorPlanState & TemporalState<Pick<FloorPlanState, 'desks'>>;

export const useFloorPlanStore = create<StoreState>()(
    temporal((set, get, store) => ({
        desks: [],
        initialDesksSnapshot: [],
        officeId: null,

        initialize: (initialDesks, officeId) => {},
    })),
);
