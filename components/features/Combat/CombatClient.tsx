'use client'

import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { HelpPanel } from '@/components/features/Panels/HelpPanel'
import { SettingsPanel } from '@/components/features/Panels/SettingsPanel'
import { PageTemplate } from '@/components/layout'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import {
  ArrowLeft,
  ChevronRight,
  Droplet,
  Shield,
  Sparkles,
  Swords,
  Target,
  Wind,
  Zap,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type Panel = 'inventory' | 'character' | 'skills' | 'quests' | 'map' | 'settings' | 'help' | null
type ItemType = 'weapon' | 'armor' | 'consumable'

interface Item {
  id: number
  name: string
  type: ItemType
  icon: any
  attack?: number
  defense?: number
  magic?: number
  speed?: number
  healing?: number
  mana?: number
  slot?: string
  equipped?: boolean
  strength?: number
  intelligence?: number
  agility?: number
  stamina?: number
}

interface CombatClientProps {
  character: {
    name: string
    level: number
    hp: number
    maxHp: number
    mana: number
    maxMana: number
    strength: number
    intelligence: number
    agility: number
    stamina: number
    class: string
  }
  inventory: Item[]
}

export function CombatClient({ character, inventory: initialInventory }: CombatClientProps) {
  const router = useRouter()
  const [panel, setPanel] = useState<Panel>(null)
  const [playerHp, setPlayerHp] = useState(character.hp)
  const [playerMana, setPlayerMana] = useState(character.mana)
  const [enemyHp, setEnemyHp] = useState(100)
  const [combatLog, setCombatLog] = useState<{ text: string; type: string }[]>([
    { text: 'Narazil jsi na divokého Vlka!', type: 'start' },
  ])
  const [floatingDamage, setFloatingDamage] = useState<
    { id: number; damage: number; x: number; isPlayer: boolean; text?: string }[]
  >([])

  const resourceType = ['warrior', 'rogue'].includes(character.class.toLowerCase())
    ? 'energy'
    : 'mana'
  const [turn, setTurn] = useState<'player' | 'enemy'>('player')

  // Settings state
  const [settings, setSettings] = useState({
    sound: true,
    music: true,
    animationSpeed: 1,
    textSpeed: 1,
    autoSave: true,
    combatAnimations: true,
    showTutorial: false,
  })

  // Background image for combat
  const forestBg = '/assets/locations/forest.jpg'

  // Enemy data
  const wolfEnemyImage = '/assets/enemies/wolf.png'
  const wolfEnemy = {
    name: 'Divoký vlk',
    level: 1,
    hp: 100,
    maxHp: 100,
    attack: 15,
    defense: 5,
  }

  const [inventory, setInventory] = useState<Item[]>(initialInventory)

  const calculateStats = () => {
    const baseStats = {
      strength: character.strength,
      intelligence: character.intelligence,
      agility: character.agility,
      stamina: character.stamina,
    }
    const equipped = inventory.filter((i) => i.equipped)

    return equipped.reduce(
      (acc, item) => ({
        strength: acc.strength + (item.strength || 0),
        intelligence: acc.intelligence + (item.intelligence || 0),
        agility: acc.agility + (item.agility || 0),
        stamina: acc.stamina + (item.stamina || 0),
      }),
      baseStats
    )
  }

  const stats = calculateStats()

  const addFloatingText = (text: string | number, isPlayer: boolean) => {
    const id = Date.now()
    setFloatingDamage((prev) => [
      ...prev,
      {
        id,
        damage: typeof text === 'number' ? text : 0,
        text: typeof text === 'string' ? text : undefined,
        x: 50,
        isPlayer,
      },
    ])
    setTimeout(() => {
      setFloatingDamage((prev) => prev.filter((d) => d.id !== id))
    }, 1500)
  }

  const handleEnemyTurn = () => {
    setTimeout(() => {
      // Enemy AI
      const action = Math.random()
      let damage = 0
      let logText = ''

      if (action < 0.7) {
        // Attack
        damage = Math.floor(Math.random() * 10) + 5
        setPlayerHp((prev) => Math.max(0, prev - damage))
        addFloatingText(damage, true)
        logText = `Vlk tě kousl za ${damage} poškození!`
      } else {
        // Growl (Buff or Miss)
        logText = `Vlk hrozivě vrčí, ale neútočí.`
      }

      setCombatLog((prev) => [{ text: logText, type: 'enemyAttack' }, ...prev])
      setTurn('player')
    }, 1000)
  }

  const handleAttack = (type: 'quick' | 'heavy' | 'magic') => {
    if (turn !== 'player') return

    let damage = 0
    let cost = 0
    let hitChance = 1.0
    let logText = ''

    if (type === 'quick') {
      damage = Math.floor(Math.random() * 8) + 5
      hitChance = 0.95
      logText = `Rychlý úder způsobil ${damage} poškození.`
    } else if (type === 'heavy') {
      cost = 15
      if (playerMana < cost) {
        setCombatLog((prev) => [{ text: 'Nemáš dost energie!', type: 'info' }, ...prev])
        return
      }
      damage = Math.floor(Math.random() * 15) + 12
      hitChance = 0.75
      logText = `Silný úder drtí kosti! ${damage} poškození.`
    } else if (type === 'magic') {
      cost = 20
      if (playerMana < cost) {
        setCombatLog((prev) => [{ text: 'Nemáš dost many!', type: 'info' }, ...prev])
        return
      }
      damage = Math.floor(Math.random() * 20) + 10
      hitChance = 0.9
      logText = `Magický výboj spálil nepřítele za ${damage} poškození.`
    }

    if (cost > 0) setPlayerMana((prev) => prev - cost)

    if (Math.random() > hitChance) {
      setCombatLog((prev) => [{ text: `Tvůj útok (${type}) minul!`, type: 'info' }, ...prev])
      addFloatingText('Miss', false)
    } else {
      setEnemyHp((prev) => Math.max(0, prev - damage))
      addFloatingText(damage, false)
      setCombatLog((prev) => [{ text: logText, type: 'playerAttack' }, ...prev])
    }

    setTurn('enemy')
    handleEnemyTurn()
  }

  const handleDefend = (type: 'block' | 'dodge') => {
    if (turn !== 'player') return

    if (type === 'block') {
      setCombatLog((prev) => [
        { text: 'Zvedl jsi štít. Příští útok bude slabší.', type: 'defend' },
        ...prev,
      ])
      // Logic for reducing next damage would go here (simplified for now)
      // For visual feedback, just end turn
    } else if (type === 'dodge') {
      if (playerMana < 10) {
        setCombatLog((prev) => [{ text: 'Jsi příliš unavený na úhyb!', type: 'info' }, ...prev])
        return
      }
      setPlayerMana((prev) => prev - 10)
      setCombatLog((prev) => [{ text: 'Připravil ses k úhybu.', type: 'defend' }, ...prev])
    }

    setTurn('enemy')
    handleEnemyTurn()
  }

  const handleUsePotion = (itemId: number) => {
    if (turn !== 'player') return
    const potion = inventory.find((i) => i.id === itemId)
    if (!potion) return

    if (potion.healing) {
      setPlayerHp((prev) => Math.min(character.maxHp, prev + potion.healing!))
      setCombatLog((prev) => [
        { text: `Použil jsi ${potion.name} a obnovil ${potion.healing} HP!`, type: 'heal' },
        ...prev,
      ])
    }
    if (potion.mana) {
      setPlayerMana((prev) => Math.min(character.maxMana, prev + potion.mana!))
      setCombatLog((prev) => [
        { text: `Použil jsi ${potion.name} a obnovil ${potion.mana} MP!`, type: 'mana' },
        ...prev,
      ])
    }

    setInventory((prev) => prev.filter((i) => i.id !== itemId))
    // Potion doesn't end turn immediately? Usually it does.
    setTurn('enemy')
    handleEnemyTurn()
  }

  const handleFlee = () => {
    if (Math.random() > 0.5) {
      router.push('/game')
    } else {
      setCombatLog((prev) => [{ text: 'Nepodařilo se ti utéct!', type: 'enemyAttack' }, ...prev])
      setTurn('enemy')
      handleEnemyTurn()
    }
  }

  return (
    <PageTemplate title="Souboj" icon={Swords} backgroundImage={forestBg} maxWidth="full">
      <div className="flex w-full flex-1 gap-3 overflow-hidden p-3">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Top: Combat Arena */}
          <div className="flex items-center justify-between gap-2 py-2 sm:gap-4">
            <div className="max-w-sm min-w-0 flex-1">
              <CharacterBox
                name={character.name}
                level={character.level}
                hp={playerHp}
                hpMax={character.maxHp}
                mana={playerMana}
                manaMax={character.maxMana}
                stats={stats}
                isEnemy={false}
                resourceType={resourceType}
              />
            </div>

            <div className="flex shrink-0 flex-col items-center justify-center">
              <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 border-[#ff4444] bg-[#8b2f2f] shadow-[0_0_15px_rgba(255,68,68,0.5)] sm:h-10 sm:w-10">
                <Swords className="h-4 w-4 text-white sm:h-5 sm:w-5" />
              </div>
            </div>

            <div className="max-w-sm min-w-0 flex-1">
              <CharacterBox
                name={wolfEnemy.name}
                level={wolfEnemy.level}
                hp={enemyHp}
                hpMax={wolfEnemy.maxHp}
                mana={0}
                manaMax={100}
                stats={{
                  strength: wolfEnemy.attack,
                  intelligence: 2,
                  agility: 15,
                  stamina: wolfEnemy.defense,
                }}
                isEnemy={true}
                image={wolfEnemyImage}
              />
            </div>
          </div>

          {/* Middle: Combat Log */}
          <div className="relative h-[120px] shrink-0 overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md">
            {floatingDamage.map((dmg) => (
              <div
                key={dmg.id}
                className="floating-damage pointer-events-none absolute z-50 text-2xl font-bold"
                style={{
                  left: dmg.isPlayer ? '25%' : '75%',
                  top: '50%',
                  color: dmg.text ? '#ffd700' : '#ff6b6b',
                  textShadow: '0 0 10px rgba(0,0,0,0.8)',
                  fontFamily: 'var(--font-fantasy)',
                }}
              >
                {dmg.text || `-${dmg.damage}`}
              </div>
            ))}
            <div className="scrollbar-custom h-full space-y-1.5 overflow-y-auto p-3">
              {combatLog.map((log, idx) => {
                const colors = {
                  playerAttack: 'text-[#ffd700] border-l-[#ffd700]',
                  enemyAttack: 'text-[#ff6b6b] border-l-[#ff6b6b]',
                  defend: 'text-[#69ccf0] border-l-[#69ccf0]',
                  heal: 'text-[#6fbf6f] border-l-[#6fbf6f]',
                  mana: 'text-[#c084fc] border-l-[#c084fc]',
                  info: 'text-[#8b7355] border-l-[#8b7355]',
                  start: 'text-[#f5e6d3] border-l-[#d4a574]',
                }
                const colorClass =
                  colors[log.type as keyof typeof colors] || 'text-[#f5e6d3] border-l-[#8b6f47]'

                return (
                  <div
                    key={idx}
                    className={`rounded-lg border-l-2 px-3 py-1.5 text-xs sm:text-sm ${colorClass} bg-black/60 backdrop-blur-sm`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {log.text}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom: Combat Actions */}
          <div className="min-h-0 flex-1 overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 p-3 shadow-xl backdrop-blur-md">
            <CombatActions
              onAttack={handleAttack}
              onDefend={handleDefend}
              onUsePotion={handleUsePotion}
              onFlee={handleFlee}
              potions={inventory.filter((i) => i.type === 'consumable')}
              isPlayerTurn={turn === 'player'}
            />
          </div>
        </div>
      </div>

      {panel === 'settings' && (
        <SettingsPanel
          onClose={() => setPanel(null)}
          settings={settings}
          setSettings={setSettings}
        />
      )}
      {panel === 'help' && <HelpPanel onClose={() => setPanel(null)} />}
    </PageTemplate>
  )
}

function CombatActions({ onAttack, onDefend, onFlee, onUsePotion, potions, isPlayerTurn }: any) {
  const actionsScrollRef = useRef<HTMLDivElement>(null)
  const [showPotions, setShowPotions] = useState(false)

  return (
    <div
      className={`flex h-full flex-col ${!isPlayerTurn ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="mb-2 flex shrink-0 items-center justify-between">
        <h3 className="text-sm text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          Bojové akce
        </h3>
        <span className="text-[10px] tracking-widest text-[#8b7355] uppercase">
          {isPlayerTurn ? 'Tvůj tah' : 'Tah nepřítele'}
        </span>
      </div>

      <div ref={actionsScrollRef} className="scrollbar-custom flex-1 overflow-y-auto">
        <ScrollIndicator targetRef={actionsScrollRef} position="bottom" />

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {/* Attacks */}
          <div className="space-y-1">
            <div className="mb-1 pl-1 text-[10px] tracking-wider text-[#8b7355] uppercase">
              Útok
            </div>
            <ActionBtn
              onClick={() => onAttack('quick')}
              icon={Zap}
              color="text-[#ffd700]"
              border="hover:border-[#ffd700]"
              small
            >
              <div className="flex w-full justify-between">
                <span>Rychlý útok</span>
                <span className="text-[10px] opacity-70">95% přesnost</span>
              </div>
            </ActionBtn>
            <ActionBtn
              onClick={() => onAttack('heavy')}
              icon={Target}
              color="text-[#ff6b6b]"
              border="hover:border-[#ff6b6b]"
              small
            >
              <div className="flex w-full justify-between">
                <span>Silný úder</span>
                <span className="text-[10px] text-[#ff6b6b]">-15 E</span>
              </div>
            </ActionBtn>
            <ActionBtn
              onClick={() => onAttack('magic')}
              icon={Sparkles}
              color="text-[#b66bd4]"
              border="hover:border-[#b66bd4]"
              small
            >
              <div className="flex w-full justify-between">
                <span>Magie</span>
                <span className="text-[10px] text-[#b66bd4]">-20 M</span>
              </div>
            </ActionBtn>
          </div>

          {/* Defenses & Utility */}
          <div className="space-y-1">
            <div className="mb-1 pl-1 text-[10px] tracking-wider text-[#8b7355] uppercase">
              Obrana & Taktika
            </div>
            <ActionBtn
              onClick={() => onDefend('block')}
              icon={Shield}
              color="text-[#69ccf0]"
              border="hover:border-[#69ccf0]"
              small
            >
              <span>Blokovat</span> (Sníží poškození)
            </ActionBtn>
            <ActionBtn
              onClick={() => onDefend('dodge')}
              icon={Wind}
              color="text-[#69ccf0]"
              border="hover:border-[#69ccf0]"
              small
            >
              <div className="flex w-full justify-between">
                <span>Uhnout</span>
                <span className="text-[10px] text-[#69ccf0]">-10 E</span>
              </div>
            </ActionBtn>

            <div className="mt-1 border-t border-[#8b6f47]/30 pt-2"></div>

            <ActionBtn
              onClick={onFlee}
              icon={ArrowLeft}
              color="text-[#8b7355]"
              border="hover:border-[#d4a574]"
              small
            >
              <div className="flex w-full justify-between">
                <span>Útěk</span>
                <span className="text-[10px] opacity-70">50% šance</span>
              </div>
            </ActionBtn>
          </div>

          {/* Potions Toggle */}
          {potions.length > 0 && (
            <div className="col-span-1 mt-1 space-y-1 border-t border-[#8b6f47]/30 pt-2 sm:col-span-2">
              <button
                onClick={() => setShowPotions(!showPotions)}
                className="flex w-full items-center justify-between rounded border border-[#6fbf6f]/30 bg-black/40 px-3 py-1.5 text-xs text-[#6fbf6f] transition-colors hover:border-[#6fbf6f] hover:bg-black/60"
              >
                <div className="flex items-center gap-2">
                  <Droplet className="h-3 w-3" />
                  <span>Lektvary ({potions.length})</span>
                </div>
                <ChevronRight
                  className={`h-3 w-3 transition-transform ${showPotions ? 'rotate-90' : ''}`}
                />
              </button>

              {showPotions && (
                <div className="grid grid-cols-2 gap-2 border-l border-[#6fbf6f]/30 pl-2">
                  {potions.map((potion: Item) => (
                    <ActionBtn
                      key={potion.id}
                      onClick={() => onUsePotion(potion.id)}
                      icon={potion.icon}
                      color="text-[#6fbf6f]"
                      border="hover:border-[#6fbf6f]"
                      small
                    >
                      <div className="flex w-full justify-between">
                        <span>{potion.name}</span>
                        <span className="text-[10px] opacity-70">
                          {potion.healing ? `+${potion.healing} HP` : `+${potion.mana} MP`}
                        </span>
                      </div>
                    </ActionBtn>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ActionBtn({
  onClick,
  icon: Icon,
  children,
  color = 'text-[#d4a574]',
  border = 'hover:border-[#ffd700]',
  small,
}: any) {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-2 ${small ? 'px-2 py-1.5 text-xs' : 'px-3 py-2.5 text-sm'} rounded border border-[#8b6f47]/50 bg-black/40 hover:bg-black/60 ${border} w-full text-left transition-all`}
    >
      <Icon className={`h-4 w-4 flex-shrink-0 ${color}`} />
      <div className="flex min-w-0 flex-1 items-center leading-tight text-[#f5e6d3]">
        {children}
      </div>
    </button>
  )
}
