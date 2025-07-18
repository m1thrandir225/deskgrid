import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getFileUrl(filename: string): string {
    return `http://localhost:8000/storage/${filename}`;
}
