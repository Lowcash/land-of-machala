import type { LucideIcon } from 'lucide-react'
import { FlaskConical, Heart, Sparkles } from 'lucide-react'

import { ServiceActions } from './mechanics'

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
    iconColor: 'text-game-success',
    iconBg: 'bg-game-success/20',
    action: ServiceActions.HEAL,
  },
  {
    id: 'str-buff',
    name: 'Požehnání síly',
    description: '+5 Síla (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-game-gold',
    iconBg: 'bg-game-gold/20',
    action: ServiceActions.BUFF_STRENGTH,
  },
  {
    id: 'sta-buff',
    name: 'Požehnání výdrže',
    description: '+5 Stamina (Do odpočinku)',
    price: 100,
    icon: Sparkles,
    iconColor: 'text-game-gold',
    iconBg: 'bg-game-gold/20',
    action: ServiceActions.BUFF_STAMINA,
  },
  {
    id: 'antidote',
    name: 'Protijed',
    description: 'Vyléčí otravu',
    price: 20,
    icon: FlaskConical,
    iconColor: 'text-game-info',
    iconBg: 'bg-game-info/20',
    action: ServiceActions.ANTIDOTE,
  },
]
