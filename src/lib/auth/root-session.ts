import { z } from 'zod'

import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

const raceIds = RACES.map((race) => race.id) as [string, ...string[]]
const classIds = CLASSES.map((cls) => cls.id) as [string, ...string[]]

export const rootLoginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
})

export type RootLoginInput = z.infer<typeof rootLoginInputSchema>

export const rootRegisterInputSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RootRegisterInput = z.infer<typeof rootRegisterInputSchema>

export const completeRootOnboardingInputSchema = z.object({
  name: z.string().trim().min(1).max(32),
  raceId: z.enum(raceIds),
  classId: z.enum(classIds),
})

export type CompleteRootOnboardingInput = z.infer<typeof completeRootOnboardingInputSchema>

export const rootSessionIdentitySchema = z.enum(['guest', 'registered', 'returning'])

export type RootSessionIdentity = z.infer<typeof rootSessionIdentitySchema>

export const rootCharacterSummarySchema = z.object({
  name: z.string().min(1),
  raceId: z.enum(raceIds),
  classId: z.enum(classIds),
  stats: z.object({
    hp: z.number().int(),
    mana: z.number().int(),
    strength: z.number().int(),
    intelligence: z.number().int(),
    agility: z.number().int(),
    stamina: z.number().int(),
  }),
})

export type RootCharacterSummary = z.infer<typeof rootCharacterSummarySchema>

export const onboardingRootSessionSchema = z.object({
  state: z.literal('onboarding'),
  identity: z.enum(['guest', 'registered']),
  email: z.string().email().optional(),
  rememberMe: z.boolean(),
  createdAt: z.number().int(),
  updatedAt: z.number().int(),
})

export const authenticatedRootSessionSchema = z.object({
  state: z.literal('authenticated'),
  identity: rootSessionIdentitySchema,
  email: z.string().email().optional(),
  rememberMe: z.boolean(),
  character: rootCharacterSummarySchema,
  createdAt: z.number().int(),
  updatedAt: z.number().int(),
})

export const rootSessionSnapshotSchema = z.discriminatedUnion('state', [
  onboardingRootSessionSchema,
  authenticatedRootSessionSchema,
])

export type OnboardingRootSession = z.infer<typeof onboardingRootSessionSchema>
export type AuthenticatedRootSession = z.infer<typeof authenticatedRootSessionSchema>
export type RootSessionSnapshot = z.infer<typeof rootSessionSnapshotSchema>

export interface RootSessionActionResult {
  ok: boolean
  reason?: 'invalid-input' | 'missing-session'
}
