import { Desk } from '@/types/desk';

interface Props {
    desk: Desk;
}

const DeskListItem: React.FC<Props> = (props) => {
    const { desk } = props;
    return (
        <div>
            <h1> Desk </h1>
            <pre> {JSON.stringify(desk)}</pre>
        </div>
    );
};

export default DeskListItem;
