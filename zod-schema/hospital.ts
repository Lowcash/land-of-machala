import { z } from 'zod'

// Zod schemas with satisfies operator for type safety
export const hospitalSchema = z.object({
  hospitalId: z.string().uuid(),
}) satisfies z.ZodType<{ hospitalId: string }>

export type HospitalSchema = z.infer<typeof hospitalSchema>

export const hospitalItemActionSchema = z.object({
  hospitalId: z.string().uuid(),
  potionId: z.string().uuid(),
}) satisfies z.ZodType<{ hospitalId: string; potionId: string }>

export type HospitalItemActionSchema = z.infer<typeof hospitalItemActionSchema>
