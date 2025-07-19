import React from 'react';
import { useFloorPlanEditorContext } from '@/contexts/plan-editor-context';
import PlanEditorDeskListItem from '@/components/floor/plan-editor/plan-editor-desk-list-item';

const FloorPlanEditorCanvas: React.FC = () => {
    const { floorPlanRef, handleImageLoad, imageRef, handleMouseUp, handleMouseMove, handleMouseDown, visibleDesks} = useFloorPlanEditorContext();
    return (
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
    )
}
