import type { LucideIcon } from 'lucide-react'
import { FlaskConical, Heart, Shield, Sparkles, Sword } from 'lucide-react'
import { Coins, MapPin, Swords, Trophy } from 'lucide-react'

import { getXPNeededForNextLevel } from './progression'

export const SMITH_STOCK = [
  {
    id: 1,
    name: 'Dřevěný meč',
    attack: 5,
    price: 50,
    type: 'weapon',
    description: 'Základní zbraň pro začátečníky',
    icon: Sword,
  },
  {
    id: 2,
    name: 'Železný meč',
    attack: 12,
    price: 150,
    type: 'weapon',
    description: 'Spolehlivý meč z tvrdého železa',
    icon: Sword,
  },
  {
    id: 3,
    name: 'Dlouhý meč',
    attack: 15,
    price: 200,
    type: 'weapon',
    description: 'Delší dosah, větší síla',
    icon: Sword,
  },
  {
    id: 4,
    name: 'Kožená zbroj',
    defense: 8,
    price: 100,
    type: 'armor',
    description: 'Lehká ochrana pro rychlé bojovníky',
    icon: Shield,
  },
  {
    id: 5,
    name: 'Řetězová zbroj',
    defense: 15,
    price: 250,
    type: 'armor',
    description: 'Kovové kroužky poskytují solidní ochranu',
    icon: Shield,
  },
  {
    id: 6,
    name: 'Ocelová zbroj',
    defense: 20,
    price: 400,
    type: 'armor',
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
  action: string
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
    action: 'Léčení',
  },
  {
    id: 'str-buff',
    name: 'Požehnání síly',
    description: '+5 Síla (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-[#ffd700]',
    iconBg: 'bg-[#ffd700]/20',
    action: 'Požehnání síly',
  },
  {
    id: 'sta-buff',
    name: 'Požehnání výdrže',
    description: '+5 Stamina (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-[#ffd700]',
    iconBg: 'bg-[#ffd700]/20',
    action: 'Požehnání ochrany',
  },
  {
    id: 'antidote',
    name: 'Protijed',
    description: 'Vyléčí otravu',
    price: 20,
    icon: FlaskConical,
    iconColor: 'text-[#69ccf0]',
    iconBg: 'bg-[#69ccf0]/20',
    action: 'Protijed',
  },
]

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

export const RUMORS = [
  'Opilý trpaslík ti prozradil, že v horách našel žílu zlata, ale vyhnali ho obři.',
  'Zaslechl jsi, že starosta má tajný tunel z radnice rovnou do banky.',
  'Někdo říkal, že v noci vylézají z kanálů obří krysy s červenýma očima.',
  'Hostinský prý míchá pivo s vodou z řeky, proto je tak levné.',
] as const

export const MOVEMENT_DESCRIPTIONS = {
  north:
    'Vydáváš se na <span class="text-[#ffd700]">sever</span> k <span class="text-[#d4a574]">horským průsmykům</span>. Vzduch je tu chladnější a slyšíš ozvěnu větru mezi skalami.',
  south:
    'Kráčíš na <span class="text-[#ffd700]">jih</span> přes <span class="text-[#6fbf6f]">zelené pláně</span>. Tráva se vlní ve větru a vzduch je plný vůně květů.',
  east: 'Vydáváš se na <span class="text-[#ffd700]">východ</span> k <span class="text-[#ffa500]">vyprahlé poušti</span>. Písek šustí pod tvýma nohama a slunce pálí nemilosrdně.',
  west: 'Vcházíš na <span class="text-[#ffd700]">západ</span> do <span class="text-[#8b7355]">temného lesa</span>. Stromy jsou husté a světlo sem proniká jen stěží.',
} as const

/**
 * Calculates XP required for the next level
 * @deprecated Use getXPNeededForNextLevel from progression.ts
 */
export function getXpForLevel(level: number): number {
  return getXPNeededForNextLevel(level)
}

export const HERO_TEXTS = [
  'V dobách temnoty se rodí legendy. Budeš jednou z nich, nebo padneš v zapomnění jako ti před tebou?',
  'Tvá cesta začíná právě teď. Každé rozhodnutí formuje tvůj osud.',
  'Machala volá své hrdiny. Odpovíš na volání?',
  'Nebezpečí číhá za každým rohem, ale s odvahou přichází sláva.',
  'Dávné legendy praví o hrdinech, kteří změnili osud světa. Tvůj příběh začíná zde.',
] as const
