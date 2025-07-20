import React from 'react';
import { useFloorPlanEditorContext } from '@/contexts/plan-editor-context';
import { Button } from '@/components/ui/button';
import { Plus, Redo, Save, Undo } from 'lucide-react';

const FloorPlanEditorToolbar: React.FC = () => {
    const { addDesk, saveChanges, undo, redo, canRedo, canUndo, hasChanges} = useFloorPlanEditorContext();
    return (
        <div className="bg-background border-b px-4 pb-4 flex justify-between items-center">
            <h1 className="text-lg font-extrabold">Desk orientation</h1>
            <div className="flex gap-3">
                <Button variant={"outline"}  onClick={undo} disabled={!canUndo}>
                    <Undo size={16}/>
                </Button>
                <Button variant={"outline"} onClick={redo} disabled={!canRedo}>
                    <Redo size={16}/>
                </Button>
                <Button onClick={addDesk}>
                    <Plus size={16}/>
                    Add Desk
                </Button>
                <Button variant={"outline"} onClick={saveChanges} disabled={!hasChanges}>
                    <Save size={16}/>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}

export default FloorPlanEditorToolbar;
