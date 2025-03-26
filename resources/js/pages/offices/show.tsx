import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import OfficesLayout from '@/layouts/offices/layout';
import type { Office } from '@/types/office';
import { Link, useForm } from '@inertiajs/react';
import { Edit2, TrashIcon } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';

interface PageProps {
    office: Office;
}

const OfficeShowPage: React.FC<PageProps> = (props) => {
    const { office } = props;
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
        <OfficesLayout title={`${office.name} Details`} breadcrumbs={breadcrumbs}>
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
        </OfficesLayout>
    );
};

export default OfficeShowPage;
