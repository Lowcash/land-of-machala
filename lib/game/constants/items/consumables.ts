import { FlaskConical, Mountain, Sparkles, Store } from 'lucide-react'

import { ItemTypes } from '../mechanics'

export const CONSUMABLES = [
  // Potions
  {
    id: 101,
    name: 'Lektvar zdraví',
    type: ItemTypes.CONSUMABLE,
    price: 30,
    healing: 30,
    icon: FlaskConical,
    description: 'Obnoví 30 HP',
  },
  {
    id: 102,
    name: 'Lektvar many',
    type: ItemTypes.CONSUMABLE,
    price: 40,
    mana: 30,
    icon: FlaskConical,
    description: 'Obnoví 30 Many',
  },
  {
    id: 104,
    name: 'Velký lektvar zdraví',
    type: ItemTypes.CONSUMABLE,
    price: 80,
    healing: 100,
    icon: FlaskConical,
    description: 'Obnoví 100 HP',
  },
  {
    id: 105,
    name: 'Elixír síly',
    type: ItemTypes.CONSUMABLE,
    price: 150,
    icon: Sparkles,
    description: 'Dočasně zvýší sílu',
  },

  // Materials / Misc
  {
    id: 103,
    name: 'Kus oceli',
    type: ItemTypes.CONSUMABLE,
    price: 25,
    icon: Mountain,
    description: 'Materiál pro kováře',
  },
  {
    id: 201,
    name: 'Jed zmije',
    type: ItemTypes.CONSUMABLE,
    price: 150,
    icon: FlaskConical,
    description: 'Nebezpečný jed',
  },
  {
    id: 202,
    name: 'Stínový prsten',
    type: ItemTypes.CONSUMABLE,
    price: 300,
    icon: Store,
    description: 'Záhadný artefakt',
  },

  // Status Cures
  {
    id: 110,
    name: 'Protijed',
    type: ItemTypes.CONSUMABLE,
    price: 25,
    icon: FlaskConical,
    description: 'Vyléčí otravu',
  },
  {
    id: 111,
    name: 'Obvaz',
    type: ItemTypes.CONSUMABLE,
    price: 15,
    healing: 15,
    icon: Store,
    description: 'Zastaví krvácení',
  },

  // Buffs / Special
  {
    id: 120,
    name: 'Svitek návratu',
    type: ItemTypes.CONSUMABLE,
    price: 100,
    icon: Sparkles,
    description: 'Teleportuje do města',
  },
  {
    id: 121,
    name: 'Kámen ostření',
    type: ItemTypes.CONSUMABLE,
    price: 40,
    icon: Mountain,
    description: 'Dočasně zvýší poškození zbraně',
  },
] as const
