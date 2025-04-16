import { z } from 'zod'

export const hospitalSchema = z.object({ hospitalId: z.string() })

export type HospitalSchema = z.infer<typeof hospitalSchema>

export const hospitalItemActionSchema = z.object({ hospitalId: z.string(), potionId: z.number() })

export type HospitalItemActionSchema = z.infer<typeof hospitalItemActionSchema>
