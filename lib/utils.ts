import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export type MutationInput<T extends (...args: any) => any> = Parameters<ReturnType<T>['mutate']>[0]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function random(to: number, from: number = 0) {
  return Math.floor(Math.random() * (to - from)) + from
}

export function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.min(Math.max(value, min), max)
}