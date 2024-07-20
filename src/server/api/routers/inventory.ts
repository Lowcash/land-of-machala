import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'
import type { TRPCContext } from '@/server/api/trpc'

export const inventoryRoute = createTRPCRouter({
  show: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.wearable) throw new Error('No wearable!')

    const inventory = await getInventory(ctx)

    const weapons = inventory.weapons_inventory?.map((x) => {
      const armed = Object.entries(ctx.session.user!.wearable!).find(([_, v]) => v === x.id)

      return {
        ...x,
        armed_left: armed?.[0] === 'left_hand_weapon_id',
        armed_right: armed?.[0] === 'right_hand_weapon_id',
      }
    })
    const armors = inventory.armors_inventory?.map((x) => ({
      ...x,
      armed: Object.values(ctx.session.user!.wearable!).some((y) => y === x.id),
    }))

    return {
      weapons,
      armors,
      potions: inventory.potions_inventory,
    }
  }),
})

export async function getInventory(ctx: TRPCContext) {
  if (!ctx.session?.user) throw new Error('No user!')

  let inventory = await ctx.db.inventory.findFirst({
    where: { id: ctx.session.user.inventory_id ?? '-1' },
    include: {
      weapons_inventory: {
        include: { weapon: true },
      },
      armors_inventory: {
        include: { armor: true },
      },
      potions_inventory: {
        include: { potion: true },
      },
    },
  })

  if (!inventory) {
    inventory = await ctx.db.$transaction(async (db) => {
      const _inventory = await db.inventory.create({
        data: {},
        include: {
          weapons_inventory: {
            include: { weapon: true },
          },
          armors_inventory: {
            include: { armor: true },
          },
          potions_inventory: {
            include: { potion: true },
          },
        },
      })

      await db.user.update({
        where: { id: ctx.session!.user.id },
        data: {
          inventory: { connect: { id: _inventory.id } },
        },
      })

      return _inventory
    })
  }

  if (!inventory) throw new Error('Inventory does not exist!')

  return {
    ...inventory,
    potions: inventory.potions_inventory.sort((a, b) => a.potion.hp_gain - b.potion.hp_gain),
  }
}
