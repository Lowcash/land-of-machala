export type RealmStat = {
  label: string
  value: string
}

export type ChronicleItem = {
  id: string
  text: string
  timestamp: string
  tone: 'highlight' | 'muted'
}

export type CharacterStats = {
  agility: number
  hp: number
  intelligence: number
  mana: number
  stamina: number
  strength: number
}

export type RaceOption = {
  bonuses: string[]
  description: string
  id: string
  name: string
  stats: CharacterStats
}

export type ClassOption = {
  bonuses: string[]
  description: string
  id: string
  name: string
  stats: CharacterStats
}

export type OriginChoice = {
  description: string
  id: string
  suggestedClassId: ClassOption['id']
  suggestedRaceId: RaceOption['id']
  title: string
}

export type OriginStep = {
  choices: OriginChoice[]
  description: string
  eyebrow: string
  id: string
  prompt: string
  title: string
}

export type HeroSummary = {
  classLabel: string
  location: string
  name: string
  raceLabel: string
  stats: CharacterStats
}

export const AUTH_HERO = {
  headline: 'Enter a world where every step writes your legend.',
  title: 'Land of Machala',
} as const

export const AUTH_CHRONICLES: ChronicleItem[] = [
  {
    id: 'shadow-over-machala',
    text: 'The Shadow over Machala has receded as new heroes emerge from the mist.',
    timestamp: '2 hours ago',
    tone: 'highlight',
  },
  {
    id: 'silver-gate',
    text: 'Reconstruction of the Silver Gate begins tomorrow at sunrise.',
    timestamp: 'Yesterday',
    tone: 'muted',
  },
]

export const AUTH_STATS: RealmStat[] = [
  { label: 'Active Souls', value: '12,401' },
  { label: 'Realms Found', value: '84' },
  { label: 'Daily Quests', value: '3.2K' },
  { label: 'Merchants', value: '512' },
]

export const RACE_OPTIONS: RaceOption[] = [
  {
    id: 'human',
    name: 'Human',
    description: 'Versatile wanderers of city roads, trade halls, and border keeps.',
    bonuses: ['+5% experience gain', 'Balanced training', 'Swift recovery'],
    stats: { agility: 10, hp: 100, intelligence: 10, mana: 55, stamina: 11, strength: 10 },
  },
  {
    id: 'elf',
    name: 'Elf',
    description: 'Ancient forest-keepers who move with grace and quiet precision.',
    bonuses: ['Darkvision', 'Arcane affinity', 'Silent movement'],
    stats: { agility: 13, hp: 82, intelligence: 15, mana: 105, stamina: 9, strength: 7 },
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Stone-forged defenders raised in mountain halls and furnace light.',
    bonuses: ['Poison resistance', 'Forge mastery', 'Heavy resolve'],
    stats: { agility: 7, hp: 120, intelligence: 8, mana: 45, stamina: 15, strength: 14 },
  },
]

export const CLASS_OPTIONS: ClassOption[] = [
  {
    id: 'warrior',
    name: 'Warrior',
    description: 'Front-line veteran built for shield walls, iron pressure, and long marches.',
    bonuses: ['Shield discipline', 'Heavy strikes', 'Battle endurance'],
    stats: { agility: 3, hp: 45, intelligence: 0, mana: 0, stamina: 12, strength: 10 },
  },
  {
    id: 'ranger',
    name: 'Ranger',
    description: 'Road warden who survives with instinct, range, and steady patience.',
    bonuses: ['Precision volleys', 'Tracking', 'Wilderness craft'],
    stats: { agility: 11, hp: 18, intelligence: 5, mana: 12, stamina: 9, strength: 5 },
  },
  {
    id: 'mage',
    name: 'Mage',
    description: 'Disciplined scholar who bends flame, warding, and forgotten rites.',
    bonuses: ['Elemental focus', 'Ritual casting', 'Arcane shielding'],
    stats: { agility: 2, hp: -10, intelligence: 15, mana: 62, stamina: 1, strength: -2 },
  },
]

export const ORIGINS_STEP: OriginStep = {
  id: 'where-from',
  eyebrow: 'Prologue',
  title: 'Shape your journey',
  description: 'Choose one answer to steer your hero into fitting beginnings.',
  prompt: 'Where do you come from?',
  choices: [
    {
      id: 'forest',
      title: 'Forests and wild paths',
      description: 'Born beneath ancient trees and old whispers.',
      suggestedRaceId: 'elf',
      suggestedClassId: 'ranger',
    },
    {
      id: 'city',
      title: 'Bustling city streets',
      description: 'Raised among merchants, bargains, and watchful alleys.',
      suggestedRaceId: 'human',
      suggestedClassId: 'warrior',
    },
    {
      id: 'mountain',
      title: 'Mountain strongholds',
      description: 'Forged in stone, smoke, and iron halls.',
      suggestedRaceId: 'dwarf',
      suggestedClassId: 'warrior',
    },
  ],
}

export const RANDOM_NAMES = [
  'Ardyn Vale',
  'Lyra Goldleaf',
  'Tomas Flint',
  'Serah Dawnmere',
  'Rurik Emberhand',
  'Kael Thornmere',
  'Mira Ashvale',
  'Darian Hollowmere',
  'Elira Stonewake',
  'Corin Valecrest',
  'Selene Brightbrook',
  'Bram Ironroot',
] as const

export const DEFAULT_HERO_NAME = RANDOM_NAMES[0]
export const DEFAULT_ORIGIN_CLASS_ID = 'ranger' as const
export const DEFAULT_ORIGIN_RACE_ID = 'human' as const

export function getRandomHeroName() {
  return RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
}

export function findRace(raceId: RaceOption['id']) {
  return RACE_OPTIONS.find((race) => race.id === raceId) ?? RACE_OPTIONS[0]
}

export function findClass(classId: ClassOption['id']) {
  return CLASS_OPTIONS.find((item) => item.id === classId) ?? CLASS_OPTIONS[0]
}

export function resolveHeroStats(
  raceId: RaceOption['id'],
  classId: ClassOption['id']
): CharacterStats {
  const race = findRace(raceId)
  const playerClass = findClass(classId)

  return {
    agility: race.stats.agility + playerClass.stats.agility,
    hp: race.stats.hp + playerClass.stats.hp,
    intelligence: race.stats.intelligence + playerClass.stats.intelligence,
    mana: race.stats.mana + playerClass.stats.mana,
    stamina: race.stats.stamina + playerClass.stats.stamina,
    strength: race.stats.strength + playerClass.stats.strength,
  }
}

export function buildHeroSummary(
  name: string,
  raceId: RaceOption['id'],
  classId: ClassOption['id']
): HeroSummary {
  const race = findRace(raceId)
  const playerClass = findClass(classId)

  return {
    classLabel: playerClass.name,
    location: 'Outer Gate of Machala',
    name,
    raceLabel: race.name,
    stats: resolveHeroStats(raceId, classId),
  }
}
