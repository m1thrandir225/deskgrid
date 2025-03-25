import DeskListItem from '@/components/desk/desk-list-item';
import type { Office } from '@/types/office';

interface PageProps {
    office: Office;
}
const OfficeShowPage: React.FC<PageProps> = (props) => {
    const { office } = props;
    return (
        <div>
            <h1> Office: {office.name} </h1>
            {office?.desks && office.desks.map((desk) => <DeskListItem key={desk.id} desk={desk} />)}
        </div>
    );
};

export default OfficeShowPage;
