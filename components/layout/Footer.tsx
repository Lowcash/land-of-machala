'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import Progress from '@/components/ui/progress'

export default function Footer() {
  const playerShowQuery = usePlayerShowQuery()

  const hpActual = playerShowQuery.data?.hp_actual ?? 0
  const hpMax = playerShowQuery.data?.hp_max ?? 100

  const manaActual = playerShowQuery.data?.mana_actual ?? 0
  const manaMax = playerShowQuery.data?.mana_max ?? 100

  const xpActual = playerShowQuery.data?.xp_actual ?? 0
  const xpMax = playerShowQuery.data?.xp_max ?? 100

  return (
    <footer className='z-40 flex h-20 w-screen flex-col items-center bg-custom-yellow-2'>
      <div className='container mx-auto'>
        <Progress value={hpActual} max={hpMax} variant='red'>
          {hpActual} / {hpMax}
        </Progress>
        <Progress value={manaActual} max={manaMax} variant='blue'>
          {manaActual} / {manaMax}
        </Progress>
        <Progress value={xpActual} max={xpMax} variant='gold'>
          {xpActual} / {xpMax}
        </Progress>
      </div>
    </footer>
  )
}
