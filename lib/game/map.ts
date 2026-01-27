import type { LocationType } from '@prisma/client'

import type { Location } from '@/components/features/Map/Shared/types'

export const DEMO_LOCATIONS: Partial<Location>[] = [
  {
    id: 'demo-cave',
    name: 'Gobliní Jeskyně',
    description: 'Temná a vlhká jeskyně plná zlomyslných skřetů.',
    type: 'DUNGEON' as LocationType,
    level: 5,
    positionX: 150,
    positionY: 80,
  },
  {
    id: 'demo-ruins',
    name: 'Staré Ruiny',
    description: 'Pozůstatky starověké civilizace, které prý ukrývají poklad.',
    type: 'LANDMARK' as LocationType,
    level: 10,
    positionX: 200,
    positionY: 150,
  },
  {
    id: 'demo-forest',
    name: 'Temný Hvozd',
    description: 'Les, kam slunce nesvítí a stromy šeptají.',
    type: 'WILDERNESS' as LocationType,
    level: 3,
    positionX: 80,
    positionY: 120,
  },
  {
    id: 'demo-lake',
    name: 'Jezero Snů',
    description: 'Klidné jezero s křišťálovou vodou.',
    type: 'LANDMARK' as LocationType,
    level: 1,
    positionX: 120,
    positionY: 180,
  },
]
