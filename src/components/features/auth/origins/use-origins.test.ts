import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  type TranslatedClassInfo,
  type TranslatedRaceInfo,
  type TranslatedStoryStep,
} from '@/lib/game/data/shared'

import { useOrigins } from './use-origins'

const mockRaces: TranslatedRaceInfo[] = [
  {
    id: 'human',
    name: 'Human',
    description: 'A versatile race.',
    bonuses: 'None',
    icon: 'human-icon',
    stats: { hp: 100, mana: 50, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'A magical race.',
    bonuses: 'None',
    icon: 'elf-icon',
    stats: { hp: 80, mana: 110, strength: 6, intelligence: 16, agility: 13, stamina: 9 },
  },
]

const mockClasses: TranslatedClassInfo[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'A strong fighter.',
    bonuses: 'None',
    icon: 'warrior-icon',
    statMod: { hp: 20, mana: 0, strength: 5, intelligence: 0, agility: 2, stamina: 5 },
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'A powerful spellcaster.',
    bonuses: 'None',
    icon: 'mage-icon',
    statMod: { hp: 0, mana: 40, strength: 0, intelligence: 8, agility: 1, stamina: 0 },
  },
]

const mockSteps: TranslatedStoryStep[] = [{ id: 0, text: 'Start', choices: [] }]

describe('useOrigins', () => {
  it('should initialize with first race and class selected', () => {
    const { result } = renderHook(() =>
      useOrigins({ races: mockRaces, classes: mockClasses, steps: mockSteps })
    )

    expect(result.current.selectedRaceId).toBe('human')
    expect(result.current.selectedClassId).toBe('warrior')
  })

  it('should allow selecting a race', () => {
    const { result } = renderHook(() =>
      useOrigins({ races: mockRaces, classes: mockClasses, steps: mockSteps })
    )

    act(() => {
      result.current.setSelectedRaceId('elf')
    })

    expect(result.current.selectedRaceId).toBe('elf')
  })

  it('should allow selecting a class', () => {
    const { result } = renderHook(() =>
      useOrigins({ races: mockRaces, classes: mockClasses, steps: mockSteps })
    )

    act(() => {
      result.current.setSelectedClassId('mage')
    })

    expect(result.current.selectedClassId).toBe('mage')
  })

  it('should randomize selections', () => {
    const { result } = renderHook(() =>
      useOrigins({ races: mockRaces, classes: mockClasses, steps: mockSteps })
    )

    act(() => {
      result.current.handleRandomize()
    })

    expect(mockRaces.map((r) => r.id)).toContain(result.current.selectedRaceId)
    expect(mockClasses.map((c) => c.id)).toContain(result.current.selectedClassId)
  })
})
