import { type BreadcrumbItem, SharedData } from '@/types';
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default function AppLayout({ children, breadcrumbs = [], title }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    const isAdmin = auth.user.role === 'admin';

    return isAdmin ? (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex w-full flex-col gap-8 px-4 py-6">
                {children}
            </div>
            <Toaster/>
        </AppSidebarLayout>
    ) : (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            {children}
            <Toaster/>
        </AppHeaderLayout>
    );
}
