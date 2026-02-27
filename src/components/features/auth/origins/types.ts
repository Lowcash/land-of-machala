/**
 * Typed UI label contracts for the Origins feature.
 * Matches the structure built in `origins/page.tsx` and passed down
 * through `OriginsViewProps → StepCreation → SelectionBox / CharacterIdentity`.
 */

export interface TutorialUiLabels {
  skip: string
}

export interface SelectionUiLabels {
  raceBonuses: string
  classBonuses: string
}

export interface CreationUiLabels extends SelectionUiLabels {
  title: string
  subtitle: string
  nameLabel: string
  namePlaceholder: string
  statsTitle: string
  raceLabel: string
  classLabel: string
  finish: string
  randomize: string
}

export interface OriginsUiLabels {
  tutorial: TutorialUiLabels
  creation: CreationUiLabels
}
