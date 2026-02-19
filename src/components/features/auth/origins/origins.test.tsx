import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { OriginsView } from './view'

/** Mock next/navigation for next-intl compatibility */
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

/** Mock next-intl/navigation as it's used in i18n/routing.ts */
vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: ({ children }: any) => <>{children}</>,
    redirect: vi.fn(),
    usePathname: () => '/',
    useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
    getPathname: () => '/',
  }),
}))

/** Mock next-intl */
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string | any) =>
    typeof key === 'string' ? key : key?.defaultValue || '',
  useTimeZone: () => 'UTC',
  useMessages: () => ({}),
}))

/** Mock i18n routing */
vi.mock('@/i18n/routing', () => ({
  Link: ({ children }: any) => <>{children}</>,
  usePathname: () => '/',
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}))

/** Mock framer-motion to avoid animation issues in tests */
vi.mock('framer-motion', () => ({
  AnimatePresence: ({ children }: any) => <>{children}</>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

/** Mock ResizeObserver for ScrollArea */
global.ResizeObserver = class ResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}

const MOCK_PROPS = {
  races: [
    {
      id: 'human',
      name: 'Human',
      description: 'Human Desc',
      bonuses: 'Human Bonus',
      icon: 'human-icon',
      stats: { hp: 100, mana: 50, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
    },
    {
      id: 'elf',
      name: 'Elf',
      description: 'Elf Desc',
      bonuses: 'Elf Bonus',
      icon: 'elf-icon',
      stats: { hp: 81, mana: 111, strength: 6, intelligence: 16, agility: 13, stamina: 9 },
    },
  ],
  classes: [
    {
      id: 'warrior',
      name: 'Warrior',
      description: 'Warrior Desc',
      bonuses: 'Warrior Bonus',
      icon: 'warrior-icon',
      statMod: { hp: 22, mana: 3, strength: 7, intelligence: 1, agility: 2, stamina: 5 },
    },
  ],
  steps: [
    {
      id: 0,
      text: 'Story Start',
      choices: [{ text: 'Choice A', effect: { race: 'human' }, nextStep: 1 as const }],
    },
    {
      id: 1,
      text: 'Story Part 2',
      choices: [{ text: 'Final Choice', effect: { class: 'warrior' }, nextStep: 'end' as const }],
    },
  ],
  statLabels: {
    hp: 'HP',
    mana: 'Mana',
    strength: 'Str',
    intelligence: 'Int',
    agility: 'Agi',
    stamina: 'Sta',
  },
  uiLabels: {
    tutorial: { skip: 'Skip Intro' },
    creation: {
      title: 'Create Your Hero',
      subtitle: 'Sub',
      nameLabel: 'Hero Name',
      namePlaceholder: 'Enter',
      statsTitle: 'Stats',
      raceLabel: 'Race',
      classLabel: 'Class',
      finish: 'Enter World',
      randomize: 'Random',
      raceBonuses: 'Race B',
      classBonuses: 'Class B',
    },
  },
  backgroundSrc: '/test.jpg',
}

describe('OriginsView Integration', () => {
  it('renders initial tutorial phase and allows skipping', () => {
    render(<OriginsView {...MOCK_PROPS} />)

    expect(screen.getByText(/story start/i)).toBeInTheDocument()

    // Skip to creation using regex
    const skipButton = screen.getByText(/skip intro/i)
    fireEvent.click(skipButton)

    expect(screen.getByText(/create your hero/i)).toBeInTheDocument()
  })

  it('calculates stats correctly based on race and class selection', () => {
    render(<OriginsView {...MOCK_PROPS} />)

    // Skip to creation
    fireEvent.click(screen.getByText(/skip intro/i))

    // Default stats (Human [100 HP] + Warrior [22 HP] = 122 HP)
    expect(screen.getByText('122')).toBeInTheDocument()

    // Select Elf
    fireEvent.click(screen.getByText('Elf'))

    // Check HP: Elf (81) + Warrior (22) = 103
    expect(screen.getByText('103')).toBeInTheDocument()

    // Check Str: Elf (6) + Warrior (7) = 13
    expect(screen.getByText('13')).toBeInTheDocument()
  })

  it('follows narrative flow and sets race/class correctly', () => {
    render(<OriginsView {...MOCK_PROPS} />)

    // Step 0: Choice A -> Human, nextStep 1
    fireEvent.click(screen.getByText('Choice A'))
    expect(screen.getByText(/Story Part 2/i)).toBeInTheDocument()

    // Step 1: Final Choice -> Warrior, nextStep 'end'
    fireEvent.click(screen.getByText('Final Choice'))
    expect(screen.getByText(/Create Your Hero/i)).toBeInTheDocument()

    // Verify Human + Warrior are selected (implied by stats 122 HP)
    expect(screen.getByText('122')).toBeInTheDocument()

    // Change Race to Elf to ensure it's interactive
    fireEvent.click(screen.getByText('Elf'))
    expect(screen.getByText('103')).toBeInTheDocument()
  })
})
