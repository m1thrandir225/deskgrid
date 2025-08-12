import React, { useCallback, useState } from 'react';
import { EditorDesk } from '@/types/desk';
import { Move, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ComponentProps {
    desk: EditorDesk;
    selectDesk: () => void;
    updateDeskLocationDescription: (value: string) => void;
    deleteDesk: () => void;
    isSelected: boolean;
}

const PlanEditorSidebarItem: React.FC<ComponentProps> = (props) => {
    const { desk, selectDesk, deleteDesk, isSelected, updateDeskLocationDescription } = props;

    const [locationDescription, setLocationDescription] = useState<string>(desk.location_description)

    const handleUpdateLocationDescription = useCallback((newValue: string) => {
        setLocationDescription(newValue);
        updateDeskLocationDescription(newValue);
    }, [updateDeskLocationDescription])
    return (
        <div
            key={desk.clientId}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected
                    ? 'border-blue-500 '
                    : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={selectDesk}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 gap-2 flex flex-col w-full">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Desk {desk.desk_number}</span>
                        {desk.status === 'new' && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">New</span>
                        )}
                        {desk.status === 'updated' && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Modified</span>
                        )}
                    </div>
                    <p className="text-sm  mt-1">
                        Position: ({(desk.x_position * 100).toFixed(1)}%, {(desk.y_position * 100).toFixed(1)}%)
                    </p>
                    <Input
                        type={"text"}
                        placeholder={"Location description"}
                        className={"w-full"}
                        value={locationDescription}
                        onChange={(e) => handleUpdateLocationDescription(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-1">
                    <Move size={16} className="text-gray-400" />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteDesk();
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlanEditorSidebarItem;
