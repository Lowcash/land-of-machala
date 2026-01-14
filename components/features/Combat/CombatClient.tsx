'use client'

import { ActionBtn } from '@/components/features/Game/ActionBtn'
import { CharacterBox } from '@/components/features/Game/CharacterBox'
import { GamePanel } from '@/components/features/Game/GameLayout'
import { HelpPanel } from '@/components/features/Panels/HelpPanel'
import { SettingsPanel } from '@/components/features/Panels/SettingsPanel'
import { PageTemplate } from '@/components/layout'
import { getIconFromName } from '@/lib/icons'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronDown,
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
import { useState } from 'react'

type Panel = 'inventory' | 'character' | 'skills' | 'quests' | 'map' | 'settings' | 'help' | null
type ItemType = 'weapon' | 'armor' | 'consumable'

interface CharacterStats {
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

interface Item {
  id: number
  name: string
  type: ItemType
  iconName?: string
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
  character: CharacterStats
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

  // Background image for combat
  const forestBg = '/assets/locations/forest.jpg'

  // Enemy data - use proper asset URL
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
    <PageTemplate title="Souboj" icon={Swords} backgroundImage={forestBg} maxWidth="lg">
      <div className="flex w-full flex-1 gap-3 overflow-hidden p-3">
        {/* Desktop: 2-column layout */}
        <div className="hidden md:flex md:flex-1 md:gap-4">
          {/* Left Column: Player + Actions */}
          <div className="flex flex-1 flex-col gap-3">
            <div className="shrink-0">
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

            {/* Combat Log */}
            <div className="relative h-40 shrink-0 overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md">
              <AnimatePresence>
                {floatingDamage.map((dmg) => (
                  <motion.div
                    key={dmg.id}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: -50, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="pointer-events-none absolute z-50 text-2xl font-bold will-change-transform"
                    style={{
                      left: dmg.isPlayer ? '25%' : '75%',
                      top: '50%',
                      color: dmg.text ? '#ffd700' : '#ff6b6b',
                      textShadow: '0 0 10px rgba(0,0,0,0.8)',
                      fontFamily: 'var(--font-fantasy)',
                    }}
                  >
                    {dmg.text || `-${dmg.damage}`}
                  </motion.div>
                ))}
              </AnimatePresence>
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

            {/* Combat Actions */}
            <GamePanel title="Bojové akce" className="flex-1">
              <CombatActions
                onAttack={handleAttack}
                onDefend={handleDefend}
                onUsePotion={handleUsePotion}
                onFlee={handleFlee}
                potions={inventory.filter((i) => i.type === 'consumable')}
                isPlayerTurn={turn === 'player'}
              />
            </GamePanel>
          </div>

          {/* Right Column: Enemy + Stats */}
          <div className="flex w-80 flex-col gap-3">
            <div className="shrink-0">
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

            {/* Enemy Stats Panel */}
            <GamePanel title="Statistiky nepřítele" className="flex-1">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <StatDisplay label="Útok" value={wolfEnemy.attack} color="text-[#ff6b6b]" />
                  <StatDisplay label="Obrana" value={wolfEnemy.defense} color="text-[#69ccf0]" />
                  <StatDisplay label="Úroveň" value={wolfEnemy.level} color="text-[#ffd700]" />
                  <StatDisplay
                    label="HP"
                    value={`${enemyHp}/${wolfEnemy.maxHp}`}
                    color="text-[#6fbf6f]"
                  />
                </div>

                <div className="border-t border-[#8b6f47]/30 pt-3">
                  <div className="text-xs text-[#8b7355]">
                    <p className="mb-2">
                      <span className="text-[#d4a574]">Typ:</span> Zvíře
                    </p>
                    <p className="mb-2">
                      <span className="text-[#d4a574]">Slabost:</span> Oheň
                    </p>
                    <p>
                      <span className="text-[#d4a574]">Odolnost:</span> Fyzický útok
                    </p>
                  </div>
                </div>
              </div>
            </GamePanel>
          </div>
        </div>

        {/* Mobile: Accordion layout */}
        <div className="flex flex-1 flex-col gap-3 md:hidden">
          <MobileAccordionSection title="Tvá postava">
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
          </MobileAccordionSection>

          <MobileAccordionSection title="Nepřítel" defaultOpen>
            <div className="space-y-3">
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
              <div className="grid grid-cols-2 gap-2 rounded-lg border border-[#8b6f47] bg-black/40 p-3">
                <StatDisplay label="Útok" value={wolfEnemy.attack} color="text-[#ff6b6b]" />
                <StatDisplay label="Obrana" value={wolfEnemy.defense} color="text-[#69ccf0]" />
              </div>
            </div>
          </MobileAccordionSection>

          {/* Combat Log - always visible */}
          <div className="relative h-32 shrink-0 overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md">
            <AnimatePresence>
              {floatingDamage.map((dmg) => (
                <motion.div
                  key={dmg.id}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -50, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="pointer-events-none absolute z-50 text-2xl font-bold will-change-transform"
                  style={{
                    left: dmg.isPlayer ? '25%' : '75%',
                    top: '50%',
                    color: dmg.text ? '#ffd700' : '#ff6b6b',
                    textShadow: '0 0 10px rgba(0,0,0,0.8)',
                    fontFamily: 'var(--font-fantasy)',
                  }}
                >
                  {dmg.text || `-${dmg.damage}`}
                </motion.div>
              ))}
            </AnimatePresence>
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
                    className={`rounded-lg border-l-2 px-3 py-1.5 text-xs ${colorClass} bg-black/60 backdrop-blur-sm`}
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    {log.text}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Combat Actions */}
          <GamePanel title="Bojové akce" className="flex-1">
            <CombatActions
              onAttack={handleAttack}
              onDefend={handleDefend}
              onUsePotion={handleUsePotion}
              onFlee={handleFlee}
              potions={inventory.filter((i) => i.type === 'consumable')}
              isPlayerTurn={turn === 'player'}
            />
          </GamePanel>
        </div>
      </div>

      {panel === 'settings' && <SettingsPanel onClose={() => setPanel(null)} />}
      {panel === 'help' && <HelpPanel onClose={() => setPanel(null)} />}
    </PageTemplate>
  )
}

interface CombatActionsProps {
  onAttack: (type: 'quick' | 'heavy' | 'magic') => void
  onDefend: (type: 'block' | 'dodge') => void
  onFlee: () => void
  onUsePotion: (itemId: number) => void
  potions: Item[]
  isPlayerTurn: boolean
}

function CombatActions({
  onAttack,
  onDefend,
  onFlee,
  onUsePotion,
  potions,
  isPlayerTurn,
}: CombatActionsProps) {
  const [showPotions, setShowPotions] = useState(false)

  return (
    <div
      className={`flex h-full flex-col ${!isPlayerTurn ? 'pointer-events-none opacity-50' : ''}`}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {/* Attacks */}
        <div className="space-y-1">
          <div className="mb-1 pl-1 text-[10px] tracking-wider text-[#8b7355] uppercase">Útok</div>
          <ActionBtn
            onClick={() => onAttack('quick')}
            icon={Zap}
            color="text-[#ffd700]"
            border="hover:border-[#ffd700]"
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
          >
            <span>Blokovat</span> (Sníží poškození)
          </ActionBtn>
          <ActionBtn
            onClick={() => onDefend('dodge')}
            icon={Wind}
            color="text-[#69ccf0]"
            border="hover:border-[#69ccf0]"
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
                    icon={getIconFromName(potion.iconName || '')}
                    color="text-[#6fbf6f]"
                    border="hover:border-[#6fbf6f]"
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
  )
}

interface StatDisplayProps {
  label: string
  value: string | number
  color: string
}

function StatDisplay({ label, value, color }: StatDisplayProps) {
  return (
    <div className="rounded-lg border border-[#8b6f47]/50 bg-black/40 p-2">
      <div className="text-[10px] tracking-wider text-[#8b7355] uppercase">{label}</div>
      <div className={`text-lg font-bold ${color}`} style={{ fontFamily: 'var(--font-fantasy)' }}>
        {value}
      </div>
    </div>
  )
}

function MobileAccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="shrink-0 overflow-hidden rounded-lg border-2 border-[#8b6f47] bg-black/80 shadow-xl backdrop-blur-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-black/60"
      >
        <span
          className="text-sm font-bold text-[#d4a574]"
          style={{ fontFamily: 'var(--font-fantasy)' }}
        >
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#d4a574] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <div className="border-t border-[#8b6f47]/50 p-3">{children}</div>}
    </div>
  )
}
