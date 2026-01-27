import { z } from 'zod'

export const createCharacterSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(20, 'Name must be at most 20 characters'),
  race: z.enum(['HUMAN', 'DWARF', 'ELF', 'ORC', 'HALFLING', 'DRAGONBORN'] as const),
  class: z.enum(['WARRIOR', 'MAGE', 'ROGUE', 'PALADIN', 'RANGER', 'NECROMANCER'] as const),
})

export const updateStatsSchema = z.object({
  stats: z.object({
    strength: z.number().int().min(1).optional(),
    intelligence: z.number().int().min(1).optional(),
    agility: z.number().int().min(1).optional(),
    stamina: z.number().int().min(1).optional(),
  }),
})

export const updateResourcesSchema = z.object({
  resources: z.object({
    hp: z.number().int().min(0).optional(),
    mana: z.number().int().min(0).optional(),
    gold: z.number().int().min(0).optional(),
  }),
})

export const updateLocationSchema = z.object({
  locationX: z.number().int(),
  locationY: z.number().int(),
  currentView: z.string(),
})

export const addExperienceSchema = z.object({
  amount: z.number().int().min(0),
})

export const healSchema = z.object({
  amount: z.number().int().min(0),
})

export const restoreManaSchema = z.object({
  amount: z.number().int().min(0),
})
