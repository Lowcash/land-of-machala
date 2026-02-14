import { CLASSES } from '@/lib/game/data/classes'
import { RACES } from '@/lib/game/data/races'

export const ONBOARDING_RACES = RACES
export const ONBOARDING_CLASSES = CLASSES

export type OriginsEffect = {
  class?: string
  race?: string
}

export type OriginsChoice = {
  textKey: string
  effect: OriginsEffect
  nextStep: number | 'end'
}

export type StoryStep = {
  id: number
  textKey: string
  choices: readonly OriginsChoice[]
}

/**
 * Story steps definition.
 * The text and choices now use translation keys.
 */
export const STORY_STEPS = [
  {
    id: 0,
    textKey: 'narrative.step_0_text',
    choices: [
      {
        textKey: 'narrative.step_0_choice_0',
        effect: { class: 'warrior' },
        nextStep: 1,
      },
      {
        textKey: 'narrative.step_0_choice_1',
        effect: { class: 'mage' },
        nextStep: 1,
      },
      {
        textKey: 'narrative.step_0_choice_2',
        effect: { class: 'rogue' },
        nextStep: 1,
      },
    ],
  },
  {
    id: 1,
    textKey: 'narrative.step_1_text',
    choices: [
      {
        textKey: 'narrative.step_1_choice_0',
        effect: { race: 'orc' },
        nextStep: 'end',
      },
      {
        textKey: 'narrative.step_1_choice_1',
        effect: { race: 'halfling' },
        nextStep: 'end',
      },
      {
        textKey: 'narrative.step_1_choice_2',
        effect: { race: 'elf' },
        nextStep: 'end',
      },
    ],
  },
] as const
