import React, { useCallback } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Check, Edit2, Mail, Shield, ShieldBan, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { router } from "@inertiajs/react"

interface ComponentProps {
    employees: Employee[];
}

const EmployeeTable: React.FC<ComponentProps> = (props) => {
    const { employees } = props;


    const handleResendInvitation = (employeeId: number) => {
        router.post(route("employees.resend", { user: employeeId }), {}, {
            preserveScroll: true
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
                            {item.has_set_password ? (
                                <>
                                    <Button variant={'outline'} size={'sm'}>
                                        <Edit2 />
                                        Edit
                                    </Button>
                                    <Button variant={'outline'} size={'sm'}>
                                        <Trash />
                                        Delete
                                    </Button>
                                </>
                            ) : (
                                <Button variant={"default"} size={"sm"} onClick={() => handleResendInvitation(item.id)}>
                                    <Mail />
                                    Resend Invitation
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EmployeeTable;
