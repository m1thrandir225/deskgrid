import React, { useEffect, useState } from 'react';
import { Office } from '@/types/office';
import { Floor } from '@/types/floor';
import { Desk, ReservationDesk } from '@/types/desk';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FloorViewer from '@/components/floor/viewer/floor-viewer';

interface PageProps {
    offices: Office[];
    floors: Floor[];
    desks: ReservationDesk[];
    filters: {
        office_id?: string;
        floor_id?: string;
        reservation_date?: string;
    }
}

const ReservationsPage: React.FC<PageProps> = (props) => {
    const { offices, filters, floors, desks } = props;

    const [selectedOffice, setSelectedOffice] = useState(filters.office_id || '');
    const [selectedFloor, setSelectedFloor] = useState(filters.floor_id || '');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(filters.reservation_date ? new Date(filters.reservation_date) : new Date());
    const [dateDialogOpen, setDateDialogOpen] = useState<boolean>(false);
    useEffect(() => {
        const queryParams: Record<string, string | undefined> = {
            reservation_date: selectedDate?.toDateString()
        };
        if (selectedOffice) {
            queryParams.office_id = selectedOffice;
        }
        if (selectedFloor) {
            queryParams.floor_id = selectedFloor;
        }

        if (selectedOffice) {
            router.get(route('reservations.index'), queryParams, {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            });
        }
    }, [selectedOffice, selectedFloor, selectedDate]);

    const handleOfficeChange = (value: string) => {
        const officeId = value
        setSelectedOffice(officeId);
        setSelectedFloor('');
        if (!officeId) {
            router.get(route('reservations.index'));
        }
    };

    const handleFloorChange = (newValue: string) => {
        setSelectedFloor(newValue);
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return (
        <AppHeaderLayout breadcrumbs={[]}>
            <div className="container mx-auto py-8 ">
                <h1 className="text-3xl font-bold mb-6">Make a Reservation</h1>
                <div className="flex flex-col md:flex-row justify-evenly w-full gap-4 mb-8 p-6 border rounded-xl shadow-sm">
                    {/* Office Selector */}
                    <div className="flex-1">
                        <Label htmlFor="office" className="block text-sm font-medium mb-1">Office</Label>
                        <Select
                            value={selectedOffice}
                            onValueChange={handleOfficeChange}
                        >
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder={"Select an Office"} />
                            </SelectTrigger>
                            <SelectContent>
                                {offices.map((office) => (
                                    <SelectItem value={office.id.toString()} key={office.id}>{office.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Floor Selector */}
                    <div className="flex-1 w-full">
                        <Label htmlFor="floor" className="block text-sm font-medium mb-1">Floor</Label>
                        <Select
                            value={selectedFloor}
                            onValueChange={handleFloorChange}
                            disabled={!selectedOffice || floors.length === 0}
                            >
                            <SelectTrigger className={"w-full"}>
                                <SelectValue placeholder={"Select an Office"} />
                            </SelectTrigger>
                            <SelectContent>
                                {floors.map((floor) => (
                                    <SelectItem value={floor.id.toString()} key={floor.id}>{floor.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date Picker */}
                    <div className="flex-1 w-full">
                        <Label htmlFor="office" className="block text-sm font-medium mb-1">Date</Label>
                        <Popover open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    disabled={{
                                        before: today
                                    }}

                                    selected={selectedDate}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                        setSelectedDate(date)
                                        setDateDialogOpen(false)
                                    }}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {desks && desks.length > 0 && selectedFloor ? (
                    <FloorViewer
                        desks={desks}
                        selectedDate={selectedDate ?? new Date()}
                        floor={floors.find(f => f.id.toString() === selectedFloor)!}
                    />
                ) : (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Please select an office and a floor to see available desks.</p>
                    </div>
                )}
            </div>
        </AppHeaderLayout>
    )
}

export default ReservationsPage;
