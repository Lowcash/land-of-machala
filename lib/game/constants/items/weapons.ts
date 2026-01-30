import { Axe, Hammer, Sword } from 'lucide-react'

import { ItemTypes } from '../mechanics'

export const WEAPONS = [
  // Tier 1 - Basic
  {
    id: 1,
    name: 'Dřevěný meč',
    attack: 5,
    price: 50,
    type: ItemTypes.WEAPON,
    description: 'Základní zbraň pro začátečníky',
    icon: Sword,
    tier: 1,
  },
  {
    id: 11,
    name: 'Tupá sekera',
    attack: 6,
    price: 60,
    type: ItemTypes.WEAPON,
    description: 'Vhodná spíše na dříví než na nepřátele',
    icon: Axe,
    tier: 1,
  },

  // Tier 2 - Iron
  {
    id: 2,
    name: 'Železný meč',
    attack: 12,
    price: 150,
    type: ItemTypes.WEAPON,
    description: 'Spolehlivý meč z tvrdého železa',
    icon: Sword,
    tier: 2,
  },
  {
    id: 12,
    name: 'Bojová sekera',
    attack: 14,
    price: 180,
    type: ItemTypes.WEAPON,
    description: 'Těžká a smrtící',
    icon: Axe,
    tier: 2,
  },

  // Tier 3 - Steel
  {
    id: 3,
    name: 'Dlouhý meč',
    attack: 15,
    price: 200,
    type: ItemTypes.WEAPON,
    description: 'Delší dosah, větší síla',
    icon: Sword,
    tier: 3,
  },
  {
    id: 13,
    name: 'Ocelová sekera',
    attack: 18,
    price: 250,
    type: ItemTypes.WEAPON,
    description: 'Rozetne i kámen',
    icon: Axe,
    tier: 3,
  },

  // Daggers (Low dmg, High speed flavor - flavor mainly for now)
  {
    id: 31,
    name: 'Rezavá dýka',
    attack: 4,
    price: 40,
    type: ItemTypes.WEAPON,
    description: 'Rychlá, ale slabá',
    icon: Sword,
    tier: 1,
  },
  {
    id: 32,
    name: 'Vrahova dýka',
    attack: 10,
    price: 130,
    type: ItemTypes.WEAPON,
    description: 'Čepel určená pro zákeřné rány',
    icon: Sword,
    tier: 2,
  },
  {
    id: 33,
    name: 'Stínová čepel',
    attack: 14,
    price: 220,
    type: ItemTypes.WEAPON,
    description: 'Téměř neviditelná v boji',
    icon: Sword,
    tier: 3,
  },

  // Maces (High damage, potentially slower flavor)
  {
    id: 41,
    name: 'Dřevěný kyj',
    attack: 7,
    price: 55,
    type: ItemTypes.WEAPON,
    description: 'Hrubá síla',
    icon: Hammer,
    tier: 1,
  },
  {
    id: 42,
    name: 'Železný palcát',
    attack: 13,
    price: 170,
    type: ItemTypes.WEAPON,
    description: 'Drtí kosti i brnění',
    icon: Hammer,
    tier: 2,
  },
  {
    id: 43,
    name: 'Válečné kladivo',
    attack: 17,
    price: 280,
    type: ItemTypes.WEAPON,
    description: 'Nástroj zkázy',
    icon: Hammer,
    tier: 3,
  },

  // Spears (Balanced)
  {
    id: 51,
    name: 'Oštěp',
    attack: 6,
    price: 60,
    type: ItemTypes.WEAPON,
    description: 'Udrží nepřítele od těla',
    icon: Sword,
    tier: 1,
  },
  {
    id: 52,
    name: 'Halapartna',
    attack: 13,
    price: 160,
    type: ItemTypes.WEAPON,
    description: 'Univerzální zbraň stráže',
    icon: Sword,
    tier: 2,
  },
] as const
