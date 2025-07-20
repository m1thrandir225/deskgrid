import OfficesLayout from '@/layouts/offices/layout';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import React, { FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import EmployeeForm from '@/components/employees/employee-form';

export type CreateEmployeeForm = {
    first_name: string;
    last_name: string;
    email: string;
}

const EmployeeCreatePage: React.FC = () => {
    const { data, transform, setData, post, errors, processing} = useForm<CreateEmployeeForm>({
        first_name: '',
        last_name: '',
        email: '',
    });
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log(data);


        post(route("employees.store"), {
            onError: (error) => {
                console.error(error);
            },
        })
    }
    return (
        <OfficesLayout title={"Create Employee"}>
            <OfficeLayoutHeader title={"Create a new Employee"} description={"Create a new employee for your organization"}>

            </OfficeLayoutHeader>
            <EmployeeForm
                firstNameValue={data.first_name}
                lastNameValue={data.last_name}
                emailValue={data.email}
                emailErrors={errors.email}
                firstNameErrors={errors.first_name}
                lastNameErrors={errors.last_name}
                setInput={(newValue, field) => setData(field, newValue)}
                isLoading={processing}
                onSubmit={handleSubmit}
            />
        </OfficesLayout>
    )
}

export default EmployeeCreatePage;
