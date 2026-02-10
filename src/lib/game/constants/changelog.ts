export interface ChangelogEntry {
  category?: string
  description: string
  color?: 'success' | 'info' | 'danger' | 'gold' | 'secondary'
}

export const LATEST_CHANGES: ChangelogEntry[] = [
  {
    category: 'Rozšíření dovedností',
    description: '19 skills ve 3 větvích (Combat, Defense, Magic)',
    color: 'success',
  },
  {
    category: 'WoW-style talent systém',
    description: '3-tier progrese s unlock požadavky',
    color: 'info',
  },
  {
    category: 'Movement systém',
    description: 'Směrové pohyby (N/S/E/W) + náhodné souboje',
    color: 'danger',
  },
  {
    description: 'Kompaktní CharacterBox redesign s medieval fantasy stylem',
  },
]
