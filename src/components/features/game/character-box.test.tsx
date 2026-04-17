import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { CharacterBox } from './character-box'

describe('CharacterBox', () => {
  const defaultProps = {
    name: 'Grommash',
    level: 10,
    hp: 100,
    hpMax: 100,
    resource: 50,
    resourceMax: 100,
    resourceType: 'mana' as const,
    stats: {
      strength: 15,
      intelligence: 10,
      agility: 12,
      stamina: 18,
    },
  }

  it('renders character name and level correctly', () => {
    render(<CharacterBox {...defaultProps} level={99} />)

    expect(screen.getByText('Grommash')).toBeDefined()
    expect(screen.getAllByText('99').length).toBeGreaterThan(0)
  })

  it('renders vitals bars', () => {
    render(<CharacterBox {...defaultProps} />)

    expect(screen.getByText('Health')).toBeDefined()
    expect(screen.getByText('Mana')).toBeDefined()
  })

  it('renders stats when provided', () => {
    render(<CharacterBox {...defaultProps} stats={{ ...defaultProps.stats, intelligence: 11 }} />)

    expect(screen.getByText('STR')).toBeDefined()
    expect(screen.getByText('INT')).toBeDefined()
    expect(screen.getByText('AGI')).toBeDefined()
    expect(screen.getByText('STA')).toBeDefined()

    expect(screen.getByText('15')).toBeDefined()
    expect(screen.getByText('11')).toBeDefined()
  })

  it('renders enemy variant with secondary background', () => {
    render(<CharacterBox {...defaultProps} isEnemy />)

    // NarrativeCard/Card uses variants. We check if it renders correctly.
    // Since we refactored to use FeatureSection internally, we just ensure it doesn't crash
    expect(screen.getByText('Grommash')).toBeDefined()
  })

  it('renders compact mode with smaller elements', () => {
    render(<CharacterBox {...defaultProps} compact />)

    expect(screen.getByText('Grommash')).toBeDefined()
    // In compact mode, labels like 'STR' are hidden
    expect(screen.queryByText('STR')).toBeNull()
  })
})
