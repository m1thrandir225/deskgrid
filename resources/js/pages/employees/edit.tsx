import React, { FormEventHandler, useMemo } from 'react';
import { BreadcrumbItem, User } from '@/types';
import { Employee } from '@/types/employee';
import AdminLayout from '@/layouts/admin/layout';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import EmployeeForm from '@/components/employees/employee-form';
import { useForm } from '@inertiajs/react';

interface PageProps {
    employee: Employee
}

type EmployeeEditForm = {
    first_name: string;
    last_name: string;
    email: string;
}

const EmployeeEditPage: React.FC<PageProps> = (props) => {
    const { employee } = props;

    const { data, setData, processing, errors, } = useForm<EmployeeEditForm>({
        email: employee.email,
        first_name: employee.name.split(" ")[0],
        last_name: employee.name.split(" ")[1]
    });

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: "Employees",
                href: "/employees"
            },
            {
                title: `Editing: ${employee.name}`,
                href: `/employees/${employee.id}/edit`
            }
        ] as BreadcrumbItem[];
    },[employee]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
    }
    return (
        <AdminLayout title={"Edit Employee"} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={`Editing: ${employee.name}`} description={`Edit details about the employee`}/>
            <EmployeeForm
                mode={"Edit"}
                firstNameValue={data.first_name}
                lastNameValue={data.last_name}
                emailValue={data.email}
                setInput={(newValue, field) => setData(field, newValue)}
                isLoading={processing}
                errors={errors}
                onSubmit={handleSubmit}
            />
        </AdminLayout>
    )
}

export default EmployeeEditPage;
