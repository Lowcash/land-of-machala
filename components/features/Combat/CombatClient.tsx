'use client'

import { ActionsLayout, CharacterBox } from '@/components/features/Game'
import { PageTemplate } from '@/components/layout'
import { InfoLogPanel } from '@/components/layout/InfoLogPanel'
import { GameButton } from '@/components/ui/game/GameButton'
import { performCombatActionAction, performUseItemAction } from '@/lib/actions/combat'
import { endCombat } from '@/lib/actions/combat-state'
import { useActivityLog } from '@/lib/hooks/useActivityLog'
import { getIconFromName } from '@/lib/icons'
import { ArrowLeft, Shield, Sparkles, Swords, Target, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import type { CharacterData, CharacterItem } from '../Character/Shared/types'

interface CombatClientProps {
  character: CharacterData & {
    combatPlayerHp?: number
    combatEnemyHp?: number
    combatEnemyId?: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentEnemy?: any
  }
  inventory: CharacterItem[]
}

export function CombatClient({ character, inventory: initialInventory }: CombatClientProps) {
  const router = useRouter()
  const [playerHp, setPlayerHp] = useState(character.combatPlayerHp || character.hp)
  const [playerMana] = useState(character.mana)
  const [enemyHp, setEnemyHp] = useState(character.combatEnemyHp || 100)
  const [isPending, startTransition] = useTransition()

  // Use activity log hook
  const { logs } = useActivityLog(character.id as unknown as string, 2000)

  // Ensure robust enemy data
  const enemy = {
    name: 'Nepřítel',
    level: character.level,
    maxHp: character.combatEnemyHp ? 100 : 100,
    ...character.currentEnemy,
  }

  const handleAction = async (action: 'attack' | 'defend' | 'special' | 'flee', _type?: string) => {
    startTransition(async () => {
      try {
        if (action === 'flee') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = await endCombat(character.id as any, 'flee')
          if (result?.success) {
            router.push('/game')
          } else {
            toast.error('Útěk se nezdařil!')
          }
          return
        }

        const [data, err] = await performCombatActionAction({
          characterId: character.id,
          enemyId: character.combatEnemyId || 'enemy',
          enemyCurrentHp: enemyHp,
          action,
        })

        if (err) {
          toast.error(err.message)
          return
        }

        if (data) {
          setPlayerHp(data.playerHp || 0)
          setEnemyHp(data.enemyHp || 0)

          if (data.result === 'victory') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await endCombat(character.id as any, 'victory')
            toast.success('Vítězství!')
            router.push('/game')
          } else if (data.result === 'defeat') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            await endCombat(character.id as any, 'defeat')
            toast.error('Porážka!')
            router.push('/game')
          }
        }
      } catch (error) {
        console.error('Combat error:', error)
      }
    })
  }

  const [inventory] = useState(initialInventory)
  const potions = inventory.filter((i) => i.type === 'CONSUMABLE' || i.type === 'consumable')

  return (
    <PageTemplate
      title="Souboj"
      icon={Swords}
      backgroundImage="/assets/locations/forest.jpg"
      maxWidth="lg"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {/* Top Section - Player and Enemy */}
        <div className="grid w-full grid-cols-1 gap-3 px-3 pt-3 md:grid-cols-2">
          {/* Player Stats */}
          <div className="w-full">
            <CharacterBox
              name={character.name}
              level={character.level}
              hp={playerHp ?? character.hp}
              hpMax={character.maxHp}
              mana={playerMana}
              manaMax={character.maxMana}
              stats={{
                strength: character.strength,
                intelligence: character.intelligence,
                agility: character.agility,
                stamina: character.stamina,
              }}
              isEnemy={false}
            />
          </div>

          {/* Enemy Stats */}
          <div className="w-full">
            <CharacterBox
              name={enemy.name}
              level={enemy.level}
              hp={enemyHp ?? 100}
              hpMax={enemy.maxHp}
              mana={0}
              manaMax={100}
              stats={{
                strength: character.strength, // Placeholder
                intelligence: character.intelligence,
                agility: character.agility,
                stamina: 5, // Placeholder
              }}
              isEnemy={true}
              image="/assets/enemies/wolf.png"
            />
          </div>
        </div>

        {/* Combat Log - Middle */}
        <InfoLogPanel
          logs={logs}
          className="mx-3 h-[140px] shrink-0 rounded border border-[#d4a574]/50 bg-black/60 p-4 backdrop-blur-sm"
        />

        {/* Actions - Bottom */}
        <div className="relative min-h-0 flex-1 px-3 pb-3">
          <ActionsLayout
            showDirections={false}
            onToggleDirections={() => {}}
            exploration={
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
                    Obrana & Taktika
                  </div>
                  <div className="space-y-2">
                    <GameButton
                      onClick={() => handleAction('defend', 'block')}
                      icon={Shield}
                      variant="secondary"
                      isLoading={isPending}
                      className="w-full"
                    >
                      <span>Obrana</span>{' '}
                      <span className="ml-2 text-xs opacity-70">(Sníží poškození)</span>
                    </GameButton>
                    <GameButton
                      onClick={() => handleAction('flee')}
                      icon={ArrowLeft}
                      variant="ghost"
                      isLoading={isPending}
                      className="w-full text-[#8b7355] hover:text-[#d4a574]"
                    >
                      <span>Útěk</span>
                    </GameButton>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="mb-1 text-xs font-bold tracking-wider text-[#8b7355] uppercase">
                    Lektvary ({potions.length})
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {potions.map((potion) => (
                      <GameButton
                        key={potion.id}
                        onClick={async () => {
                          const [_res, err] = await performUseItemAction({
                            characterId: character.id,
                            itemId: potion.id,
                          })
                          if (!err) {
                            toast.success('Lektvar použit')
                          }
                        }}
                        icon={getIconFromName(potion.iconName || 'potion')}
                        variant="outline"
                        isLoading={isPending}
                        size="sm"
                        className="border-game-success/50 text-game-success hover:border-game-success"
                      >
                        {potion.name}
                      </GameButton>
                    ))}
                  </div>
                  {potions.length === 0 && (
                    <div className="text-xs text-[#8b7355] italic">Žádné lektvary k dispozici</div>
                  )}
                </div>
              </div>
            }
          >
            <div className="space-y-1">
              <div className="text-game-gold mb-1 text-xs font-bold tracking-wider uppercase">
                Útok
              </div>
              <div className="space-y-2">
                <GameButton
                  onClick={() => handleAction('attack', 'quick')}
                  icon={Zap}
                  variant="primary"
                  isLoading={isPending}
                  className="w-full justify-between"
                >
                  <span>Rychlý útok</span>
                  <span className="text-[10px] opacity-70">Základní</span>
                </GameButton>
                <GameButton
                  onClick={() => handleAction('attack', 'heavy')}
                  icon={Target}
                  variant="danger"
                  isLoading={isPending}
                  className="w-full justify-between"
                >
                  <span>Silný úder</span>
                  <span className="text-[10px]">Vysoké poškození</span>
                </GameButton>
                <GameButton
                  onClick={() => handleAction('special')}
                  icon={Sparkles}
                  variant="secondary"
                  isLoading={isPending}
                  className="border-game-magic text-game-magic hover:bg-game-magic/10 w-full justify-between"
                >
                  <span>Speciální schopnost</span>
                  <span className="text-[10px] opacity-70">-Mana</span>
                </GameButton>
              </div>
            </div>
          </ActionsLayout>
        </div>
      </div>
    </PageTemplate>
  )
}
