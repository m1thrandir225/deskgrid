import { Desk } from '@/types/desk';
import { ArrowRightIcon } from 'lucide-react';

interface Props {
    desk: Desk;
}

const DeskListItem: React.FC<Props> = (props) => {
    const { desk } = props;
    return (
        <div className="group flex w-full flex-row items-center justify-between">
            <div className="flex w-auto flex-col items-start">
                <h1>Desk #{desk.desk_number} </h1>
                <p className="text-[12px]">{desk.location_description}</p>
            </div>
            <ArrowRightIcon size={12} className="transition-all duration-150 ease-in-out group-hover:scale-150" />
        </div>
    );
};

export default DeskListItem;
