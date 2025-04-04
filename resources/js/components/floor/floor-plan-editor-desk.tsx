import { Desk } from '@/types/desk';

interface Props {
    desk: Desk;
}

const FloorPlanEditorDesk: React.FC<Props> = (props) => {
    const { desk } = props;
    return (
        <div>
            <h1>
                Desk: {desk.x_position} {desk.y_position}
            </h1>
        </div>
    );
};

export default FloorPlanEditorDesk;
