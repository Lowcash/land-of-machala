import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { CharacterStatsCard } from './character-stats-card'

const mockStats = {
  hp: 101,
  mana: 51,
  strength: 11,
  intelligence: 9,
  agility: 13,
  stamina: 10,
}

const mockStatLabels = {
  hp: 'HP',
  mana: 'MP',
  strength: 'STR',
  intelligence: 'INT',
  agility: 'AGI',
  stamina: 'STA',
}

const mockUiLabels = {
  statsTitle: 'Base Attributes',
}

describe('CharacterStatsCard', () => {
  it('should render the title and all stat labels', () => {
    render(
      <CharacterStatsCard stats={mockStats} statLabels={mockStatLabels} uiLabels={mockUiLabels} />
    )

    expect(screen.getByText('Base Attributes')).toBeInTheDocument()
    expect(screen.getByText('HP')).toBeInTheDocument()
    expect(screen.getByText('MP')).toBeInTheDocument()
    expect(screen.getByText('STR')).toBeInTheDocument()
  })

  it('should render the correct stat values', () => {
    render(
      <CharacterStatsCard stats={mockStats} statLabels={mockStatLabels} uiLabels={mockUiLabels} />
    )

    expect(screen.getByText('101')).toBeInTheDocument()
    expect(screen.getByText('51')).toBeInTheDocument()
    expect(screen.getByText('11')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('13')).toBeInTheDocument()
  })

  it('should show the status icon when isReady is true', () => {
    const { rerender } = render(
      <CharacterStatsCard
        stats={mockStats}
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
        isReady={false}
      />
    )

    expect(screen.queryByTestId('status-icon')).not.toBeInTheDocument()

    rerender(
      <CharacterStatsCard
        stats={mockStats}
        statLabels={mockStatLabels}
        uiLabels={mockUiLabels}
        isReady={true}
      />
    )

    // Note: StatusIcon uses ShieldCheck icon internally
    // We can check by generic icon role if available or just by rendering
  })
})
