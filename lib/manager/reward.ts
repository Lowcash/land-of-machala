import 'server-only'

import type { Armor, Weapon, Prisma, PrismaClient } from '@prisma/client'

import * as PlayerEntity from '@/entity/player'

export type Reward = NonNullable<Awaited<ReturnType<typeof prepareReward>>>

export async function prepareReward(
  dbOrDbTransaction: PrismaClient | Prisma.TransactionClient,
  reward: { money?: number | null; xp?: number | null; armors?: Armor[] | null; weapons?: Weapon[] | null },
) {
  return dbOrDbTransaction.loot.create({
    data: {
      xp: reward.xp,
      money: reward.money,
      armors_loot: {
        create: reward.armors?.map((x) => ({ armor: { connect: { id: x.id } } })),
      },
      weapons_loot: {
        create: reward.weapons?.map((x) => ({ weapon: { connect: { id: x.id } } })),
      },
    },
    include: { armors_loot: true, weapons_loot: true },
  })
}

export async function assignReward(
  dbOrDbTransaction: PrismaClient | Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
  reward: Reward,
) {
  const { armors_loot, weapons_loot, ...loot } = reward

  return dbOrDbTransaction.user.update({
    where: { id: player.id },
    data: {
      loot: { connect: { id: loot.id } },
    },
  })
}

export async function collectReward(
  dbTransaction: Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
  reward: Reward,
) {
  const { armors_loot, weapons_loot, ...loot } = reward

  await dbTransaction.loot.delete({
    where: { id: loot.id },
  })

  const newXPSum = player.xp_actual + (loot.xp ?? 0)
  const newMoneySum = player.money + (loot.money ?? 0)

  const hasLevelUp = newXPSum > player.xp_max

  return dbTransaction.user.update({
    where: { id: player.id },
    data: {
      money: newMoneySum,
      level: hasLevelUp ? player.level + 1 : player.level,
      xp_actual: hasLevelUp ? newXPSum - player.xp_max : newXPSum,
      inventory: {
        update: {
          where: { id: player.inventory_id! }, // TODO potencial bug, will be fixed when refactored
          data: {
            armors_inventory: { create: armors_loot },
            weapons_inventory: { create: weapons_loot },
          },
        },
      },
    },
  })
}
