import { Card } from '@/styles/common'
import { Text } from '@/styles/typography'
import Progress from '@/components/ui/progress'

interface Props {
  character?: {
    name?: string
    level?: string
    race?: string
    class?: string
  }

  abilities?: {
    strength?: string
    agility?: string
    intelligence?: string
    armor?: string
    damage?: string
  }

  progress?: {
    hp?: {
      actual: number
      max: number
    }
    mana?: {
      actual: number
      max: number
    }
    xp?: {
      actual: number
      max: number
    }
  }
}

export default function Character(p: Props) {
  const hasName = !!p.character?.name
  const hasLevel = !!p.character?.level
  const hasAddCharactedInfo = !!p.character?.race && !!p.character?.class
  const hasAbilities =
    !!p.abilities?.strength ||
    !!p.abilities?.agility ||
    !!p.abilities?.intelligence ||
    !!p.abilities?.armor ||
    !!p.abilities?.damage

  return (
    <Card className='h-full w-1/2 min-w-40 gap-4 sm:w-fit sm:min-w-80'>
      <div className='flex flex-col gap-1'>
        <Text className='flex flex-col sm:flex-row sm:items-baseline sm:gap-1'>
          <b className='text-sm sm:text-base'>
            {hasName ? p.character!.name : <>&nbsp;</>} {hasLevel ? <>[{p.character!.level}]</> : <>&nbsp;</>}
          </b>
          <span className='text-xs sm:text-sm'>
            {hasAddCharactedInfo ? <>{p.character ? `(${p.character.race} ${p.character.class})` : ''}</> : <>&nbsp;</>}
          </span>
        </Text>
        <Text className='flex flex-wrap gap-x-2 text-xs'>
          {hasAbilities ? (
            [
              { ability: p.abilities?.strength, icon: '🦾' },
              { ability: p.abilities?.agility, icon: '⚡️' },
              { ability: p.abilities?.intelligence, icon: '🧠' },
              { ability: p.abilities?.armor, icon: '👕' },
              { ability: p.abilities?.damage, icon: '⚔️' },
            ].map((x, idx) => (
              <span key={`${p.character?.name}Ability_${idx}`} className='whitespace-nowrap'>
                {x.ability ? `${x.icon} ${x.ability}` : ''}
              </span>
            ))
          ) : (
            <>&nbsp;</>
          )}
        </Text>
        {p.progress?.xp && (
          <Progress value={p.progress.xp.actual} max={p.progress.xp.max} variant='gold'>
            XP {p.progress.xp.actual} / {p.progress.xp.max}
          </Progress>
        )}
      </div>

      <div className='flex flex-col gap-0.5'>
        {p.progress?.hp && (
          <Progress value={p.progress.hp.actual} max={p.progress.hp.max} variant='red'>
            HP {p.progress.hp.actual} / {p.progress.hp.max}
          </Progress>
        )}
        {p.progress?.mana && (
          <Progress value={p.progress.mana.actual} max={p.progress.mana.max} variant='blue'>
            Mana {p.progress.mana.actual} / {p.progress.mana.max}
          </Progress>
        )}
      </div>
    </Card>
  )
}
