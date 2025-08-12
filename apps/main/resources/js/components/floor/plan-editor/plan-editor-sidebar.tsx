import React from 'react';
import { useFloorPlanEditorContext } from '@/contexts/plan-editor-context';
import PlanEditorSidebarItem from '@/components/floor/plan-editor/plan-editor-sidebar-item';
import { ScrollArea } from '@/components/ui/scroll-area';

const FloorPlanEditorSidebar: React.FC = () => {
    const {
        visibleDesks,
        selectDesk,
        deleteDesk,
        selectedDeskId,
        historyIndex,
        updateDeskLocationDescription,
        historyState
    } = useFloorPlanEditorContext();
    return (
        <div className="bg-background w-full h-full col-span-1" >
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold ">Desks</h2>
                <p className="text-sm ">{visibleDesks.length} total desks</p>
                <p className="text-xs text-gray-400 mt-1">
                    History: {historyIndex + 1}/{historyState.total}
                </p>
            </div>

            <ScrollArea className={"h-full w-full p-4 max-h-[650px]"} >
                {visibleDesks.length === 0 ? (
                    <div className="p-4 text-center ">
                        No desks yet. Click "Add Desk" to get started.
                    </div>
                ) : (
                    <div className="space-y-2 p-4">
                        {visibleDesks.map(desk => (
                            <PlanEditorSidebarItem
                                key={desk.clientId}
                                desk={desk}
                                selectDesk={() => selectDesk(desk.clientId)}
                                deleteDesk={() => deleteDesk(desk.clientId)}
                                isSelected={selectedDeskId === desk.clientId}
                                updateDeskLocationDescription={(newValue: string) => updateDeskLocationDescription(newValue)}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>

            <div className="h-auto overflow-y-scroll max-h-[500px]">

            </div>
        </div>
    )
}

export default FloorPlanEditorSidebar;
