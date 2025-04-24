import 'server-only'

import { db } from '@/lib/db'

import * as ArmorEntity from '@/entity/armor'
import * as PotionEntity from '@/entity/potion'
import * as WeaponEntity from '@/entity/weapon'

export type BankAccountEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(bankId: string, playerId: string) {
  let bankAccount = await db.bankAccount.findFirst({
    where: { bank_id: bankId, user_id: playerId },
    include: {
      weapons: { include: { weapon: true } },
      armors: { include: { armor: true } },
      potions: { include: { potion: true } },
    },
  })

  if (!bankAccount) {
    bankAccount = await db.$transaction(async (db) => {
      const bankAccount = await db.bankAccount.create({
        data: { bank_id: bankId, user_id: playerId },
        include: {
          weapons: { include: { weapon: true } },
          armors: { include: { armor: true } },
          potions: { include: { potion: true } },
        },
      })

      await db.bank.update({
        where: { id: bankId },
        data: {
          accounts: { connect: { id: bankAccount.id } },
        },
      })

      return bankAccount
    })
  }

  if (!bankAccount) return undefined

  return {
    ...bankAccount,
    armors: bankAccount.armors.map((x) => ({
      ...x,
      armor: { ...x.armor, ...ArmorEntity.getI18n(x.armor) },
    })),
    weapons: bankAccount.weapons.map((x) => ({
      ...x,
      weapon: { ...x.weapon, ...WeaponEntity.getI18n(x.weapon) },
    })),
    potions: bankAccount.potions.map((x) => ({
      ...x,
      potion: { ...x.potion, ...PotionEntity.getI18n(x.potion) },
    })),
  }
}
