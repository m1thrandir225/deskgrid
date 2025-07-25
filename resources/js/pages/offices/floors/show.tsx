import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/layout';
import { BreadcrumbItem } from '@/types';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { Link, useForm } from '@inertiajs/react';
import { Edit2, Trash } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';
import FloorPlanEditor from '@/components/floor/plan-editor/plan-editor';

interface PageProps {
    floor: Floor;
    office: Office;
}

const FloorDetailsPage: React.FC<PageProps> = (props) => {
    const { office, floor } = props;

    const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
        return [
            {
                title: 'Offices',
                href: '/offices',
            },
            {
                title: office.name,
                href: `/offices/${office.id}`,
            },
            {
                title: 'Floors',
                href: null,
            },
            {
                title: floor.name,
                href: `/offices/${office.id}/floors/${floor.id}`,
            },
        ] as BreadcrumbItem[];
    }, [floor, office]);

    const { delete: destroy, processing } = useForm();

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('offices.floors.destroy', [office.id, floor.id]));
    };

    return (
        <AdminLayout title={floor.name} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={floor.name} description={`Details about: ${floor.name}`}>
                <Button asChild variant="outline" size="icon">
                    <Link href={`/offices/${office.id}/floors/${floor.id}/edit`}>
                        <Edit2 size={24} />
                    </Link>
                </Button>
                <form onSubmit={onSubmit}>
                    <Button type="submit" variant="destructive" size="icon" disabled={processing}>
                        <Trash size={24} />
                    </Button>
                </form>
            </OfficeLayoutHeader>
            <FloorPlanEditor office={office} floor={floor} />
        </AdminLayout>
    );
};

export default FloorDetailsPage;
