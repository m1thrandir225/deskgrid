import DemoBanner from '@/components/demo-banner';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import AppSidebarLayout from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
}

export default function AppLayout({ children, breadcrumbs = [], title }: AppLayoutProps) {
    const { auth, demo, flash } = usePage<SharedData>().props;
    const isAdmin = auth.user.role === 'admin';

    useEffect(() => {
        if (flash.error) {
            toast.error(flash.error);
        } else if (flash.message) {
            toast.success(flash.message);
        }
    }, [flash]);

    return isAdmin ? (
        <AppSidebarLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="relative flex h-full w-full flex-col gap-8 px-4 py-6">
                {children}
                {demo && <DemoBanner />}
            </div>
            <Toaster />
        </AppSidebarLayout>
    ) : (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className={'relative'}>
                {children}
                {demo && <DemoBanner />}
            </div>

            <Toaster />
        </AppHeaderLayout>
    );
}
