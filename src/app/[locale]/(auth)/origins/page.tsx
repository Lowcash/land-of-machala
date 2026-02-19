import type { Metadata } from 'next'

import { CLASSES } from '@/lib/game/data/classes'
import { STORY_STEPS } from '@/lib/game/data/origins'
import { RACES } from '@/lib/game/data/races'
import type {
  TranslatedClassInfo,
  TranslatedRaceInfo,
  TranslatedStoryStep,
} from '@/lib/game/data/shared'
import { resolveBackground } from '@/lib/game/utils/background'
import { getScopedTranslations } from '@/lib/i18n'

import { OriginsView } from '@/components/features/auth/origins/view'

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getScopedTranslations('Auth.Origins')

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function OriginsPage() {
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

  const statLabels = {
    hp: g('Stats.hp'),
    mana: g('Stats.mana'),
    strength: g('Stats.strength'),
    intelligence: g('Stats.intelligence'),
    agility: g('Stats.agility'),
    stamina: g('Stats.stamina'),
  }

  const uiLabels = {
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
  }

  return (
    <OriginsView
      races={translatedRaces}
      classes={translatedClasses}
      steps={translatedStorySteps}
      statLabels={statLabels}
      uiLabels={uiLabels}
      backgroundSrc={resolveBackground('origins')}
    />
  )
}
