import 'server-only'

import { random } from '@/lib/utils'
import { PlaceType, type EnemyInstance, type Prisma, type PrismaClient } from '@prisma/client'

import * as InventoryEntity from '@/entity/inventory'
import * as EnemyEntity from '@/entity/enemy'
import * as PlaceEntity from '@/entity/place'
import * as PlayerEntity from '@/entity/player'
import * as RewardManager from '@/lib/manager/reward'

import { BASE_SPAWN_X, BASE_SPAWN_Y, ERROR_CAUSE } from '@/config'

export async function defeatePlayer(dbTransaction: Prisma.TransactionClient, player: PlayerEntity.PlayerEntity) {
  const inventory = await InventoryEntity.get(player.id, player.inventory_id)

  if (!inventory) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  await Promise.all([
    dbTransaction.armorInInventory.deleteMany({
      where: { inventory_id: inventory.id },
    }),
    dbTransaction.weaponInInventory.deleteMany({
      where: { inventory_id: inventory.id },
    }),
    dbTransaction.potionInInventory.deleteMany({
      where: { inventory_id: inventory.id },
    }),
  ])

  if (PlayerEntity.hasCombat(player)) {
    await removePlayerEnemyInstance(dbTransaction, player, player.enemy_instance)
  }

  await dbTransaction.user.update({
    where: { id: player.id },
    data: {
      defeated: true,
      money: 0,
    },
  })
}

function removePlayerEnemyInstance(
  dbTransaction: Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
  enemyInstance: EnemyInstance,
) {
  return dbTransaction.user.update({
    where: { id: player.id },
    data: {
      enemy_instance: { delete: { id: enemyInstance.id } },
    },
  })
}

export async function spawnEnemyIfPossible(
  dbOrDbTransaction: PrismaClient | Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
) {
  const place = await PlaceEntity.get({ posX: player.pos_x, posY: player.pos_y })

  if (!place || place.type === PlaceType.SAFEHOUSE) return

  const enemies = await dbOrDbTransaction.enemyInPlace.findMany({
    where: { place_id: place.id },
    include: { enemy: true },
  })

  if (!enemies.length) return

  const possiblePlaceEnemies = enemies.filter((e) => Number(e.spawn_rate) >= Math.random())

  if (!possiblePlaceEnemies.length) return

  const selectedPlaceEnemy = possiblePlaceEnemies[random(possiblePlaceEnemies.length)]

  const hp = random(selectedPlaceEnemy.enemy.hp_to, selectedPlaceEnemy.enemy.hp_from)

  const enemyInstance = await dbOrDbTransaction.enemyInstance.create({
    data: {
      enemy: { connect: { id: selectedPlaceEnemy.enemy.id } },
      hp_actual: hp,
      hp_max: hp,
    },
  })

  await dbOrDbTransaction.user.update({
    where: { id: player.id },
    data: {
      enemy_instance: {
        connect: { id: enemyInstance.id },
      },
    },
  })
}

export async function defeateEnemy(
  dbTransaction: Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
  enemyInstance: EnemyInstance,
  optional?: {
    noReward?: boolean
  },
) {
  await removePlayerEnemyInstance(dbTransaction, player, enemyInstance)

  if (!!optional?.noReward) return

  const enemy = await EnemyEntity.get(enemyInstance.enemy_id)

  if (!enemy) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

  const allPosibleItemRewards = await dbTransaction.enemyLoot.findMany({
    where: { enemy_id: enemy.id },
    include: {
      armor: true,
      weapon: true,
    },
  })

  const allPosibleItemRewardsShuffled = allPosibleItemRewards.toSorted(() => 0.5 - Math.random())

  const pickedItemRewards = allPosibleItemRewardsShuffled.slice(0, 2)

  const armors = pickedItemRewards
    .filter((x) => !!x.armor)
    .map((x) => x.armor)
    .filter((x) => !!x)
  const weapons = pickedItemRewards
    .filter((x) => !!x.weapon)
    .map((x) => x.weapon)
    .filter((x) => !!x)

  const money = random(enemy.money_from, enemy.money_to)
  const xp = random(enemy.xp_from, enemy.xp_to)

  return { reward: await RewardManager.prepareReward(dbTransaction, { money, xp, armors, weapons }) }
}

export async function respawnPlayer(
  dbOrDbTransaction: PrismaClient | Prisma.TransactionClient,
  player: PlayerEntity.PlayerEntity,
) {
  return dbOrDbTransaction.user.update({
    where: { id: player.id },
    data: { pos_x: BASE_SPAWN_X, pos_y: BASE_SPAWN_Y },
  })
}
