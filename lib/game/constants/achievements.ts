export type AchievementRarity = 'common' | 'rare' | 'epic' | 'legendary'

export const ACHIEVEMENT_RARITY_COLORS = {
  common: {
    border: '#d4a574',
    bg: 'from-[#8b6f47]/90 to-[#6d5a3e]/90',
    glow: 'rgba(212, 165, 116, 0.3)',
  },
  rare: {
    border: '#69ccf0',
    bg: 'from-[#69ccf0]/20 to-[#4dabdb]/20',
    glow: 'rgba(105, 204, 240, 0.4)',
  },
  epic: {
    border: '#c084fc',
    bg: 'from-[#c084fc]/20 to-[#a855f7]/20',
    glow: 'rgba(192, 132, 252, 0.4)',
  },
  legendary: {
    border: '#ffd700',
    bg: 'from-[#ffd700]/20 to-[#ffed4e]/20',
    glow: 'rgba(255, 215, 0, 0.5)',
  },
}
