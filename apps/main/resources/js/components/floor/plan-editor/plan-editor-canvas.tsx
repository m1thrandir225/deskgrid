import { useFloorPlanEditorContext } from '@/contexts/plan-editor-context';
import React from 'react';

const FloorPlanEditorCanvas: React.FC = () => {
    const {
        floor,
        floorPlanRef,
        relativeToAbsolute,
        handleImageLoad,
        imageRef,
        handleMouseUp,
        handleMouseMove,
        handleMouseDown,
        visibleDesks,
        selectedDeskId,
        isDragging,
    } = useFloorPlanEditorContext();
    return (
        <div className="bg-background col-span-2 h-full w-full border-r pr-2">
            <div
                ref={floorPlanRef}
                className="relative inline-block min-h-full min-w-full"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <img
                    ref={imageRef}
                    src={floor.plan_image_url}
                    alt={floor.name}
                    className="h-full max-w-full object-contain"
                    onLoad={handleImageLoad}
                    draggable={false}
                />

                {/* Desks */}
                {visibleDesks.map((desk) => {
                    const absolutePos = relativeToAbsolute(desk.x_position, desk.y_position);
                    return (
                        <div
                            key={desk.clientId}
                            className={`absolute flex h-10 w-10 cursor-move items-center justify-center rounded-lg border-2 text-xs font-bold transition-all select-none ${
                                selectedDeskId === desk.clientId
                                    ? 'scale-110 border-blue-700 bg-blue-500 text-white shadow-lg'
                                    : desk.status === 'new'
                                      ? 'border-green-600 bg-green-400 text-white'
                                      : desk.status === 'updated'
                                        ? 'border-yellow-600 bg-yellow-400 text-gray-900'
                                        : 'border-gray-400 bg-gray-200 text-gray-700'
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
    );
};

export default FloorPlanEditorCanvas;
