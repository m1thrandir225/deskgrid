import React, { useEffect, useState } from 'react';
import { Office } from '@/types/office';
import { Floor } from '@/types/floor';
import { Desk } from '@/types/desk';
import { router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface PageProps {
    offices: Office[];
    floors: Floor[];
    desks: Desk[];
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

    const handleOfficeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const officeId = e.target.value;
        setSelectedOffice(officeId);
        setSelectedFloor('');
        if (!officeId) {
            router.get(route('reservations.index'));
        }
    };

    const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFloor(e.target.value);
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    return (
        <>
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Make a Reservation</h1>
                <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 border rounded-xl bg-white shadow-sm">
                    {/* Office Selector */}
                    <div className="flex-1">
                        <label htmlFor="office" className="block text-sm font-medium text-gray-700 mb-1">Office</label>
                        <select
                            id="office"
                            name="office_id"
                            value={selectedOffice}
                            onChange={handleOfficeChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            <option value="">Select an Office</option>
                            {offices.map((office) => (
                                <option key={office.id} value={office.id}>{office.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Floor Selector */}
                    <div className="flex-1">
                        <label htmlFor="floor" className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                        <select
                            id="floor"
                            name="floor_id"
                            value={selectedFloor}
                            onChange={handleFloorChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            disabled={!selectedOffice || floors.length === 0}
                        >
                            <option value="">Select a Floor</option>
                            {floors.map((floor) => (
                                <option key={floor.id} value={floor.id}>{floor.name}</option>
                            ))}
                        </select>
                    </div>


                    {/* Date Picker */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="date" className="px-1">
                                Date
                            </Label>
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
                </div>

                {desks && desks.length > 0 && selectedFloor ? (
                    <h1>floor editor</h1>
                ) : (
                    <div className="text-center py-10 px-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">Please select an office and a floor to see available desks.</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReservationsPage;
