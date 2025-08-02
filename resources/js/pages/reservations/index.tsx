import React, { useEffect, useState } from 'react';
import { Office } from '@/types/office';
import { Floor } from '@/types/floor';
import { ReservationDesk } from '@/types/desk';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FloorViewer from '@/components/floor/viewer/floor-viewer';
import { BreadcrumbItem } from '@/types';
import { endOfWeek, format, startOfWeek } from 'date-fns';

interface PageProps {
    offices: Office[];
    floors: Floor[];
    desks: ReservationDesk[];
    filters: {
        office_id?: string;
        floor_id?: string;
        reservation_date?: string;
    };
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
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const queryParams: Record<string, string | undefined> = {};

        if (selectedOffice) {
            queryParams.office_id = selectedOffice;
        }
        if (selectedFloor) {
            queryParams.floor_id = selectedFloor;
        }

        const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(weekStart);

        queryParams.start_date = format(weekStart, 'yyyy-MM-dd');
        queryParams.end_date = format(weekEnd, 'yyyy-MM-dd');

        if (selectedOffice) {
            router.get(route('reservations.index'), queryParams, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }
    }, [selectedOffice, selectedFloor, selectedDate]);

    const handleOfficeChange = (value: string) => {
        const officeId = value;
        setSelectedOffice(officeId);
        setSelectedFloor('');
        if (!officeId) {
            router.get(route('reservations.index'));
        }
    };

    const handleFloorChange = (newValue: string) => {
        setSelectedFloor(newValue);
    };

    const handleWeekChange = (newDate: Date) => {
        setSelectedDate(newDate);

        // Get the week start and end dates
        const weekStart = startOfWeek(newDate, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });

        // Update the query parameters
        const queryParams: Record<string, string | undefined> = {
            office_id: selectedOffice,
            floor_id: selectedFloor,
            start_date: format(weekStart, 'yyyy-MM-dd'),
            end_date: format(weekEnd, 'yyyy-MM-dd')
        };

        // Fetch new data for the selected week
        router.get(route('reservations.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };


    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return (
        <AppHeaderLayout breadcrumbs={breadcrumbs}>
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
                    <FloorViewer
                        desks={desks}
                        selectedDate={selectedDate}
                        floor={floors.find((f) => f.id.toString() === selectedFloor)!}
                        onDateChange={handleWeekChange}
                    />
                ) : (
                    <div className="rounded-lg bg-gray-50 px-4 py-10 text-center">
                        <p className="text-gray-500">Please select an office and a floor to see available desks.</p>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    );
};

export default ReservationsPage;
