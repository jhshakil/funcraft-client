import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePages = (totalItems: number, limit: number) => {
  return Math.ceil(totalItems / limit);
};

export const formatToKebabCase = (input: string): string => {
  return input.trim().toLowerCase().replace(/\s+/g, "-");
};
