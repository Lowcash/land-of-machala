import type { Meta, StoryObj } from '@storybook/react'

import { STORY_STEPS } from '@/lib/game/data/origins'

import { StepCreation } from '@/components/features/auth/origins/step-creation'
import { TutorialStep } from '@/components/features/auth/origins/step-tutorial'
import { AuthShell } from '@/components/ui/prefabs/layout/auth-shell'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

import { useOrigins } from './use-origins'
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
      description:
        'The ancient lineages of Machala descend from the first stars that fell upon the peaks. Their wisdom is etched in stone and their songs echo through the deep valleys of time. This is a very long description intended to test the internal scrolling of the selection details panel within the fixed character creation height.',
      bonuses:
        '• +2 Ancient Wisdom\n• +5 Shadow Resistance\n• Enhanced Night Vision\n• Natural affinity for alchemy',
      stats: { hp: 10, mana: 10, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
      icon: s.id % 2 === 0 ? 'User' : 'Shield',
    })),
    classes: STORY_STEPS.map((s) => ({
      id: String(s.id),
      name: `Class ${s.id}`,
      description:
        'Mastery of the blade is not merely about strength, but about the harmony between spirit and steel. Those who follow this path find themselves guarding the borders of reality itself. We need this description to be quite substantial so we can verify that columns remain aligned and scroll bars appear correctly.',
      bonuses:
        '• +10 Physical Mastery\n• +3 Critical Strike\n• Unique ability: Star-fall Slash\n• Can equip heavy armor without penalty',
      statMod: { hp: 1, mana: 1, strength: 1, intelligence: 1, agility: 1, stamina: 1 },
      icon: s.id % 2 === 0 ? 'Sword' : 'Flame',
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
    selectedRaceId,
    setSelectedRaceId,
    selectedClassId,
    setSelectedClassId,
    totalStats,
    handleRandomize,
    handleFinish,
    canFinish,
  } = useOrigins({ races, classes, steps: MOCK_STEPS })

  return (
    <StepCreation
      name={characterName}
      onNameChange={setName}
      onRandomize={handleRandomize}
      onFinish={handleFinish}
      selectedRaceId={selectedRaceId}
      onRaceSelect={setSelectedRaceId}
      selectedClassId={selectedClassId}
      onClassSelect={setSelectedClassId}
      stats={totalStats}
      canFinish={canFinish}
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
