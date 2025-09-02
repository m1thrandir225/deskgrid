import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDateFromISOString(isoString: string): string {
    return format(new Date(isoString), 'yyyy-MM-dd');
}
