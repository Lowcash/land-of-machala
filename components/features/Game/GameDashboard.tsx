'use client'

import { PageTemplate } from '@/components/layout/PageTemplate'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { moveCharacter } from '@/lib/actions/movement-actions'
import {
  Beer,
  Building,
  Cross,
  Hammer,
  Home,
  ShoppingBag,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { FishingGame, LockpickGame, MiningGame } from '../Minigames'
import { BankActions } from './BankActions'
import { CharacterBox } from './CharacterBox'
import { GuildHallActions } from './GuildHallActions'
import { HealerActions } from './HealerActions'
import { MarketActions } from './MarketActions'
import { SmithActions } from './SmithActions'
import { TavernActions } from './TavernActions'
import { TownActions } from './TownActions'

type View =
  | 'town'
  | 'smith'
  | 'bank'
  | 'healer'
  | 'tavern'
  | 'market'
  | 'guild_hall'

interface GameDashboardProps {
  character: any // Replace with proper type
}

export function GameDashboard({ character }: GameDashboardProps) {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<View>('town')
  const [infoText, setInfoText] = useState<string | null>(null)
  const [isShaking] = useState(false)
  const [activeMinigame, setActiveMinigame] = useState<'fishing' | 'mining' | 'lockpick' | null>(
    null
  )
  const [, startTransition] = useTransition()

  // Mock data for now - should come from props or query
  const [gold, setGold] = useState(character.gold || 0)
  const [activeBuffs, setActiveBuffs] = useState<any[]>([])

  const handleMove = async (direction: 'north' | 'south' | 'east' | 'west') => {
    startTransition(async () => {
      const result = await moveCharacter(character.id, direction)
      
      if (!result.success) {
        setInfoText(`<span class="text-[#ff6b6b]">Chyba:</span> ${result.error}`)
        return
      }

      // Direction descriptions
      const directionTexts = {
        north: 'Vydáváš se na <span class="text-[#ffd700]">sever</span> k <span class="text-[#d4a574]">horským průsmykům</span>. Vzduch je tu chladnější a slyšíš ozvěnu větru mezi skalami.',
        south: 'Kráčíš na <span class="text-[#ffd700]">jih</span> přes <span class="text-[#6fbf6f]">zelené pláně</span>. Tráva se vlní ve větru a vzduch je plný vůně květů.',
        east: 'Vydáváš se na <span class="text-[#ffd700]">východ</span> k <span class="text-[#ffa500]">vyprahlé poušti</span>. Písek šustí pod tvýma nohama a slunce pálí nemilosrdně.',
        west: 'Vcházíš na <span class="text-[#ffd700]">západ</span> do <span class="text-[#8b7355]">temného lesa</span>. Stromy jsou husté a světlo sem proniká jen stěží.',
      }

      // Random combat encounter
      if (result.hasEncounter) {
        router.push('/combat')
      } else {
        setInfoText(
          `${directionTexts[direction]}<br/><span class="text-[#8b7355]">Pozice: X: ${result.newX}, Y: ${result.newY}</span>`
        )
      }
    })
  }

  const handleMinigameComplete = (rewards: any) => {
    setActiveMinigame(null)
    if (rewards) {
      // Handle rewards (add to inventory/gold)
      console.log('Minigame rewards:', rewards)
      setInfoText('Získal jsi odměnu z minihry!')
    }
  }

  const viewData = {
    town: {
      bg: '/assets/locations/city-background.jpg',
      title: 'Město Machala',
      icon: Home,
      desc: 'Nacházíš se v centru města <span class="text-[#ffd700]">Machala</span>, pulzujícího srdce obchodu a dobrodružství. Kolem tebe pobíhají kupci, dobrodruzi a místní obyvatelé. Můžeš navštívit <span class="text-[#6fbf6f]">léčitele</span> pro pomoc a léčení, <span class="text-[#ffd700]">zbrojíře a kováře</span> pro zbraně a zbroje, nebo <span class="text-[#ffd700]">banku</span> pro uložení cenností. Za městskými hradbami lze <span class="text-[#ff6b6b]">prozkoumat</span> neznámé končiny plné nebezpečí.',
    },
    smith: {
      bg: '/assets/locations/armory-background.jpg',
      title: 'Zbrojíř & Kovárna',
      icon: Hammer,
      desc: 'Vůně kovu a žhavého uhlí naplňuje vzduch v této dílně. Zbrojíř má široký výběr <span class="text-[#ffd700]">zbraní a zbrojí</span> k prodeji, zatímco kovář v zadní části může <span class="text-[#ffd700]">vykovat</span> nové předměty nebo <span class="text-[#69ccf0]">opravit a vylepšit</span> tvou výbavu. Oheň v kovárně plane a kladivo je připravené.',
    },
    bank: {
      bg: '/assets/locations/bank-background.jpg',
      title: 'Banka',
      icon: Building,
      desc: 'Masivní <span class="text-[#ffd700]">trezor</span> za pultem vzbuzuje důvěru. Tvé cennosti budou v bezpečí za těmito silnými zdmi. Můžeš zde <span class="text-[#ffd700]">uložit</span> peníze i vzácné předměty, které nepoužíváš. Nebo si své uložené <span class="text-[#ffd700]">zlato</span> zase <span class="text-[#69ccf0]">vybrat</span>. Bankéř na tebe přátelsky pokývne.',
    },
    healer: {
      bg: '/assets/locations/healer-background.jpg',
      title: 'Léčitel',
      icon: Cross,
      desc: 'Bylinková vůně a tichá atmosféra tě okamžitě uklidňují. Léčitel může <span class="text-[#6fbf6f]">uzdravit</span> tvá zranění a prodává účinné <span class="text-[#6fbf6f]">lektvary</span>. Na policích vidíš desítky lahviček s různobarevnými tekutinami. Možná pro tebe má i nějaký zajímavý <span class="text-[#ffd700]">quest</span>.',
    },
    tavern: {
      bg: '/assets/tavern-background.jpg',
      title: 'Taverna',
      icon: Beer,
      desc: 'Hlasitý smích a zvuk cinkajících hrnků naplňuje prostornou tavernu. Za barem stojí hostinský a čepuje pivo pro hladové dobrodruhy.',
    },
    market: {
      bg: '/assets/market-background.jpg',
      title: 'Tržiště',
      icon: ShoppingBag,
      desc: 'Rušné tržiště plné kupců a obchodníků. Můžeš zde najít opravdu cokoliv, pokud máš dost zlata.',
    },
    guild_hall: {
      bg: '/assets/locations/city-background.jpg',
      title: 'Hradová hala',
      icon: Building,
      desc: 'Žhavé uhlí a dunění kladiva vytváří hypnotickou melodii. Kovář umí vykovat zbraně a zbroje z materiálů.',
    },
  }[currentView]

  return (
    <RouteTransition>
      <PageTemplate
        title={viewData.title}
        backgroundImage={viewData.bg}
        icon={viewData.icon}
        maxWidth="lg"
        showBack={false}
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Player box at top - increased width for better visibility */}
          <div className="w-full max-w-md px-3 pt-3">
            <CharacterBox
              name={character.name}
              level={character.level}
              hp={character.hp}
              hpMax={character.maxHp}
              mana={character.mana}
              manaMax={character.maxMana}
              xp={character.xp}
              xpMax={character.xpToNextLevel}
              stats={character.stats}
              isEnemy={false}
              resourceType={
                character.class === 'warrior' || character.class === 'rogue' ? 'energy' : 'mana'
              }
            />
          </div>

          {/* Central Info Panel */}
          <div
            className={`mx-3 shrink-0 overflow-hidden rounded border border-[#d4a574]/50 bg-black/70 p-4 backdrop-blur-sm transition-colors ${isShaking ? 'shake border-[#ff4444]' : ''}`}
            style={{ height: '140px' }}
          >
            <div className="scrollbar-custom h-full overflow-y-auto">
              <div
                className="mx-auto max-w-2xl animate-[fadeInWave_0.6s_ease-out] py-1 text-center text-sm leading-relaxed text-[#f5e6d3]"
                key={infoText || viewData.desc}
                dangerouslySetInnerHTML={{ __html: infoText || viewData.desc }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="relative min-h-0 flex-1 px-3 pb-3">
            {currentView === 'town' && (
              <TownActions
                onSmith={() => setCurrentView('smith')}
                onBank={() => setCurrentView('bank')}
                onHealer={() => setCurrentView('healer')}
                onTavern={() => setCurrentView('tavern')}
                onMarket={() => setCurrentView('market')}
                onGuildHall={() => setCurrentView('guild_hall')}
                onMove={handleMove}
                setInfoText={setInfoText}
              />
            )}
            {currentView === 'smith' && (
              <SmithActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                inventory={[]}
                setInventory={() => {}}
                setInfoText={setInfoText}
              />
            )}
            {currentView === 'bank' && (
              <BankActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                bankGold={0}
                setBankGold={() => {}}
                bankItems={[]}
                setBankItems={() => {}}
                inventory={[]}
                setInventory={() => {}}
              />
            )}
            {currentView === 'healer' && (
              <HealerActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                activeBuffs={activeBuffs}
                setActiveBuffs={setActiveBuffs}
                setInfoText={setInfoText}
              />
            )}
            {currentView === 'tavern' && (
              <TavernActions
                onBack={() => setCurrentView('town')}
                onRest={() => {}}
                gold={gold}
                setGold={setGold}
                setInfoText={setInfoText}
              />
            )}
            {currentView === 'guild_hall' && (
              <GuildHallActions
                onBack={() => setCurrentView('town')}
                onOpenFactions={() => {}}
                setInfoText={setInfoText}
                playerReputation={0}
              />
            )}
            {currentView === 'market' && (
              <MarketActions
                onBack={() => setCurrentView('town')}
                gold={gold}
                setGold={setGold}
                inventory={[]}
                setInventory={() => {}}
                setInfoText={setInfoText}
              />
            )}
          </div>
        </div>

        {/* Minigames */}
        <FishingGame
          isOpen={activeMinigame === 'fishing'}
          onClose={() => setActiveMinigame(null)}
          onCatch={(fish) => handleMinigameComplete(fish)}
        />
        <MiningGame
          isOpen={activeMinigame === 'mining'}
          onClose={() => setActiveMinigame(null)}
          onComplete={(rewards) => handleMinigameComplete(rewards)}
        />
        <LockpickGame
          isOpen={activeMinigame === 'lockpick'}
          onClose={() => setActiveMinigame(null)}
          difficulty="easy"
          onSuccess={(reward) => handleMinigameComplete(reward)}
          onFailure={() => setActiveMinigame(null)}
        />
      </PageTemplate>
    </RouteTransition>
  )
}
