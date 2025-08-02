import React, { useEffect, useMemo } from 'react';
import OfficeLayoutHeader from '@/components/office/office-layout-header';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { Import, PlusIcon } from 'lucide-react';
import { Employee } from '@/types/employee';
import EmployeeTable from '@/components/employees/employee-table';
import { toast } from 'sonner';
import { FlashMessage } from '@/types/page';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';

interface PageProps {
    employees: Employee[];
    flash: FlashMessage
}

const EmployeesPage: React.FC<PageProps> = (props) => {
    const { employees, flash} = props;

    const breadcrumbs = useMemo(() => {
        return [
            {
                title: "Employees",
                href: "/employees"
            }
        ] as BreadcrumbItem[];
    }, [])

    useEffect(() => {
        if(flash.message) {
            toast(flash.message)
        }
        if(flash.error) {
            toast.error(flash.error)
        }
    }, [flash])
    return (
        <AppLayout title={"Employees"} breadcrumbs={breadcrumbs}>
            <OfficeLayoutHeader title={"Employees"} description={"Manage your organizations employees"}>
                <Button asChild variant={"outline"}>
                    <Link href={"/employees/create"}>
                        <PlusIcon size={24}/>
                        Invite Employee
                    </Link>
                </Button>
                <Button asChild variant={"outline"}>
                    <Link href={"/employees/import"}>
                        <Import />
                        Import Employees
                    </Link>
                </Button>
        </OfficeLayoutHeader>
            <EmployeeTable employees={employees} />
        </AppLayout>
    )
}

export default EmployeesPage;
