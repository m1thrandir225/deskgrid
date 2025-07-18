import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { BreadcrumbItem } from '@/types';
import OfficesLayout from '@/layouts/offices/layout';
import React, { useMemo } from 'react';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import FloorPlanEditor from '@/components/floor/plan-editor/plan-editor';
import { getFileUrl } from '@/lib/utils';

interface PageProps {
    floor: Floor;
    office: Office;
    floor_plan_url: string;
}

const FloorEditPage: React.FC<PageProps> = (props) => {
    const { floor, office, floor_plan_url } = props;

    const breadcrumbs = useMemo<BreadcrumbItem[]>(()  => {
        return [
            {
                title: "Offices",
                href: "/offices",
            },
            {
                title: office.name,
                href: `/offices/${office.id}`,
            },
            {
                title: "Floors",
                href: null
            },
            {
                title: floor.name,
                href: `/offices/${office.id}/floors/${floor.id}`,
            },
            {
                title: `Edit`,
                href: `/offices/${office.id}/floors/${floor.id}/edit`,
            }
        ] as BreadcrumbItem[];
    }, [floor, office])
    return (
        <OfficesLayout title={floor.name} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={`Editing: ${floor.name}`} description={"Update the floor details"} />
            <FloorPlanEditor office={office} floor={floor} />
        </OfficesLayout>
    )
}
export default FloorEditPage;
