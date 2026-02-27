import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SelectionDetails } from './selection-details'

const mockRace = {
  id: 'human',
  name: 'Human',
  description: 'Versatile and ambitious.',
  bonuses: 'Bonus XP',
  stats: {
    hp: 100,
    mana: 50,
    strength: 10,
    intelligence: 8,
    agility: 12,
    stamina: 10,
  },
} as any

const mockClass = {
  id: 'warrior',
  name: 'Warrior',
  description: 'Fearless fighter.',
  bonuses: 'Shield Block',
  statMod: {
    hp: 55,
    mana: 0,
    strength: 11,
    intelligence: 0,
    agility: 6,
    stamina: 9,
  },
} as any

const mockStatLabels = {
  hp: 'HP',
  mana: 'MP',
  strength: 'STR',
  intelligence: 'INT',
  agility: 'AGI',
  stamina: 'STA',
}

const mockUiLabels = {
  raceBonuses: 'Race Bonuses',
}

describe('SelectionDetails', () => {
  it('should render description and bonuses', () => {
    render(
      <SelectionDetails
        item={mockRace}
        type="race"
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
      />
    )

    expect(screen.getByText('Versatile and ambitious.')).toBeInTheDocument()
    expect(screen.getByText('Bonus XP')).toBeInTheDocument()
  })

  it('should render all stats with labels', () => {
    render(
      <SelectionDetails
        item={mockRace}
        type="race"
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
      />
    )

    expect(screen.getByText(/100/)).toBeInTheDocument()
    expect(screen.getByText(/HP/)).toBeInTheDocument()
    expect(screen.getByText(/12/)).toBeInTheDocument()
    expect(screen.getByText(/AGI/)).toBeInTheDocument()
  })

  it('should render class stat modifiers with plus signs', () => {
    render(
      <SelectionDetails
        item={mockClass}
        type="class"
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
      />
    )

    expect(screen.getByText(/\+55/)).toBeInTheDocument()
    expect(screen.getByText(/\+11/)).toBeInTheDocument()
  })

  it('should return null if no item provided', () => {
    const { container } = render(
      <SelectionDetails
        item={null}
        type="race"
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
      />
    )

    expect(container.firstChild).toBeNull()
  })
})
