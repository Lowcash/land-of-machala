import { LocationType } from '@prisma/client'

export const SEED_LOCATIONS = [
  {
    name: 'Starting Town',
    type: LocationType.TOWN,
    description: 'A peaceful town where your adventure begins',
    level: 1,
    positionX: 100,
    positionY: 100,
  },
  {
    name: 'Dark Forest',
    type: LocationType.WILDERNESS,
    description: 'A dense forest filled with dangerous creatures',
    level: 2,
    positionX: 150,
    positionY: 120,
  },
  {
    name: 'Ancient Ruins',
    type: LocationType.DUNGEON,
    description: 'Mysterious ruins from a forgotten age',
    level: 3,
    positionX: 180,
    positionY: 90,
  },
  {
    name: 'Goblin Camp',
    type: LocationType.DUNGEON,
    description: 'The stronghold of the goblin king',
    level: 5,
    positionX: 200,
    positionY: 150,
  },
  {
    name: 'Mountain Peak',
    type: LocationType.LANDMARK,
    description: 'The highest point in all of Machala',
    level: 10,
    positionX: 250,
    positionY: 50,
  },
  {
    name: 'Merchant City',
    type: LocationType.TOWN,
    description: 'A bustling city of trade and commerce',
    level: 6,
    positionX: 120,
    positionY: 180,
  },
]
