import { z } from 'zod'

export const nameSchema = z.object({
  name: z
    .string()
    .min(3, 'Jméno musí mít alespoň 3 znaky')
    .max(20, 'Jméno může mít maximálně 20 znaků')
    .regex(/^[a-zA-Z0-9_ ]+$/, 'Jméno může obsahovat pouze písmena, čísla a podtržítka'),
})

export type NameValues = z.infer<typeof nameSchema>
