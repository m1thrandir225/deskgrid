import React, { FormEventHandler } from 'react';
import { User } from '@/types';
import { Employee } from '@/types/employee';
import OfficesLayout from '@/layouts/offices/layout';
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

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
    }
    return (
        <OfficesLayout title={"Edit Employee"} breadcrumbs={[]}>
            <OfficeLayoutHeader title={`Editing: ${employee.name}`} description={`Edit details about the employee`}/>
            <EmployeeForm
                mode={"Edit"}
                firstNameValue={data.first_name}
                lastNameValue={data.last_name}
                emailValue={data.email}
                setInput={(newValue, field) => setData(field, newValue)}
                isLoading={processing}
                emailErrors={errors.email}
                lastNameErrors={errors.last_name}
                firstNameErrors={errors.first_name}
                onSubmit={handleSubmit}
            />
        </OfficesLayout>
    )
}

export default EmployeeEditPage;
