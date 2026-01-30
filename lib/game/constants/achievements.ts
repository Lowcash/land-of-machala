import type { LucideIcon } from 'lucide-react'
import { Coins, MapPin, Shield, Swords, Trophy } from 'lucide-react'

export type AchievementRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'

export const ACHIEVEMENT_RARITY_COLORS = {
  COMMON: {
    bg: 'from-slate-500/20 to-slate-600/20',
    border: '#94a3b8',
    glow: 'rgba(148, 163, 184, 0.3)',
  },
  RARE: {
    bg: 'from-blue-500/20 to-blue-600/20',
    border: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.3)',
  },
  EPIC: {
    bg: 'from-purple-500/20 to-purple-600/20',
    border: '#a855f7',
    glow: 'rgba(168, 85, 247, 0.3)',
  },
  LEGENDARY: {
    bg: 'from-orange-500/20 to-orange-600/20',
    border: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
} as const

export const ACHIEVEMENT_ICONS: Record<number, LucideIcon> = {
  1: Trophy,
  2: Trophy,
  3: MapPin,
  4: Coins,
  5: Shield,
  6: Swords,
}

export const ACHIEVEMENTS = [
  { id: 1, name: 'První kroky', xp: 50, desc: 'Dokončil jsi první úkol' },
  { id: 2, name: 'Zabiják', xp: 100, desc: 'Zabil jsi 10 nepřátel' },
  { id: 3, name: 'Průzkumník', xp: 150, desc: 'Navštívil jsi všechny oblasti' },
  { id: 4, name: 'Boháč', xp: 200, desc: 'Nasbíral jsi 1000 zlatých' },
  { id: 5, name: 'Mistr řemesel', xp: 250, desc: 'Vylepšil jsi zbraň na maximum' },
  { id: 6, name: 'Hrdina Machaly', xp: 500, desc: 'Dokončil jsi hlavní příběh' },
] as const
