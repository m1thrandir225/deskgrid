import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { BreadcrumbItem } from '@/types';
import AdminLayout from '@/layouts/admin/layout';
import React, { FormEventHandler, useMemo } from 'react';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import FloorForm, { FloorFormProps } from '@/components/floor/floor-form';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react'

interface PageProps {
    floor: Floor;
    office: Office;
}

type EditFloorForm = {
    name: string;
    plan_image: File | null;
    office_id: number;
}

const FloorEditPage: React.FC<PageProps> = (props) => {
    const { floor, office } = props;

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

    const { data, setData, processing, errors } = useForm<EditFloorForm>({
        name: floor.name,
        plan_image: null,
        office_id: office.id
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.plan_image) {
            formData.append('plan_image', data.plan_image);
        }
        formData.append('_method', 'PATCH');

        router.post(route("offices.floors.update", [office.id, floor.id]), formData, {
            forceFormData: true,
            onError: (errors) => {
                console.log(errors);
            }
        });
    }
    const formProps: FloorFormProps = {
        nameValue: data.name,
        planImageValue: data.plan_image,
        isLoading: processing,
        onSubmit: handleSubmit,
        officeIdValue: office.id,
        planImageUrl: floor.plan_image_url ?? null,
        errors: errors,
        setInput: (newValue, field) => setData(field, newValue)
    };
    return (
        <AdminLayout title={floor.name} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={`Editing: ${floor.name}`} description={"Update the floor details"} />
            <FloorForm {...formProps} />
        </AdminLayout>
    )
}
export default FloorEditPage;
