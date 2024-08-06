'use server'

import { cache } from 'react'
import { protectedAction } from '@/server/trpc'

export const getUser = cache(protectedAction.query(async ({ ctx }) => ctx.user))
