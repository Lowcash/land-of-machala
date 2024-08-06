'use server'

import { z } from 'zod'
import { protectedAction } from '@/server/trpc'

import { PROFESSIONS, RACES } from '@/const'

export const CREATE_PLAYE_SCHEMA = z.object({
  race: z.enum(RACES),
  profession: z.enum(PROFESSIONS),
})

export const createPlayer = protectedAction.input(CREATE_PLAYE_SCHEMA).mutation(() => {})
