import AdminLayout from '@/layouts/admin/layout';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import React, { FormEventHandler, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import EmployeeForm from '@/components/employees/employee-form';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

export type CreateEmployeeForm = {
    first_name: string;
    last_name: string;
    email: string;
}

const EmployeeCreatePage: React.FC = () => {
    const { data, setData, post, errors, processing} = useForm<CreateEmployeeForm>({
        first_name: '',
        last_name: '',
        email: '',
    });

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: "Employees",
                href: "/employees"
            },
            {
                title: "Invite Employee",
                href: "/employees/create"
            }
        ] as BreadcrumbItem[];
    }, [])
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("employees.store"), {
            onError: (error) => {
                console.error(error);
            },
        })
    }
    return (
        <AppLayout title={"Create Employee"} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={"Invite an Employee"} description={"Add a new employee for your organization"}>

            </OfficeLayoutHeader>
            <EmployeeForm
                mode={"Create"}
                firstNameValue={data.first_name}
                lastNameValue={data.last_name}
                emailValue={data.email}
                errors={errors}
                setInput={(newValue, field) => setData(field, newValue)}
                isLoading={processing}
                onSubmit={handleSubmit}
            />
        </AppLayout>
    )
}

export default EmployeeCreatePage;
