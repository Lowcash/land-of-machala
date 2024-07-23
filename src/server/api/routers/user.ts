import type { TRPCContext } from '@/server/api/trpc'
import { getTRPCErrorFromUnknown } from '@trpc/server'

import { ERROR_CAUSE } from '@/const'

export async function getUser(ctx: TRPCContext) {
  const user = await ctx.db.user.findFirst({
    where: { id: ctx.session?.user.id },
    include: {
      enemy_instance: { include: { enemy: true } },
      wearable: true,
      loot: { include: { weapons_loot: { include: { weapon: true } }, armors_loot: { include: { armor: true } } } },
      inventory: {
        include: { weapons_inventory: { include: { weapon: true } }, armors_inventory: { include: { armor: true } } },
      },
    },
  })

  if (!user) throw getTRPCErrorFromUnknown(ERROR_CAUSE.NOT_AVAILABLE)

  return user
}
