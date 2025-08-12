import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import DemoBanner from '@/components/demo-banner';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    const { demo } = usePage<SharedData>().props;
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
            {demo && <DemoBanner />}
        </AuthLayoutTemplate>
    );
}
