import React, { useCallback } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Check, Edit2, Mail, Shield, ShieldBan, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, router, usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface ComponentProps {
    employees: Employee[];
}

const EmployeeTable: React.FC<ComponentProps> = (props) => {
    const { employees } = props;

    const { auth  } = usePage<SharedData>().props


    const handleResendInvitation = (employeeId: number) => {
        router.post(route("employees.resend", { employee: employeeId }), {}, {
            preserveScroll: true
        } )
    }

    const handleDelete = (employeeId: number) => {
        router.delete(route("employees.destroy", { employee: employeeId }), {
            preserveScroll: true,
        } )
    }

    return (
        <Table className="my-4">
            <TableCaption>A list of all employees in the organization </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="">ID</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Email</TableHead>
                    <TableHead className="">Role</TableHead>
                    <TableHead className="">Password Status</TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {employees.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                            {item.role === "employee" ? (
                                <Badge variant={"secondary"}>
                                    <ShieldBan />
                                    Employee
                                </Badge>
                            ) : (
                                <Badge>
                                    <Shield />
                                    Administrator
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            {item.has_set_password ? (
                                <Badge variant={"secondary"}>
                                    <Check />
                                </Badge>
                            ) : (
                                <Badge variant={"destructive"}>
                                    <X/>
                                </Badge>
                            )}
                        </TableCell>
                        <TableCell className="flex flex-row gap-2">
                            {auth.user.id === item.id ? (
                                <p className={"text-sm"}> No available actions for this employee. </p>
                                ) : (
                            <>
                                <Button disabled={item.has_set_password} variant={"default"} size={"sm"} onClick={() => handleResendInvitation(item.id)}>
                                    <Mail />
                                    Resend
                                </Button>
                                <Button asChild variant={'outline'} size={'sm'}>
                                    <Link href={`/employees/${item.id}/edit`}>
                                        <Edit2 />
                                        Edit
                                    </Link>
                                </Button>
                                <Button disabled={auth.user.id === item.id} variant={'destructive'} size={'sm'} onClick={() => handleDelete(item.id)}>
                                    <Trash />
                                    Delete
                                </Button>
                            </>
                            )}

                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EmployeeTable;
