import changelogData from './changelog.json'

export interface ChangelogEntry {
  category?: string
  description: string
  color?: 'success' | 'info' | 'danger' | 'gold' | 'secondary'
}

export const LATEST_CHANGES = changelogData as ChangelogEntry[]
