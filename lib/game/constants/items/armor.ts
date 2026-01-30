import { Shield, Shirt } from 'lucide-react'

import { ItemTypes } from '../mechanics'

export const ARMOR = [
  // Tier 1
  {
    id: 4,
    name: 'Kožená zbroj',
    defense: 8,
    price: 100,
    type: ItemTypes.ARMOR,
    description: 'Lehká ochrana pro rychlé bojovníky',
    icon: Shirt,
    tier: 1,
  },
  {
    id: 21,
    name: 'Prošívaná vesta',
    defense: 5,
    price: 60,
    type: ItemTypes.ARMOR,
    description: 'Základní ochrana proti chladu a úderům',
    icon: Shirt,
    tier: 1,
  },

  // Tier 2
  {
    id: 5,
    name: 'Řetězová zbroj',
    defense: 15,
    price: 250,
    type: ItemTypes.ARMOR,
    description: 'Kovové kroužky poskytují solidní ochranu',
    icon: Shield,
    tier: 2,
  },
  {
    id: 22,
    name: 'Zesílená kůže',
    defense: 12,
    price: 180,
    type: ItemTypes.ARMOR,
    description: 'Kůže pobitá cvoky',
    icon: Shirt,
    tier: 2,
  },

  // Tier 3
  {
    id: 6,
    name: 'Ocelová zbroj',
    defense: 20,
    price: 400,
    type: ItemTypes.ARMOR,
    description: 'Odolná pancéřová výstroj',
    icon: Shield,
    tier: 3,
  },

  // Helmets
  {
    id: 71,
    name: 'Kožená čapka',
    defense: 2,
    price: 40,
    type: ItemTypes.ARMOR,
    description: 'Základní ochrana hlavy',
    icon: Shield,
    tier: 1,
  },
  {
    id: 72,
    name: 'Železná přilba',
    defense: 5,
    price: 120,
    type: ItemTypes.ARMOR,
    description: 'Chrání před tvrdými údery',
    icon: Shield,
    tier: 2,
  },
  {
    id: 73,
    name: 'Rytířská helma',
    defense: 8,
    price: 200,
    type: ItemTypes.ARMOR,
    description: 'Plná ochrana obličeje',
    icon: Shield,
    tier: 3,
  },

  // Shields / Off-hand (Treated as Armor for simplicity if no sub-type)
  {
    id: 81,
    name: 'Dřevěný štít',
    defense: 3,
    price: 50,
    type: ItemTypes.ARMOR,
    description: 'Vyrobený z prken',
    icon: Shield,
    tier: 1,
  },
  {
    id: 82,
    name: 'Kulatý štít',
    defense: 6,
    price: 150,
    type: ItemTypes.ARMOR,
    description: 'Vyztužený kovem',
    icon: Shield,
    tier: 2,
  },
  {
    id: 83,
    name: 'Erbovní štít',
    defense: 10,
    price: 300,
    type: ItemTypes.ARMOR,
    description: 'Štít s erbem Machaly',
    icon: Shield,
    tier: 3,
  },
] as const
