import { DeskDTO } from '@/types/desk';
import FloorPlanEditorDesk from './plan-editor-sidebar-item';

interface Props {
    desks: DeskDTO[];
}

const FloorPlanEditorSidebar: React.FC<Props> = (props) => {
    const { desks } = props;

    return (
        <div className="flex h-full w-full flex-col items-start rounded-md border p-4">
            <h1 className="text-2xl font-bold"> Desks </h1>
            <div className="h-full w-full">
                {desks.map((desk) => (
                    <FloorPlanEditorDesk desk={desk} key={desk.desk_number} />
                ))}
            </div>
        </div>
    );
};

export default FloorPlanEditorSidebar;
