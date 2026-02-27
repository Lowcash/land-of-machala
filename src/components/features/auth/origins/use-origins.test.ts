import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useOrigins } from './use-origins'

const mockRaces = [
  {
    id: 'human',
    name: 'Human',
    stats: { hp: 100, mana: 50, strength: 10, intelligence: 10, agility: 10, stamina: 10 },
  },
  {
    id: 'elf',
    name: 'Elf',
    stats: { hp: 80, mana: 110, strength: 6, intelligence: 16, agility: 13, stamina: 9 },
  },
] as any

const mockClasses = [
  {
    id: 'warrior',
    name: 'Warrior',
    statMod: { hp: 20, mana: 0, strength: 5, intelligence: 0, agility: 2, stamina: 5 },
  },
  {
    id: 'mage',
    name: 'Mage',
    statMod: { hp: 0, mana: 40, strength: 0, intelligence: 8, agility: 1, stamina: 0 },
  },
] as any

const mockSteps = [{ id: 0, text: 'Start', choices: [] }] as any

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

    expect(mockRaces.map((r: any) => r.id)).toContain(result.current.selectedRaceId)
    expect(mockClasses.map((c: any) => c.id)).toContain(result.current.selectedClassId)
  })
})
