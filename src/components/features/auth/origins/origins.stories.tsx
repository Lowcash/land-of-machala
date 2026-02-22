import type { Meta, StoryObj } from '@storybook/react'

import { STORY_STEPS } from '@/lib/game/data/origins'

import { StepCreation } from '@/components/features/auth/origins/step-creation'
import { TutorialStep } from '@/components/features/auth/origins/step-tutorial'
import { useOrigins } from '@/components/features/auth/origins/use-origins'
import { AuthShell } from '@/components/ui/prefabs/layout/auth-shell'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

import { OriginsView } from './view'

const meta: Meta<typeof OriginsView> = {
  title: 'Features/Auth/Origins',
  component: OriginsView,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta
type Story = StoryObj<typeof OriginsView>

const MOCK_STEPS: any[] = STORY_STEPS.map((s) => ({
  id: s.id,
  text: `Step ${s.id} localized text`,
  choices: s.choices.map((c) => ({ text: `Choice text`, effect: c.effect, nextStep: c.nextStep })),
}))

const MOCK_UI = {
  tutorial: { skip: 'Skip Tutorial' },
  creation: {
    title: 'Character Creation',
    subtitle: 'Choose your path',
    nameLabel: 'Hero Name',
    namePlaceholder: 'Enter name...',
    statsTitle: 'Initial Stats',
    raceLabel: 'Select Race',
    classLabel: 'Select Class',
    finish: 'Begin Adventure',
    randomize: 'Randomize',
    raceBonuses: 'Race Bonuses',
    classBonuses: 'Class Bonuses',
  },
}

export const FullPage: Story = {
  args: {
    races: STORY_STEPS.map((s) => ({
      id: String(s.id),
      name: `Race ${s.id}`,
      description: 'Localized description from server.',
      bonuses: 'Localized bonuses from server.',
      stats: { hp: 10, mana: 10, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
      icon: 'User',
    })),
    classes: STORY_STEPS.map((s) => ({
      id: String(s.id),
      name: `Class ${s.id}`,
      description: 'Localized description from server.',
      bonuses: 'Localized bonuses from server.',
      statMod: { hp: 1, mana: 1, strength: 1, intelligence: 1, agility: 1, stamina: 1 },
      icon: 'Sword',
    })),
    steps: MOCK_STEPS,
    statLabels: {
      hp: 'HP',
      mana: 'Mana',
      strength: 'Strength',
      intelligence: 'Intelligence',
      agility: 'Agility',
      stamina: 'Stamina',
    },
    uiLabels: MOCK_UI,
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <RootShell>
        <AuthShell>
          <Story />
        </AuthShell>
      </RootShell>
    ),
  ],
}

export const TutorialStepStory: StoryObj<typeof TutorialStep> = {
  name: 'TutorialStep',
  render: () => (
    <TutorialStep
      step={MOCK_STEPS[0]}
      onChoice={() => {}}
      onSkip={() => {}}
      uiLabels={MOCK_UI.tutorial}
    />
  ),
}

const CreationWrapper = () => {
  const races: any[] = STORY_STEPS.map((s) => ({
    id: String(s.id),
    name: `Race ${s.id}`,
    description: 'Localized desc',
    bonuses: 'Localized bonuses',
    stats: { hp: 10, mana: 10, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
    icon: 'User',
  }))
  const classes: any[] = STORY_STEPS.map((s) => ({
    id: String(s.id),
    name: `Class ${s.id}`,
    description: 'Localized desc',
    bonuses: 'Localized bonuses',
    statMod: { hp: 1, mana: 1, strength: 1, intelligence: 1, agility: 1, stamina: 1 },
    icon: 'Sword',
  }))
  const statLabels = {
    hp: 'HP',
    mana: 'Mana',
    strength: 'Str',
    intelligence: 'Int',
    agility: 'Agi',
    stamina: 'Sta',
  }

  const {
    characterName,
    setName,
    handleRandomize,
    selectedRaceId,
    setSelectedRaceId,
    selectedClassId,
    setSelectedClassId,
    totalStats,
  } = useOrigins({ races, classes, steps: MOCK_STEPS } as any)

  return (
    <StepCreation
      name={characterName}
      onNameChange={setName}
      onRandomize={handleRandomize}
      onFinish={() => {}}
      selectedRaceId={selectedRaceId}
      onRaceSelect={setSelectedRaceId}
      selectedClassId={selectedClassId}
      onClassSelect={setSelectedClassId}
      stats={totalStats}
      canFinish={characterName.trim().length > 0}
      races={races}
      classes={classes}
      statLabels={statLabels}
      uiLabels={MOCK_UI.creation}
    />
  )
}

export const CreationStepStory: StoryObj<typeof StepCreation> = {
  name: 'CharacterCreation',
  render: () => <CreationWrapper />,
}
