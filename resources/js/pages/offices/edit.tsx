import OfficeForm, { OfficeFormProps } from '@/components/office/office-form';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import OfficesLayout from '@/layouts/offices/layout';
import { Office } from '@/types/office';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useMemo } from 'react';

interface PageProps {
    office: Office;
}

type UpdateOfficeForm = {
    address: string;
    name: string;
};

const UpdateOfficePage: React.FC<PageProps> = (props) => {
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
            {
                title: 'Edit',
                href: `/offices/${office.id}/edit`,
            },
        ];
    }, [office.name, office.id]);
    const { data, reset, errors, setData, processing, put } = useForm<UpdateOfficeForm>({
        address: office.address,
        name: office.name,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('offices.update', office.id), {
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
        type: 'update',
        onSubmit: handleSubmit,
    };
    return (
        <OfficesLayout title={`Editing ${office.name}`} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={`Editing: ${office.name}`} description="Edit the selected officd information " />
            <OfficeForm {...formProps} />
        </OfficesLayout>
    );
};

export default UpdateOfficePage;
