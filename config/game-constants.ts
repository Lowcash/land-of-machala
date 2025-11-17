import { QuestIdent } from '@prisma/client'

// Game mechanics constants
export const DIRECTIONS = ['left', 'right', 'up', 'down'] as const

export const WEARABLES = ['left_weapon', 'right_weapon', 'weapon', 'armor', 'potion'] as const

export const QUESTS = [QuestIdent.SLAIN_ENEMY, QuestIdent.SLAIN_TROLL] as const
export const QUEST_STATE = ['waiting', 'ready', 'progress', 'complete', 'done'] as const

// Location image paths (in /public directory)
export const LOCATION = {
  inventory: '/images/environment/inventory.jpg',
  quest: '/images/environment/quest.jpg',
  main_city: '/images/environment/city.jpg',
  hospital: '/images/environment/hospital.jpg',
  armory: '/images/environment/armory.jpg',
  bank: '/images/environment/bank.jpg',
  forest: '/images/environment/forest/2.jpg',
  forest_clearing: '/images/environment/forest_clearing/0.jpg',
  cemetery: '/images/environment/cemetery/0.jpg',
  desert: '/images/environment/desert/0.jpg',
  farmstead: '/images/environment/farmstead/0.jpg',
  hills: '/images/environment/hills/0.jpg',
  road: '/images/environment/road/2.jpg',
  castle_suburb: '/images/environment/castle_suburb/1.jpg',
  lake: '/images/environment/lake/0.jpg',
  swamp: '/images/environment/swamp/0.jpg',
} as const satisfies Record<string, string>

export const locationKeys = Object.keys(LOCATION) as Array<keyof typeof LOCATION>

// Enemy image paths (in /public directory)
export const ENEMY_IMAGE = {
  // FOREST
  GOBLIN: '/images/enemies/goblin.png',
  WOLF: '/images/enemies/wolf.png',
  BANDIT: '/images/enemies/bandit.png',
  // CEMETERY
  ZOMBIE: '/images/enemies/zombie.png',
  SKELETON: '/images/enemies/skeleton.png',
  GHOUL: '/images/enemies/ghoul.png',
  // DESERT
  SCORPION: '/images/enemies/scorpion.png',
  SAND_WORM: '/images/enemies/sand_worm.png',
  DESERT_BANDIT: '/images/enemies/desert_bandit.png',
  // FARM
  WILD_BOAR: '/images/enemies/wild_boar.png',
  ANGRY_FARMER: '/images/enemies/angry_farmer.png',
  // SUBURB
  THIEF: '/images/enemies/thief.png',
  DRUNKARD: '/images/enemies/drunkard.png',
  // HILLS
  HILL_TROLL: '/images/enemies/hill_troll.png',
  MOUNTAIN_GOAT: '/images/enemies/mountain_goat.png',
  // SWAMP
  SWAMP_LIZARD: '/images/enemies/swamp_lizard.png',
  GIANT_LEECH: '/images/enemies/giant_leech.png',
  SWAMP_GHOST: '/images/enemies/swamp_ghost.png',
  // LAKE
  WATER_SPRITE: '/images/enemies/water_sprite.png',
  GIANT_FROG: '/images/enemies/giant_frog.png',
  DROWNED: '/images/enemies/drowned.png',
} as const

// Player spawn configuration
export const BASE_SPAWN_X = 0
export const BASE_SPAWN_Y = 0

// Player stats base values
export const BASE_HP_ACTUAL = 100
export const BASE_HP_MAX = 100
export const BASE_XP_ACTUAL = 0
export const BASE_XP_MAX = 100

// Damage calculation
export const BASE_MIN_DAMAGE = 0
export const BASE_MAX_DAMAGE = 1

export const STRENGTH_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.25
export const AGILITY_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1
export const INTELLIGENCE_DAMAGE_CONTRIBUTOR_MULTIPLIER = 0.1
