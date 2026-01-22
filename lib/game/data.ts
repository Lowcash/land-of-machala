import { FlaskConical, Heart, Shield, Sparkles, Sword } from 'lucide-react'

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
  icon: any
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
