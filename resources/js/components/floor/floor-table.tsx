import { Floor } from '@/types/floor';
import { Link } from '@inertiajs/react';
import { Edit2, Eye } from 'lucide-react';
import { Button } from '../ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface FloorTableProps {
    items: Floor[];
    officeId: number;
}

const FloorTable: React.FC<FloorTableProps> = (props) => {
    const { items, officeId } = props;

    return (
        <Table className="my-4">
            <TableCaption>A list of avaliable floors for the office </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-full">Name</TableHead>
                    <TableHead> Actions </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell className="flex flex-row gap-2">
                            <Button asChild variant={'outline'} size={'icon'}>
                                <Link href={`/offices/${officeId}/floors/${item.id}`}>
                                    <Eye size={24} />
                                </Link>
                            </Button>
                            <Button asChild variant={'outline'} size={'icon'}>
                                <Link href={`/offices/${officeId}/floors/${item.id}/edit`}>
                                    <Edit2 size={24} />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FloorTable;
