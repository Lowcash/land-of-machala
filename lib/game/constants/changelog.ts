export interface ChangelogUpdate {
  id: number
  prefix: string
  text: string
  color: 'success' | 'magic' | 'danger' | 'copper'
}

export const GAME_CHANGELOG: ChangelogUpdate[] = [
  {
    id: 1,
    prefix: 'Rozšíření dovedností:',
    text: '19 skills ve 3 větvích (Combat, Defense, Magic)',
    color: 'success',
  },
  {
    id: 2,
    prefix: 'WoW-style talent systém:',
    text: '3-tier progrese s unlock požadavky',
    color: 'magic',
  },
  {
    id: 3,
    prefix: 'Movement systém:',
    text: 'Směrové pohyby (N/S/E/W) + náhodné souboje',
    color: 'danger',
  },
  {
    id: 4,
    prefix: 'UI Update:',
    text: 'Kompaktní CharacterBox redesign s medieval fantasy stylem',
    color: 'copper',
  },
]
