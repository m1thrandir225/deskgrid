import Heading from '@/components/heading';
import OfficeForm, { OfficeFormProps } from '@/components/office/office-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Offices',
        href: '/offices',
    },
    {
        title: 'New Office',
        href: '/offices/create',
    },
];

type CreateOfficeForm = {
    name: string;
    address: string;
};

const CreateOfficePage: React.FC = () => {
    const { data, setData, post, processing, errors, reset } = useForm<CreateOfficeForm>({
        name: '',
        address: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        console.log(e);
        e.preventDefault();
        post(route('offices.store'), {
            onFinish: () => {
                reset('name');
                reset('address');
            },
        });
    };

    const formProps: OfficeFormProps = {
        nameValue: data.name,
        setName: (newValue) => setData('name', newValue),
        nameErrors: errors.name,
        addressValue: data.address,
        setAddress: (newValue) => setData('address', newValue),
        addressErrors: errors.address,
        isLoading: processing,
        type: 'create',
        onSubmit: handleSubmit,
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a office" />
            <div className="w-full px-6 py-4">
                <Heading title="New Office" description="Create a new office" />
                <OfficeForm {...formProps} />
            </div>
        </AppLayout>
    );
};

export default CreateOfficePage;
