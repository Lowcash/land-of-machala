import { LOCATION, ROUTE } from '@/config'

export type Route = keyof typeof ROUTE

export type Location = Array<keyof typeof LOCATION>[number]
