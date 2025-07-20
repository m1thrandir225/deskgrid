import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Check, Edit2, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComponentProps {
    employees: Employee[];
}

const EmployeeTable: React.FC<ComponentProps> = (props) => {
    const { employees } = props;

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
                        <TableCell>{item.role}</TableCell>
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
                            <Button variant={'outline'} size={'icon'}>
                                <Edit2 />
                            </Button>
                            <Button variant={'outline'} size={'icon'}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default EmployeeTable;
