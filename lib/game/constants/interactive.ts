import {
  ArrowRight,
  Bed,
  Beer,
  Coins,
  Dices,
  EyeOff,
  Home,
  Map,
  MessageCircle,
  ShoppingBag,
  Store,
  Swords,
} from 'lucide-react'

// Market Hub Actions
export const MARKET_HUB_ACTIONS = [
  {
    id: 'buy',
    title: 'Koupit zboží',
    description: 'Lektvary, suroviny, základní vybavení',
    icon: Store,
    variant: 'secondary' as const,
    actionId: 'set_mode_buy',
  },
  {
    id: 'sell',
    title: 'Prodat předměty',
    description: 'Zpeněžit kořist z výprav',
    icon: ShoppingBag,
    variant: 'secondary' as const,
    actionId: 'set_mode_sell',
  },
  {
    id: 'blackmarket',
    title: 'Podezřelá ulička',
    description: 'Vzácné a zakázané zboží',
    icon: EyeOff,
    variant: 'ghost' as const, // Distinct style
    className: 'border-purple-900/20 hover:border-purple-900/50',
    iconClassName: 'text-purple-500',
    titleClassName: 'text-purple-300',
    actionId: 'enter_blackmarket',
  },
] as const

// Tavern Dialog Options
export const TAVERN_OPTIONS = [
  {
    id: 'beer',
    title: 'Koupit pivo',
    description: 'Doplní síly a zvedne náladu (5g)',
    text: 'Koupit pivo (5g)',
    icon: Beer,
    actionId: 'drink',
    variant: 'large' as const,
  },
  {
    id: 'stay',
    title: 'Odpočinout si',
    description: 'Vyspi se do růžova a obnov zdraví (10g)',
    text: 'Odpočinout si (10g)',
    icon: Bed,
    actionId: 'stay',
    variant: 'large' as const,
  },
  {
    id: 'rumors',
    title: 'Poslechnout drby',
    description: 'Místní vědí všechno, co se šustne (5g)',
    text: 'Drby a zvěsti (5g)',
    icon: MessageCircle,
    actionId: 'rumors',
    variant: 'large' as const,
  },
  {
    id: 'gamble',
    title: 'Hrát kostky',
    description: 'Zkus své štěstí v hazardu',
    text: 'Hrát kostky',
    icon: Dices,
    actionId: 'gamble',
    variant: 'large' as const,
  },
] as const

// Bank Config
export const BANK_CONFIG = {
  depositTitle: 'Uložit zlato',
  withdrawTitle: 'Vybrat zlato',
  depositAction: {
    title: 'Vložit',
    icon: ArrowRight,
  },
  withdrawAction: {
    title: 'Vybrat',
    icon: Coins,
  },
} as const

// Forest Hub Actions
export const FOREST_ACTIONS = [
  {
    id: 'hunt',
    title: 'Lovit zvěř',
    description: 'Najdi nepřítele a bojuj o zkušenosti a kořist',
    icon: Swords,
    variant: 'danger' as const,
    actionId: 'hunt',
  },
  {
    id: 'explore',
    title: 'Prozkoumat okolí',
    description: 'Hledej byliny, stopy nebo skrytá místa',
    icon: Map,
    variant: 'secondary' as const,
    actionId: 'explore',
  },
  {
    id: 'return',
    title: 'Návrat do města',
    description: 'Bezpečí hradeb je na dosah',
    icon: Home,
    variant: 'ghost' as const,
    actionId: 'return',
  },
] as const
