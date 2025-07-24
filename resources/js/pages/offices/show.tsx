import FloorTable from '@/components/floor/floor-table';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin/layout';
import type { Office } from '@/types/office';
import { Link, useForm } from '@inertiajs/react';
import { Edit2, Plus, TrashIcon } from 'lucide-react';
import React, { FormEventHandler, useMemo } from 'react';

interface PageProps {
    office: Office;
}

const OfficeShowPage: React.FC<PageProps> = (props) => {
    const { office } = props;

    const floors = useMemo(() => {
        return office.floors;
    }, [office])

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: 'Offices',
                href: '/offices',
            },
            {
                title: office.name,
                href: `/offices/${office.id}`,
            },
        ];
    }, [office.id, office.name]);

    const { delete: destroy, processing } = useForm();

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('offices.destroy', office.id));
    };

    return (
        <AdminLayout title={`${office.name} Details`} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={office.name} description={office.address}>
                <Button asChild size={'icon'} variant={'outline'}>
                    <Link href={`/offices/${office.id}/edit`}>
                        <Edit2 size={12} />
                    </Link>
                </Button>
                <form onSubmit={onSubmit}>
                    <Button size={'icon'} variant={'outline'} disabled={processing}>
                        <TrashIcon size={24} />
                    </Button>
                </form>
            </OfficeLayoutHeader>
            <div className="flex flex-col items-start">
                <div className="flex w-full flex-row items-center justify-between px-4">
                    <h1 className="text-lg font-extrabold">Floors</h1>
                    <Button asChild size={'icon'} variant={'outline'}>
                        <Link href={`/offices/${office.id}/floors/create`}>
                            <Plus size={24} />
                        </Link>
                    </Button>
                </div>
                {floors && floors.length > 0 ? (
                    <FloorTable items={floors} officeId={office.id} />
                ) : (
                    <p>Please create a floor to see it show up here.</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default OfficeShowPage;
