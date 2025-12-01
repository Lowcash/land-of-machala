import 'server-only'

import { db } from '@/lib/db'

import { getI18n as getArmorI18n } from '@/entity/armor'
import { getI18n as getPotionI18n } from '@/entity/potion'
import { getI18n as getWeaponI18n } from '@/entity/weapon'

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
      armor: { ...x.armor, ...getArmorI18n(x.armor) },
    })),
    weapons: bankAccount.weapons.map((x) => ({
      ...x,
      weapon: { ...x.weapon, ...getWeaponI18n(x.weapon) },
    })),
    potions: bankAccount.potions.map((x) => ({
      ...x,
      potion: { ...x.potion, ...getPotionI18n(x.potion) },
    })),
  }
}
