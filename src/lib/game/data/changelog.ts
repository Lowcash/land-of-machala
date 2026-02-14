import changelogData from './changelog.json'

export interface ChangelogEntry {
  categoryKey?: string
  descriptionKey: string
  color?: 'success' | 'info' | 'danger' | 'gold' | 'secondary'
}

export const LATEST_CHANGES = changelogData as ChangelogEntry[]
