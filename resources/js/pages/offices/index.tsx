import OfficeLayoutHeader from '@/components/office/office-layout-header';
import OfficeListItem from '@/components/office/office-list-item';
import { Button } from '@/components/ui/button';
import OfficesLayout from '@/layouts/offices/layout';
import { BreadcrumbItem } from '@/types';
import { type Office } from '@/types/office';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offices',
        href: '/offices',
    },
];

interface PageProps {
    offices: Office[];
}

export default function Index({ offices }: PageProps) {
    return (
        <OfficesLayout title="Offices" breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title="Offices" description="Manage your offices">
                <Button asChild size={'icon'} variant={'outline'}>
                    <Link href="/offices/create">
                        <PlusIcon size={24} />
                    </Link>
                </Button>
            </OfficeLayoutHeader>
            <div className="flex w-full flex-col gap-4">
                {offices.map((office) => (
                    <OfficeListItem office={office} key={office.id} />
                ))}
            </div>
        </OfficesLayout>
    );
}
