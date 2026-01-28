import { AchievementCategory, AchievementRarity } from '@prisma/client'

export const SEED_ACHIEVEMENTS = [
  // Combat achievements
  {
    title: 'First Blood',
    description: 'Defeat your first enemy',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.COMMON,
    maxProgress: 1,
    iconName: 'sword-badge',
    rewardGold: 10,
    rewardXp: 25,
  },
  {
    title: 'Slayer',
    description: 'Defeat 100 enemies',
    category: AchievementCategory.COMBAT,
    rarity: AchievementRarity.RARE,
    maxProgress: 100,
    iconName: 'slayer',
    rewardGold: 500,
    rewardXp: 1000,
  },

  // Quest achievements
  {
    title: 'Quest Beginner',
    description: 'Complete your first quest',
    category: AchievementCategory.QUESTS,
    rarity: AchievementRarity.COMMON,
    maxProgress: 1,
    iconName: 'quest-badge',
    rewardGold: 25,
    rewardXp: 50,
  },
  {
    title: 'Quest Master',
    description: 'Complete 50 quests',
    category: AchievementCategory.QUESTS,
    rarity: AchievementRarity.EPIC,
    maxProgress: 50,
    iconName: 'quest-master',
    rewardGold: 1000,
    rewardXp: 2000,
    rewardTitle: 'Quest Master',
  },

  // Exploration achievements
  {
    title: 'Explorer',
    description: 'Discover 10 locations',
    category: AchievementCategory.EXPLORATION,
    rarity: AchievementRarity.RARE,
    maxProgress: 10,
    iconName: 'compass',
    rewardGold: 100,
    rewardXp: 200,
  },

  // Collection achievements
  {
    title: 'Hoarder',
    description: 'Collect 100 items',
    category: AchievementCategory.COLLECTION,
    rarity: AchievementRarity.RARE,
    maxProgress: 100,
    iconName: 'chest',
    rewardGold: 250,
    rewardXp: 500,
  },

  // Progression achievements
  {
    title: 'Level 10',
    description: 'Reach character level 10',
    category: AchievementCategory.PROGRESSION,
    rarity: AchievementRarity.RARE,
    maxProgress: 1,
    iconName: 'level-up',
    rewardGold: 200,
    rewardXp: 0,
  },
  {
    title: 'Legendary Hero',
    description: 'Reach character level 50',
    category: AchievementCategory.PROGRESSION,
    rarity: AchievementRarity.LEGENDARY,
    maxProgress: 1,
    iconName: 'legendary',
    rewardGold: 5000,
    rewardXp: 0,
    rewardTitle: 'Legendary Hero',
    hidden: true,
  },
]
