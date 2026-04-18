import { cookies } from 'next/headers'

import 'server-only'

import {
  type CompleteRootOnboardingInput,
  type RootCharacterSummary,
  type RootLoginInput,
  type RootRegisterInput,
  completeRootOnboardingInputSchema,
  rootSessionSnapshotSchema,
} from '@/lib/auth/root-session'
import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

const ROOT_SESSION_COOKIE_NAME = 'LAND_OF_MACHALA_ROOT_SESSION'

function encodeSnapshot(value: unknown) {
  return Buffer.from(JSON.stringify(value)).toString('base64url')
}

function decodeSnapshot(value: string) {
  return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'))
}

function resolveSessionMaxAgeSeconds(rememberMe: boolean, state: 'onboarding' | 'authenticated') {
  if (state === 'onboarding') {
    return rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 12
  }

  return rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24
}

function deriveTravelerName(email: string) {
  const candidate = email.split('@')[0]?.trim()

  return candidate && candidate.length > 0 ? candidate.slice(0, 32) : 'Traveler'
}

function resolveCharacterStats(raceId: string, classId: string) {
  const race = RACES.find((item) => item.id === raceId) ?? RACES[0]
  const playerClass = CLASSES.find((item) => item.id === classId) ?? CLASSES[0]

  return {
    hp: race.stats.hp + (playerClass.statMod.hp ?? 0),
    mana: race.stats.mana + (playerClass.statMod.mana ?? 0),
    strength: race.stats.strength + (playerClass.statMod.strength ?? 0),
    intelligence: race.stats.intelligence + (playerClass.statMod.intelligence ?? 0),
    agility: race.stats.agility + (playerClass.statMod.agility ?? 0),
    stamina: race.stats.stamina + (playerClass.statMod.stamina ?? 0),
  }
}

function buildPrototypeCharacter(
  name: string,
  raceId = 'human',
  classId = 'warrior'
): RootCharacterSummary {
  return {
    name,
    raceId,
    classId,
    stats: resolveCharacterStats(raceId, classId),
  }
}

export async function readRootSession() {
  const cookieStore = await cookies()
  const raw = cookieStore.get(ROOT_SESSION_COOKIE_NAME)?.value

  if (!raw) {
    return null
  }

  try {
    return rootSessionSnapshotSchema.parse(decodeSnapshot(raw))
  } catch {
    return null
  }
}

async function writeRootSession(snapshot: ReturnType<typeof rootSessionSnapshotSchema.parse>) {
  const cookieStore = await cookies()

  cookieStore.set(ROOT_SESSION_COOKIE_NAME, encodeSnapshot(snapshot), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: resolveSessionMaxAgeSeconds(snapshot.rememberMe, snapshot.state),
  })
}

export async function clearRootSession() {
  const cookieStore = await cookies()
  cookieStore.delete(ROOT_SESSION_COOKIE_NAME)
}

export async function beginGuestRootSession() {
  const now = Date.now()

  await writeRootSession({
    state: 'onboarding',
    identity: 'guest',
    rememberMe: false,
    createdAt: now,
    updatedAt: now,
  })
}

export async function beginRegisteredRootSession(input: RootRegisterInput) {
  const now = Date.now()

  await writeRootSession({
    state: 'onboarding',
    identity: 'registered',
    email: input.email,
    rememberMe: true,
    createdAt: now,
    updatedAt: now,
  })
}

export async function beginReturningRootSession(input: RootLoginInput) {
  const now = Date.now()

  await writeRootSession({
    state: 'authenticated',
    identity: 'returning',
    email: input.email,
    rememberMe: input.rememberMe,
    character: buildPrototypeCharacter(deriveTravelerName(input.email)),
    createdAt: now,
    updatedAt: now,
  })
}

export async function completeRootOnboarding(input: CompleteRootOnboardingInput) {
  const currentSession = await readRootSession()
  const parsed = completeRootOnboardingInputSchema.parse(input)
  const now = Date.now()

  await writeRootSession({
    state: 'authenticated',
    identity: currentSession?.identity === 'registered' ? 'registered' : 'guest',
    email: currentSession?.email,
    rememberMe: currentSession?.rememberMe ?? false,
    character: buildPrototypeCharacter(parsed.name, parsed.raceId, parsed.classId),
    createdAt: currentSession?.createdAt ?? now,
    updatedAt: now,
  })
}
