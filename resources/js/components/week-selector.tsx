import React from 'react';
import { addDays, addWeeks, format, isBefore, startOfToday, startOfWeek, subWeeks } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ComponentProps {
    currentWeek: Date;
    onWeekChange: (week: Date) => void;
}
const WeekSelector: React.FC<ComponentProps> = (props) => {
    const { currentWeek, onWeekChange } = props;
    const handlePreviousWeek = () => {
        const previousWeek = subWeeks(currentWeek, 1);
        onWeekChange(previousWeek);
    };

    const today = startOfToday();

    const handleNextWeek = () => {
        const nextWeek = addWeeks(currentWeek, 1);
        onWeekChange(nextWeek);
    };

    const handleReset = () => {
        onWeekChange(today);
    }

    const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
    const weekEnd = addDays(weekStart, 4);
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const isPreviousDisabled = isBefore(subWeeks(weekStart, 1), todayWeekStart);
    const isCurrentWeek = weekStart.getTime() === todayWeekStart.getTime();

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousWeek}
                disabled={isPreviousDisabled}
            >
                <ChevronLeft />
            </Button>

            <div className="flex flex-row items-center gap-2">
                <div className="text-sm font-medium">
                    {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                </div>
                {!isCurrentWeek && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleReset}
                    >
                        <X />
                    </Button>
                )}
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={handleNextWeek}
            >
                <ChevronRight />
            </Button>
        </div>

    )
}

export default WeekSelector;
