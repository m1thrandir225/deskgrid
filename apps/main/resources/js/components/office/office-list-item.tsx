import { Office } from '@/types/office';
import { Link } from '@inertiajs/react';
import { ArrowRightIcon, MapPin } from 'lucide-react';
import React from 'react';

type Props = {
    office: Office;
};

const OfficeListItem: React.FC<Props> = ({ office }) => {
    const itemHref = React.useMemo(() => {
        return `/offices/${office.id}`;
    }, [office]);

    return (
        <Link
            href={itemHref}
            className="bg-background text-primary group flex w-full flex-row items-center justify-between rounded-md px-4 py-2 border transition-all duration-300 ease-in-out hover:border-accent-foreground/50 hover:opacity-90"
        >
            <div className="flex flex-col items-start gap-1">
                <h1> {office.name} </h1>
                <div className="flex flex-row items-center gap-1 text-[12px]">
                    <MapPin size={12} />
                    <span>{office.address}</span>
                </div>
            </div>
            <ArrowRightIcon className="transition-all duration-150 ease-in-out" />
        </Link>
    );
};

export default OfficeListItem;
