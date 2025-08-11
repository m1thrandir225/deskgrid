import FloorPlanEditorCanvas from '@/components/floor/plan-editor/plan-editor-canvas';
import FloorPlanEditorSidebar from '@/components/floor/plan-editor/plan-editor-sidebar';
import FloorPlanEditorToolbar from '@/components/floor/plan-editor/plan-editor-toolbar';
import { PlanEditorProvider } from '@/providers/plan-editor-provider';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
interface ComponentProps {
    office: Office;
    floor: Floor;
}

const FloorPlanEditor: React.FC<ComponentProps> = (props) => {
    const { floor, office } = props;

    return (
        <PlanEditorProvider office={office} floor={floor}>
            <div className="bg-background flex h-auto flex-col">
                <FloorPlanEditorToolbar />
                {/* Main Content */}
                <div className="grid grid-cols-3">
                    <FloorPlanEditorCanvas />
                    <FloorPlanEditorSidebar />
                </div>
            </div>
        </PlanEditorProvider>
    );
};

export default FloorPlanEditor;
