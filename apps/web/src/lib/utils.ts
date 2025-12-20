import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildPatch<T extends Record<string, any>>(
  draft: T,
  initial: T,
): Partial<T> {
  const patch: Partial<T> = {};

  (Object.keys(draft) as (keyof T)[]).forEach((key: keyof T) => {
    if (draft[key] !== initial[key]) {
      patch[key] = draft[key];
    }
  });

  return patch;
}
