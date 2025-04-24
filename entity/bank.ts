import 'server-only'

import i18n from '@/lib/i18n'
import { db } from '@/lib/db'
import type { Bank } from '@prisma/client'

export type BankEntity = NonNullable<Awaited<ReturnType<typeof get>>>

export async function get(id: string) {
  const bank = await db.bank.findFirst({
    where: { id },
  })

  if (!bank) return undefined

  return {
    ...bank,
    ...getI18n(bank),
  }
}

export function getI18n(entity: Bank) {
  return {
    name: i18n.t(`${entity.i18n_key}.header` as any),
    description: i18n.t(`${entity.i18n_key}.description` as any),
  }
}
