import type { TranslatedChangelogEntry } from '@/components/ui/prefabs/narrative/changelog'
import type { TranslatedServerStat } from '@/components/ui/prefabs/narrative/stats'
import type { FooterProps } from '@/components/ui/shared/footer'

/**
 * Shared Footer mock data.
 */
export const MOCK_FOOTER: FooterProps = {
  versionLabel: 'Version',
  copyrightLabel: 'Land of Machala',
  year: 2026,
  version: '2.0.0',
}

/**
 * Shared Server Stats mock data.
 */
export const MOCK_SERVER_STATS: TranslatedServerStat[] = [
  { id: '1', label: 'Active Warriors', value: '1,247', color: 'gold' },
  { id: '2', label: 'Bosses Vanquished', value: '89', color: 'danger' },
  { id: '3', label: 'Top Level', value: '87', color: 'success' },
  { id: '4', label: 'Quests', value: '12k+', color: 'info' },
]

/**
 * Shared Changelog mock data.
 */
export const MOCK_CHANGELOG: TranslatedChangelogEntry[] = [
  {
    category: 'Core',
    description: 'New v2.0.0 update with localization support.',
    color: 'success',
  },
  {
    category: 'UX',
    description: 'Enhanced game card aesthetics and themes.',
    color: 'info',
  },
  {
    description: 'Fixed minor navigation glitches and hydration issues.',
  },
]

/**
 * Shared Registration Benefits mock data.
 */
export const MOCK_BENEFITS: string[] = [
  'Create your hero from 6 races and classes',
  'Battle monsters and claim legendary loot',
  'Complete quests and uncover the realm story',
  'Master 19 unique skills and talents',
]

/**
 * Shared Lore Quotes mock data.
 */
export const MOCK_LORE_QUOTE = '„In times of darkness, legends are born. Will you be one of them?“'
