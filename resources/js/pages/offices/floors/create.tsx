import FloorForm, { FloorFormProps } from '@/components/floor/floor-form';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import AdminLayout from '@/layouts/admin/layout';
import { BreadcrumbItem } from '@/types';
import { Office } from '@/types/office';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useMemo } from 'react';

interface PageProps {
    office: Office;
}

export type CreateFloorForm = {
    name: string;
    plan_image: File | null;
    office_id: number;
};

const CreateFloorPage: React.FC<PageProps> = (props) => {
    const { office } = props;

    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
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
                title: 'Create Floor',
                href: `/offices/${office.id}/floors/create`,
            },
        ];
    }, [office.name, office.id]);

    const { data, setData, post, processing, errors, setError } = useForm<CreateFloorForm>({
        name: '',
        office_id: office.id,
        plan_image: null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.plan_image) {
            setError('plan_image', 'Field is required');
        }

        post(route('offices.floors.store', office.id), {
            forceFormData: true,
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    const formProps: FloorFormProps = {
        nameValue: data.name,
        planImageValue: data.plan_image,
        isLoading: processing,
        onSubmit: handleSubmit,
        officeIdValue: office.id,
        planImageUrl: null,
        errors: errors,
        setInput: (newValue, field) => setData(field, newValue),
    };
    return (
        <AdminLayout title={'Create a floor'} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title="Create a floor" description={`Create a floor for: ${office.name}`} />
            <FloorForm {...formProps} />
        </AdminLayout>
    );
};

export default CreateFloorPage;
