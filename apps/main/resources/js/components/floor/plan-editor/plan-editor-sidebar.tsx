import React from 'react';
import { useFloorPlanEditorContext } from '@/contexts/plan-editor-context';
import PlanEditorSidebarItem from '@/components/floor/plan-editor/plan-editor-sidebar-item';

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
                <h2 className="text-lg font-semibold text-gray-900">Desks</h2>
                <p className="text-sm text-gray-600">{visibleDesks.length} total desks</p>
                <p className="text-xs text-gray-500 mt-1">
                    History: {historyIndex + 1}/{historyState.total}
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
            </div>
        </div>
    )
}

export default FloorPlanEditorSidebar;
