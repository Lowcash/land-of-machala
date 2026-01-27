'use client'

import { Beer, Building, Cross, Hammer, ScrollText, ShoppingBag } from 'lucide-react'

import type { View } from '@/lib/game/config'

import { LocationAction } from '../Shared/components/LocationAction'
import { LocationLayout } from '../Shared/components/LocationLayout'

interface TownActionsProps {
  onView: (view: View) => void
}

export function TownActions({ onView }: TownActionsProps) {
  return (
    <LocationLayout
      title="Náměstí Machaly"
      description="Střed všeho dění. Vzduch je cítit kouřem z kovárny a vůní pečeného masa z hospody."
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <LocationAction
          variant="large"
          title="Tržiště"
          icon={ShoppingBag}
          onClick={() => onView('market')}
        />

        <LocationAction
          variant="large"
          title="Kovárna"
          icon={Hammer}
          onClick={() => onView('smith')}
        />

        <LocationAction
          variant="large"
          title="Hospoda"
          icon={Beer}
          onClick={() => onView('tavern')}
        />

        <LocationAction
          variant="large"
          title="Banka"
          icon={Building}
          onClick={() => onView('bank')}
        />

        <LocationAction
          variant="large"
          title="Léčitel"
          icon={Cross}
          onClick={() => onView('healer')}
        />

        <LocationAction
          variant="compact"
          title="Vývěska úkolů"
          icon={ScrollText}
          className="col-span-full"
          onClick={() => {}} // TODO: Quest Board logic
        />
      </div>
    </LocationLayout>
  )
}
