import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIndianCurrency(amount: number) {
  const options: Intl.NumberFormatOptions = {
    style: 'decimal',
  };

  if (amount % 1 !== 0) {
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  } else {
    options.maximumFractionDigits = 0;
  }

  return amount.toLocaleString('en-IN', options);
}
