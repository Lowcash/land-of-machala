import { createTRPCRouter } from '@/server/api/trpc'

import { playerRouter } from './routers/player'
import { gameRouter } from './routers/game'
import { hospitalRoute } from './routers/hospital'
import { armoryRoute } from './routers/armory'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  game: gameRouter,
  player: playerRouter,
  hospital: hospitalRoute,
  armory: armoryRoute,
})

// export type definition of API
export type AppRouter = typeof appRouter
