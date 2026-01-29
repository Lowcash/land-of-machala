import type { LucideIcon } from 'lucide-react'
import {
  Coins,
  FlaskConical,
  Heart,
  MapPin,
  Mountain,
  Shield,
  Sparkles,
  Store,
  Sword,
  Swords,
  Trophy,
} from 'lucide-react'

import { ItemTypes, ServiceActions } from './mechanics'

export const SMITH_STOCK = [
  {
    id: 1,
    name: 'Dřevěný meč',
    attack: 5,
    price: 50,
    type: ItemTypes.WEAPON,
    description: 'Základní zbraň pro začátečníky',
    icon: Sword,
  },
  {
    id: 2,
    name: 'Železný meč',
    attack: 12,
    price: 150,
    type: ItemTypes.WEAPON,
    description: 'Spolehlivý meč z tvrdého železa',
    icon: Sword,
  },
  {
    id: 3,
    name: 'Dlouhý meč',
    attack: 15,
    price: 200,
    type: ItemTypes.WEAPON,
    description: 'Delší dosah, větší síla',
    icon: Sword,
  },
  {
    id: 4,
    name: 'Kožená zbroj',
    defense: 8,
    price: 100,
    type: ItemTypes.ARMOR,
    description: 'Lehká ochrana pro rychlé bojovníky',
    icon: Shield,
  },
  {
    id: 5,
    name: 'Řetězová zbroj',
    defense: 15,
    price: 250,
    type: ItemTypes.ARMOR,
    description: 'Kovové kroužky poskytují solidní ochranu',
    icon: Shield,
  },
  {
    id: 6,
    name: 'Ocelová zbroj',
    defense: 20,
    price: 400,
    type: ItemTypes.ARMOR,
    description: 'Odolná pancéřová výstroj',
    icon: Shield,
  },
] as const

export interface HealerService {
  id: string
  name: string
  description: string
  price: number
  icon: LucideIcon
  iconColor: string
  iconBg: string
  action: ServiceActions
}

export const HEALER_SERVICES: HealerService[] = [
  {
    id: 'heal',
    name: 'Ošetření zranění',
    description: 'Obnoví zdraví',
    price: 50,
    icon: Heart,
    iconColor: 'text-[#6fbf6f]',
    iconBg: 'bg-[#6fbf6f]/20',
    action: ServiceActions.HEAL,
  },
  {
    id: 'str-buff',
    name: 'Požehnání síly',
    description: '+5 Síla (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-[#ffd700]',
    iconBg: 'bg-[#ffd700]/20',
    action: ServiceActions.BUFF_STRENGTH,
  },
  {
    id: 'sta-buff',
    name: 'Požehnání výdrže',
    description: '+5 Stamina (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-[#ffd700]',
    iconBg: 'bg-[#ffd700]/20',
    action: ServiceActions.BUFF_STAMINA,
  },
  {
    id: 'antidote',
    name: 'Protijed',
    description: 'Vyléčí otravu',
    price: 20,
    icon: FlaskConical,
    iconColor: 'text-[#69ccf0]',
    iconBg: 'bg-[#69ccf0]/20',
    action: ServiceActions.ANTIDOTE,
  },
]

export const MARKET_STOCK = [
  {
    id: 101,
    name: 'Lektvar zdraví',
    type: ItemTypes.CONSUMABLE,
    price: 30,
    healing: 30,
    icon: FlaskConical,
  },
  {
    id: 102,
    name: 'Lektvar many',
    type: ItemTypes.CONSUMABLE,
    price: 40,
    mana: 30,
    icon: FlaskConical,
  },
  {
    id: 103,
    name: 'Kus oceli',
    type: ItemTypes.CONSUMABLE,
    price: 25,
    icon: Mountain,
  },
] as const

export const BLACK_MARKET_STOCK = [
  {
    id: 201,
    name: 'Jed zmije',
    type: ItemTypes.CONSUMABLE,
    price: 150,
    icon: FlaskConical,
  },
  {
    id: 202,
    name: 'Stínový prsten',
    type: ItemTypes.CONSUMABLE,
    price: 300,
    icon: Store,
  },
] as const

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
