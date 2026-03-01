import type { ClassInfo } from './classes'
import type { RaceInfo } from './races'

/**
 * Version of RaceInfo with pre-translated strings for UI usage.
 */
export interface TranslatedRaceInfo extends Omit<
  RaceInfo,
  'nameKey' | 'descriptionKey' | 'bonusKey'
> {
  name: string
  description: string
  bonuses: string
}

/**
 * Version of ClassInfo with pre-translated strings for UI usage.
 */
export interface TranslatedClassInfo extends Omit<
  ClassInfo,
  'nameKey' | 'descriptionKey' | 'bonusKey'
> {
  name: string
  description: string
  bonuses: string
}
export interface TranslatedStoryStepChoice {
  text: string
  effect: { class?: string; race?: string }
  nextStep: number | 'end'
}

/**
 * Version of StoryStep with pre-translated strings.
 */
export interface TranslatedStoryStep {
  id: number
  text: string
  choices: TranslatedStoryStepChoice[]
}
