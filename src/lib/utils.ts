import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number, currency = 'TZS') => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency,
  }).format(amount);
};
