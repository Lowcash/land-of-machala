import type { AuthenticatedRootSession } from '@/lib/auth/root-session'
import { CLASSES } from '@/lib/game/data/classes'
import { STORY_STEPS } from '@/lib/game/data/origins'
import { RACES } from '@/lib/game/data/races'
import type {
  TranslatedClassInfo,
  TranslatedRaceInfo,
  TranslatedStoryStep,
} from '@/lib/game/data/shared'
import { resolveBackground } from '@/lib/game/utils/background'
import {
  resolveFooterProps,
  resolveTranslatedBenefits,
  resolveTranslatedChangelog,
  resolveTranslatedLoreQuote,
  resolveTranslatedStats,
} from '@/lib/game/utils/resolvers'
import { getScopedTranslations } from '@/lib/i18n'

import type { AuthenticatedRootProps } from '@/components/features/auth/authenticated-root'
import type { LoginViewUIProps } from '@/components/features/auth/login/ui'
import type { OriginsUiLabels } from '@/components/features/auth/origins/types'
import type { RegisterViewUIProps } from '@/components/features/auth/register/ui'

export type PublicEntryScreen = 'login' | 'register'

export async function getRootMetadata() {
  const { t } = await getScopedTranslations('Auth.Root')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export type LoginSurfaceProps = LoginViewUIProps

export async function getLoginSurfaceProps(): Promise<LoginSurfaceProps> {
  const { t } = await getScopedTranslations('Auth.Login')
  const { t: tc } = await getScopedTranslations('Common')
  const { g: tg } = await getScopedTranslations('Auth.Login')

  return {
    hero: {
      title: 'Land of Machala',
      subtitle: t('subtitle'),
      description: t('description'),
    },
    card: {
      guestLabel: t('actions.guest'),
      registerLabel: t('actions.register'),
      orLabel: tc('or'),
    },
    accordion: {
      statsTitle: t('stats_title'),
      changelogTitle: t('changelog_title'),
    },
    quote: resolveTranslatedLoreQuote(tg),
    stats: resolveTranslatedStats(tg),
    changes: resolveTranslatedChangelog(tg),
    footer: resolveFooterProps(tc),
    uiLabels: {
      email: t('form.email'),
      emailPlaceholder: t('form.emailPlaceholder'),
      password: t('form.password'),
      submit: t('form.submit'),
      rememberMe: t('form.rememberMe'),
      validation: {
        emailInvalid: t('form.validation.emailInvalid'),
        passwordRequired: t('form.validation.passwordRequired'),
      },
    },
    backgroundSrc: resolveBackground('auth'),
  }
}

export type RegisterSurfaceProps = RegisterViewUIProps

export async function getRegisterSurfaceProps(): Promise<RegisterSurfaceProps> {
  const { t } = await getScopedTranslations('Auth.Registration')
  const { t: tc } = await getScopedTranslations('Common')
  const { g: tg } = await getScopedTranslations('Auth.Registration')

  return {
    hero: {
      title: 'Land of Machala',
      subtitle: t('subtitle'),
      description: t('description'),
    },
    footerLinks: {
      hasAccount: t('form.hasAccount'),
      login: t('form.login'),
    },
    accordion: {
      benefitsTitle: t('benefits_title'),
    },
    benefits: {
      title: t('benefits_title'),
      description: t('benefits_title_description'),
      items: resolveTranslatedBenefits(tg),
    },
    quote: resolveTranslatedLoreQuote(tg),
    footer: resolveFooterProps(tc),
    uiLabels: {
      email: t('form.email'),
      emailPlaceholder: t('form.emailPlaceholder'),
      password: t('form.password'),
      confirmPassword: t('form.confirmPassword'),
      submit: t('form.submit'),
      validation: {
        emailInvalid: t('form.validation.emailInvalid'),
        passwordLength: t('form.validation.passwordLength'),
        passwordRequired: t('form.validation.passwordRequired'),
        passwordMismatch: t('form.validation.passwordMismatch'),
      },
    },
    backgroundSrc: resolveBackground('auth'),
  }
}

export type AuthenticatedSurfaceProps = AuthenticatedRootProps

export async function getAuthenticatedSurfaceProps(
  session: AuthenticatedRootSession
): Promise<AuthenticatedSurfaceProps> {
  const { t } = await getScopedTranslations('Auth.Root')
  const { t: tc } = await getScopedTranslations('Common')

  const sessionValue =
    session.identity === 'guest'
      ? t('status_guest')
      : session.identity === 'registered'
        ? t('status_registered')
        : t('status_returning')

  return {
    hero: {
      title: 'Land of Machala',
      subtitle: t('continuation_title'),
      description: t('continuation_description'),
    },
    session: {
      label: t('session_label'),
      value: sessionValue,
      email: session.email,
    },
    note: t('continuation_note'),
    resetLabel: t('reset_label'),
    footer: resolveFooterProps(tc),
    backgroundSrc: resolveBackground('city'),
    character: {
      name: session.character.name,
      level: 1,
      location: t('prototype_location'),
      gold: 120,
      hp: session.character.stats.hp,
      hpMax: session.character.stats.hp,
      resource: session.character.stats.mana,
      resourceMax: session.character.stats.mana,
      resourceType: 'mana',
      xp: 18,
      xpMax: 100,
      stats: {
        strength: session.character.stats.strength,
        intelligence: session.character.stats.intelligence,
        agility: session.character.stats.agility,
        stamina: session.character.stats.stamina,
      },
    },
  }
}

export interface OriginsSurfaceProps {
  races: TranslatedRaceInfo[]
  classes: TranslatedClassInfo[]
  steps: TranslatedStoryStep[]
  statLabels: Record<string, string>
  uiLabels: OriginsUiLabels
  backgroundSrc: string
}

export async function getOriginsSurfaceProps(): Promise<OriginsSurfaceProps> {
  const { t, g } = await getScopedTranslations('Auth.Origins')

  const translatedRaces: TranslatedRaceInfo[] = RACES.map((race) => ({
    ...race,
    name: g(`Races.${race.id}.name`),
    description: g(`Races.${race.id}.description`),
    bonuses: g(`Races.${race.id}.bonuses`),
  }))

  const translatedClasses: TranslatedClassInfo[] = CLASSES.map((cls) => ({
    ...cls,
    name: g(`Classes.${cls.id}.name`),
    description: g(`Classes.${cls.id}.description`),
    bonuses: g(`Classes.${cls.id}.bonuses`),
  }))

  const translatedStorySteps: TranslatedStoryStep[] = STORY_STEPS.map((step) => ({
    id: step.id,
    text: t(step.textKey),
    choices: step.choices.map((choice) => ({
      text: t(choice.textKey),
      effect: choice.effect,
      nextStep: choice.nextStep,
    })),
  }))

  return {
    races: translatedRaces,
    classes: translatedClasses,
    steps: translatedStorySteps,
    statLabels: {
      hp: g('Stats.hp'),
      mana: g('Stats.mana'),
      strength: g('Stats.strength'),
      intelligence: g('Stats.intelligence'),
      agility: g('Stats.agility'),
      stamina: g('Stats.stamina'),
    },
    uiLabels: {
      tutorial: {
        skip: t('tutorial.skip'),
      },
      creation: {
        title: t('creation.title'),
        subtitle: t('creation.subtitle'),
        nameLabel: t('creation.nameLabel'),
        namePlaceholder: t('creation.namePlaceholder'),
        statsTitle: t('creation.statsTitle'),
        raceLabel: t('creation.raceLabel'),
        classLabel: t('creation.classLabel'),
        finish: t('creation.finish'),
        randomize: t('creation.randomize_button'),
        raceBonuses: t('creation.raceBonuses'),
        classBonuses: t('creation.classBonuses'),
      },
    },
    backgroundSrc: resolveBackground('origins'),
  }
}
