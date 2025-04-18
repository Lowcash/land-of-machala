'use server'

import { cache } from 'react'
import { db } from '@/lib/db'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth/next'

import { actionClient, authActionClient, handleValidationErrorsShape } from '@/lib/safe-action'
import { playerCreateSchema, playerSignSchema } from '@/zod-schema/player'

import { BASE_HP_ACTUAL, BASE_HP_MAX, BASE_XP_ACTUAL, BASE_XP_MAX, ERROR_CAUSE } from '@/config'

export const signUp = actionClient
  .metadata({ actionName: 'user_signUp' })
  .schema(playerSignSchema)
  .action(async ({ parsedInput }) => {
    const isExisting = await db.user.findFirst({ where: { email: parsedInput.email } })

    if (isExisting) throw new Error(ERROR_CAUSE.ALREADY_EXISTS)

    const hashedPassword = await bcrypt.hash(parsedInput.password, 10)

    await db.user.create({ data: { email: parsedInput.email, password: hashedPassword } })
  })

export const create = authActionClient
  .metadata({ actionName: 'user_create' })
  .schema(playerCreateSchema, { handleValidationErrorsShape })
  .action(async ({ ctx, parsedInput }) => {
    const [race, class_] = await Promise.all([
      db.race.findFirst({ where: { id: parsedInput.raceId } }),
      db.class.findFirst({ where: { id: parsedInput.classId } }),
    ])

    if (!race || !class_) throw new Error(ERROR_CAUSE.NOT_AVAILABLE)

    await db.user.update({
      where: { id: ctx.user.id },
      data: {
        name: parsedInput.name,
        race: { connect: { id: race.id } },
        class: { connect: { id: class_.id } },
        hp_actual: BASE_HP_ACTUAL,
        hp_max: BASE_HP_MAX,
        xp_actual: BASE_XP_ACTUAL,
        xp_max: BASE_XP_MAX,
      },
    })
  })

export const isSigned = cache(
  actionClient.metadata({ actionName: 'user_isSigned' }).action(async () => {
    return !!(await getServerSession())
  }),
)
