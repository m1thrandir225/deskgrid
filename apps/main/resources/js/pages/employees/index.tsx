import EmployeeTable from '@/components/employees/employee-table';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Employee } from '@/types/employee';
import { Link } from '@inertiajs/react';
import { Import, PlusIcon } from 'lucide-react';
import React, { useMemo } from 'react';

interface PageProps {
    employees: Employee[];
}

const EmployeesPage: React.FC<PageProps> = (props) => {
    const { employees } = props;

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: 'Employees',
                href: '/employees',
            },
        ] as BreadcrumbItem[];
    }, []);

    return (
        <AppLayout title={'Employees'} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={'Employees'} description={'Manage your organizations employees'}>
                <Button asChild variant={'outline'}>
                    <Link href={'/employees/create'}>
                        <PlusIcon size={24} />
                        Invite Employee
                    </Link>
                </Button>
                <Button asChild variant={'outline'}>
                    <Link href={'/employees/import'}>
                        <Import />
                        Import Employees
                    </Link>
                </Button>
            </OfficeLayoutHeader>
            <EmployeeTable employees={employees} />
        </AppLayout>
    );
};

export default EmployeesPage;
