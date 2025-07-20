import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import FloorPlanEditorCanvas from '@/components/floor/plan-editor/plan-editor-canvas';
import FloorPlanEditorSidebar from '@/components/floor/plan-editor/plan-editor-sidebar';
import FloorPlanEditorToolbar from '@/components/floor/plan-editor/plan-editor-toolbar';
import { FloorPlanEditorProvider } from '@/providers/floor-plan-editor-provider';
interface ComponentProps {
    office: Office,
    floor: Floor
}

const FloorPlanEditor: React.FC<ComponentProps> = (props) => {
    const { floor, office } = props;

    return (
        <FloorPlanEditorProvider office={office} floor={floor}>
            <div className="h-auto bg-background flex flex-col">
                <FloorPlanEditorToolbar />
                {/* Main Content */}
                <div className="grid grid-cols-3">
                    <FloorPlanEditorCanvas />
                    <FloorPlanEditorSidebar />
                </div>
            </div>
        </FloorPlanEditorProvider>
    );
};

export default FloorPlanEditor;
