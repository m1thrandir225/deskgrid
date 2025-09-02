import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import React from 'react';
type ComponentProps = {
    date: Date;
    timezone: string;
    officeName: string;
};

const TimezoneDisplay: React.FC<ComponentProps> = (props) => {
    const { date, timezone, officeName } = props;

    return (
        <div className="text-sm text-gray-500">
            <span>{format(date, 'MMM d, yyyy')}</span>
            <span className="ml-2">
                ({formatInTimeZone(date, timezone, 'HH:mm')} {officeName} time)
            </span>
        </div>
    );
};

export default TimezoneDisplay;
