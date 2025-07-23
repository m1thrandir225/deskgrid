import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '../app-layout';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

interface Props {
    children?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title: string;
}

const AdminLayout: React.FC<Props> = (props) => {
    const { children, breadcrumbs, title } = props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex w-full flex-col gap-8 px-4 py-6">
                {children}
            </div>
            <Toaster/>
        </AppLayout>
    );
};

export default AdminLayout;
