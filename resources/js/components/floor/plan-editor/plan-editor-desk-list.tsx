import React from 'react';
import { EditorDesk } from '@/types/desk';
import PlanEditorDeskListItem from '@/components/floor/plan-editor/plan-editor-desk-list-item';

interface ComponentProps {
    desks: EditorDesk[]
    historyIndex: number;
    selectDesk:
}

const PlanEditorDeskList: React.FC<ComponentProps> = (props) => {
    const { desks, historyIndex } = props;
    return (
        <div className="bg-background w-full h-full col-span-1" >
            <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Desks</h2>
                <p className="text-sm text-gray-600">{desks.length} total desks</p>
                <p className="text-xs text-gray-500 mt-1">
                    History: {historyIndex + 1}/{history.length}
                </p>
            </div>

            <div className="h-auto overflow-y-scroll max-h-[500px]">
                {desks.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No desks yet. Click "Add Desk" to get started.
                    </div>
                ) : (
                    <div className="space-y-2 p-4">
                        {desks.map(desk => (
                            <PlanEditorDeskListItem
                                desk={desk}
                                selectDesk={() => setSelectedDeskId(desk.clientId)}
                                deleteDesk={() => deleteDesk(desk.clientId)}
                                isSelected={selectedDeskId === desk.clientId}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PlanEditorDeskList;
