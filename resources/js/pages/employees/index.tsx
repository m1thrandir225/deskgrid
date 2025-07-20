import React from 'react';
import OfficesLayout from '@/layouts/offices/layout';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { Employee } from '@/types/employee';
import EmployeeTable from '@/components/employees/employee-table';

interface PageProps {
    employees: Employee[]
}

const EmployeesPage: React.FC<PageProps> = (props) => {
    const { employees } = props;
    return (
        <OfficesLayout title={"Employees"} breadcrumbs={[]}>
            <OfficeLayoutHeader title={"Employees"} description={"Manage your organizations employees"}>
                <Button asChild size={"icon"} variant={"outline"}>
                    <Link href={"/employees/create"}>
                        <PlusIcon size={24}/>
                    </Link>
                </Button>
        </OfficeLayoutHeader>
            <EmployeeTable employees={employees} />
        </OfficesLayout>
    )
}

export default EmployeesPage;
