import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { BreadcrumbItem } from '@/types';
import OfficesLayout from '@/layouts/offices/layout';
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

    const { data, setData, processing, errors, put} = useForm<EditFloorForm>({
        name: floor.name,
        plan_image: null
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        if (data.plan_image) {
            formData.append('plan_image', data.plan_image);
        }
        formData.append('_method', 'PATCH'); // 👈 critical

        router.post(route("offices.floors.update", [office.id, floor.id]), formData, {
            forceFormData: true,
            onError: (errors) => {
                console.log(errors);
            }
        });
    }
    const formProps: FloorFormProps = {
        nameValue: data.name,
        setName: (newVal) => setData('name', newVal),
        nameErrors: errors.name,
        planImageValue: data.plan_image,
        setPlanImage: (newVal) => setData('plan_image', newVal),
        planImageErrors: errors.plan_image,
        isLoading: processing,
        onSubmit: handleSubmit,
        officeId: office.id,
        planImageUrl: floor.plan_image_url ?? null
    };
    return (
        <OfficesLayout title={floor.name} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={`Editing: ${floor.name}`} description={"Update the floor details"} />
            <FloorForm {...formProps} />
        </OfficesLayout>
    )
}
export default FloorEditPage;
