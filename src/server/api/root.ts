import { createTRPCRouter } from '@/server/api/trpc'
import { playerRouter } from './routers/player'
import { gameRouter } from './routers/game'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  game: gameRouter,
  player: playerRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
