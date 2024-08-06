import { initTRPC, TRPCError } from '@trpc/server'
import { experimental_nextAppDirCaller } from '@trpc/server/adapters/next-app-dir'
import { getServerAuthSession } from '@/server/auth'

export const t = initTRPC.meta().create()

export const serverActionProcedure = t.procedure
  .experimental_caller(experimental_nextAppDirCaller({}))
  .use(async (opts) => {
    const session = await getServerAuthSession()
    return opts.next({ ctx: { user: session?.user } })
  })

export const publicAction = serverActionProcedure.use((opts) => opts.next({ ctx: opts.ctx }))

export const protectedAction = serverActionProcedure.use((opts) => {
  if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' })

  return opts.next({
    ctx: {
      ...opts.ctx,
      user: opts.ctx.user,
    },
  })
})
