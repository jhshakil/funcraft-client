import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePages = (totalItems: number, limit: number) => {
  return Math.ceil(totalItems / limit);
};
