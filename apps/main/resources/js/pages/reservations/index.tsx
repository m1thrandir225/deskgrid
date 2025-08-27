import FloorViewer from '@/components/floor/viewer/floor-viewer';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ReservationDesk } from '@/types/desk';
import { Floor } from '@/types/floor';
import { Office } from '@/types/office';
import { router } from '@inertiajs/react';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface Filters {
    office_id?: string;
    floor_id?: string;
    start_date?: string;
    end_date?: string;
}

interface PageProps {
    offices: Office[];
    floors: Floor[];
    desks: ReservationDesk[];
    filters: Filters;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reservations',
        href: '/reservations',
    },
];

const ReservationsPage: React.FC<PageProps> = (props) => {
    const { offices, filters, floors, desks } = props;

    const [selectedOffice, setSelectedOffice] = useState(filters.office_id || '');
    const [selectedFloor, setSelectedFloor] = useState(filters.floor_id || '');

    useEffect(() => {
        if (selectedOffice && selectedFloor) {
            const today = new Date();
            const weekStart = startOfWeek(today, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(weekStart);

            router.get(
                route('reservations.index'),
                {
                    office_id: selectedOffice,
                    floor_id: selectedFloor,
                    start_date: format(weekStart, 'yyyy-MM-dd'),
                    end_date: format(weekEnd, 'yyyy-MM-dd'),
                },
                {
                    preserveState: true,
                    replace: true,
                    preserveScroll: true,
                },
            );
        }
    }, [selectedOffice, selectedFloor]);

    const handleOfficeChange = (value: string) => {
        setSelectedOffice(value);
        setSelectedFloor('');

        // Load floors for the selected office
        router.get(
            route('reservations.index'),
            {
                office_id: value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFloorChange = (newValue: string) => {
        setSelectedFloor(newValue);
    };

    return (
        <AppLayout title={'Reserve a desk'} breadcrumbs={breadcrumbs}>
            <div className="container mx-auto py-8">
                <h1 className="mb-6 text-3xl font-bold">Make a Reservation</h1>
                <div className="mb-8 flex w-full flex-col justify-evenly gap-4 rounded-xl border p-6 shadow-sm md:flex-row">
                    {/* Office Selector */}
                    <div className="flex-1">
                        <Label htmlFor="office" className="mb-1 block text-sm font-medium">
                            Office
                        </Label>
                        <Select value={selectedOffice} onValueChange={handleOfficeChange}>
                            <SelectTrigger className={'w-full'}>
                                <SelectValue placeholder={'Select an Office'} />
                            </SelectTrigger>
                            <SelectContent>
                                {offices.map((office) => (
                                    <SelectItem value={office.id.toString()} key={office.id}>
                                        {office.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Floor Selector */}
                    <div className="w-full flex-1">
                        <Label htmlFor="floor" className="mb-1 block text-sm font-medium">
                            Floor
                        </Label>
                        <Select value={selectedFloor} onValueChange={handleFloorChange} disabled={!selectedOffice || floors.length === 0}>
                            <SelectTrigger className={'w-full'}>
                                <SelectValue placeholder={'Select an Office'} />
                            </SelectTrigger>
                            <SelectContent>
                                {floors.map((floor) => (
                                    <SelectItem value={floor.id.toString()} key={floor.id}>
                                        {floor.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {desks && desks.length > 0 && selectedFloor ? (
                    <FloorViewer desks={desks} floor={floors.find((f) => f.id.toString() === selectedFloor)!} />
                ) : (
                    <div className="bg-accent rounded-lg px-4 py-10 text-center">
                        <p className="text-accent-foreground">Please select an office and a floor to see available desks.</p>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default ReservationsPage;
