import type { Meta, StoryObj } from '@storybook/nextjs-vite'

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
    races: [
      {
        id: 'human',
        name: 'Human',
        description:
          'Ambitious and versatile, humans are the builders of the largest kingdoms in Machala. Their history is one of conquest and discovery, eternally reaching for new horizons.',
        bonuses: '• +5% Experience Gain\n• Versatility in all trades\n• Quick recovery',
        stats: { hp: 100, mana: 50, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
        icon: 'User',
      },
      {
        id: 'elf',
        name: 'Elf',
        description:
          'Ageless guardians of the ancient woods, elves possess an innate connection to the primal magic of the world. They move with a grace that defies mortal comprehension.',
        bonuses: '• +10% Magic Resistance\n• Enhanced Vision in darkness\n• Whispers of the forest',
        stats: { hp: 80, mana: 110, strength: 6, intelligence: 16, agility: 13, stamina: 9 },
        icon: 'Ghost',
      },
      {
        id: 'dwarf',
        name: 'Dwarf',
        description:
          'Masters of stone and steel, dwarves are as resilient as the mountains they call home. Their endurance is legendary, as is their skill in the great forges of the deep.',
        bonuses: '• +15% Health Regeneration\n• Resilience against poison\n• Stone-forged skin',
        stats: { hp: 120, mana: 40, strength: 14, intelligence: 8, agility: 7, stamina: 16 },
        icon: 'Shield',
      },
      {
        id: 'orc',
        name: 'Orc',
        description:
          'Born from the rugged plains and hardened by survival, orcs value strength and honor above all. They are formidable warriors with a spirit that cannot be broken.',
        bonuses: '• +20% Physical Power\n• Battle Roar capability\n• Hardened constitution',
        stats: { hp: 110, mana: 30, strength: 18, intelligence: 5, agility: 9, stamina: 12 },
        icon: 'Sword',
      },
      {
        id: 'halfling',
        name: 'Halfling',
        description:
          'Small in stature but immense in spirit, halflings possess an uncanny luck and a talent for remaining unseen when they wish to be. They are the masters of the unexpected.',
        bonuses: '• +25% Stealth and Evasion\n• Uncanny Luck\n• Subtle movement',
        stats: { hp: 70, mana: 60, strength: 5, intelligence: 12, agility: 20, stamina: 8 },
        icon: 'Zap',
      },
      {
        id: 'undead',
        name: 'Undead',
        description:
          'Those who have returned from the veil, carrying the lingering echoes of their former lives. Bound by secrets and ancient shadows, they seek their own path in Machala.',
        bonuses: '• Immunity to fear\n• Siphoning touch\n• Veil-walking',
        stats: { hp: 90, mana: 90, strength: 8, intelligence: 14, agility: 10, stamina: 10 },
        icon: 'Skull',
      },
    ],
    classes: [
      {
        id: 'warrior',
        name: 'Warrior',
        description:
          'The vanguard of any army, warriors master every weapon and shield. They are the iron wall between civilization and the chaos that lurks in the shadows.',
        bonuses: '• Can wear heavy armor\n• Expertise in all melee weapons\n• Shield Bash ability',
        statMod: { hp: 50, mana: 0, strength: 10, intelligence: 0, agility: 5, stamina: 10 },
        icon: 'Sword',
      },
      {
        id: 'mage',
        name: 'Mage',
        description:
          'Scholars of the arcane who bend the elements to their will. A mage’s power is limited only by their knowledge and the focus of their mind.',
        bonuses: '• Mastery of elemental spells\n• Ritual casting\n• Arcane barrier',
        statMod: { hp: -10, mana: 60, strength: -2, intelligence: 15, agility: 2, stamina: 0 },
        icon: 'Flame',
      },
      {
        id: 'rogue',
        name: 'Rogue',
        description:
          'Specialists in deception, rapid strikes, and infiltration. Rogues strike from the shadows and vanish before their enemies even realize the fight has begun.',
        bonuses: '• Dual-wielding expertise\n• Trap detection and removal\n• Poison application',
        statMod: { hp: 10, mana: 10, strength: 2, intelligence: 5, agility: 15, stamina: 3 },
        icon: 'Skull',
      },
      {
        id: 'paladin',
        name: 'Paladin',
        description:
          'Holy warriors bound by sacred oaths, paladins combine martial prowess with divine magic to protect the weak and smite the wicked.',
        bonuses: '• Healing touch\n• Aura of courage\n• Smite of the just',
        statMod: { hp: 40, mana: 30, strength: 8, intelligence: 6, agility: 3, stamina: 8 },
        icon: 'Shield',
      },
      {
        id: 'ranger',
        name: 'Ranger',
        description:
          'Sentinels of the wild who excel at archery and tracking. Rangers speak the language of nature and can call upon animal companions to aid them.',
        bonuses: '• Long-range precision\n• Animal companion\n• Wilderness survival',
        statMod: { hp: 20, mana: 20, strength: 5, intelligence: 7, agility: 12, stamina: 10 },
        icon: 'Target',
      },
      {
        id: 'cleric',
        name: 'Cleric',
        description:
          'Agents of divine will on earth, clerics focus on healing the wounded and bolstering their allies with protective boons and celestial light.',
        bonuses: '• Superior healing magic\n• Divine protection\n• Holy light burst',
        statMod: { hp: 30, mana: 50, strength: 4, intelligence: 10, agility: 4, stamina: 7 },
        icon: 'Heart',
      },
    ],
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
  const races: any[] = [
    {
      id: 'human',
      name: 'Human',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 100, mana: 50, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
      icon: 'User',
    },
    {
      id: 'elf',
      name: 'Elf',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 80, mana: 110, strength: 6, intelligence: 16, agility: 13, stamina: 9 },
      icon: 'Ghost',
    },
    {
      id: 'dwarf',
      name: 'Dwarf',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 120, mana: 40, strength: 14, intelligence: 8, agility: 7, stamina: 16 },
      icon: 'Shield',
    },
    {
      id: 'orc',
      name: 'Orc',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 110, mana: 30, strength: 18, intelligence: 5, agility: 9, stamina: 12 },
      icon: 'Sword',
    },
    {
      id: 'halfling',
      name: 'Halfling',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 70, mana: 60, strength: 5, intelligence: 12, agility: 20, stamina: 8 },
      icon: 'Zap',
    },
    {
      id: 'undead',
      name: 'Undead',
      description: 'Desc',
      bonuses: 'Bons',
      stats: { hp: 90, mana: 90, strength: 8, intelligence: 14, agility: 10, stamina: 10 },
      icon: 'Skull',
    },
  ]
  const classes: any[] = [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: 50, mana: 0, strength: 10, intelligence: 0, agility: 5, stamina: 10 },
      icon: 'Sword',
    },
    {
      id: 'mage',
      name: 'Mage',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: -10, mana: 60, strength: -2, intelligence: 15, agility: 2, stamina: 0 },
      icon: 'Flame',
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: 10, mana: 10, strength: 2, intelligence: 5, agility: 15, stamina: 3 },
      icon: 'Skull',
    },
    {
      id: 'paladin',
      name: 'Paladin',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: 40, mana: 30, strength: 8, intelligence: 6, agility: 3, stamina: 8 },
      icon: 'Shield',
    },
    {
      id: 'ranger',
      name: 'Ranger',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: 20, mana: 20, strength: 5, intelligence: 7, agility: 12, stamina: 10 },
      icon: 'Target',
    },
    {
      id: 'cleric',
      name: 'Cleric',
      description: 'Desc',
      bonuses: 'Bons',
      statMod: { hp: 30, mana: 50, strength: 4, intelligence: 10, agility: 4, stamina: 7 },
      icon: 'Heart',
    },
  ]
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
