import { getPlayer, getPlayerStats } from '@/server/actions/player'
import { getWearable } from '@/server/actions/wearable'

import Content from './Content'
import Sidebar from '..'
import Progress from '@/components/ui/progress'

const EMPTY = '-'

export default async function SidebarLeft() {
  const player = await getPlayer()
  const playerStats = await getPlayerStats()
  const playerWearable = await getWearable()

  return (
    <Sidebar $open={true} $position='left'>
      <Content
        data={[
          {
            header: 'Postava',
            items: [
              { label: 'Jméno:', value: player.name ?? '' },
              { label: 'Rasa:', value: player.race ?? '' },
              { label: 'Profese:', value: player.profession ?? '' },
            ],
          },
          { header: 'Peníze', items: [{ value: `${player.money ?? 0} zl` }] },
          {
            header: 'HP',
            items: [
              {
                value: (
                  <Progress value={player.hp_actual} max={player.hp_max ?? 0} $variant='red'>
                    {player.hp_actual ?? 0} / {player.hp_max ?? 0}
                  </Progress>
                ),
              },
            ],
          },
          {
            header: 'Zbraně',
            items: [
              { label: 'Levá ruka:', value: playerWearable.left_hand?.weapon.name ?? EMPTY },
              { label: 'Pravá ruka:', value: playerWearable.right_hand?.weapon.name ?? EMPTY },
            ],
          },
          {
            header: 'Zbroj',
            items: [
              { label: 'Hlava:', value: playerWearable.head?.armor.name ?? EMPTY },
              { label: 'Ramena:', value: playerWearable.shoulder?.armor.name ?? EMPTY },
              { label: 'Tělo:', value: playerWearable.chest?.armor.name ?? EMPTY },
              { label: 'Ruce:', value: playerWearable.hand?.armor.name ?? EMPTY },
              { label: 'Kalhoty:', value: playerWearable.pants?.armor.name ?? EMPTY },
              { label: 'Boty:', value: playerWearable.boots?.armor.name ?? EMPTY },
            ],
          },
          {
            header: 'Staty',
            items: [
              { label: 'Level:', value: `${playerStats.level}` },
              {
                label: 'Poškození:',
                value: `${playerStats.damage_min} - ${playerStats.damage_max}`,
              },
              { label: 'Síla:', value: `${playerStats.strength}` },
              { label: 'Obratnost:', value: `${playerStats.agility}` },
              { label: 'Inteligence:', value: `${playerStats.intelligence}` },
            ],
          },
        ]}
      />
    </Sidebar>
  )
}
