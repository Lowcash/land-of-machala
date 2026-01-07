'use client'

import { RouteTransition } from '@/components/layout/RouteTransition'
import { useNotification } from '@/components/providers/NotificationProvider'
import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Dices,
  Droplet,
  Heart,
  Shield as ShieldIcon,
  SkipForward,
  Skull,
  Sparkles,
  Sword,
  Swords,
  Target,
  User,
  Wand2,
  Wind,
  Zap,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

type Race = 'human' | 'dwarf' | 'elf' | 'orc' | 'halfling' | 'dragonborn'
type Class = 'warrior' | 'mage' | 'rogue' | 'paladin' | 'ranger' | 'necromancer'

type StoryStep = {
  id: number
  text: string
  choices: {
    text: string
    effect?: { class?: Class; race?: Race }
    nextStep: number | 'end'
  }[]
}

export function OnboardingForm() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [step, setStep] = useState<'intro' | 'creation'>('intro')
  const [storyIndex, setStoryIndex] = useState(0)

  // Character creation state
  const [name, setName] = useState('')
  const [race, setRace] = useState<Race>('human')
  const [characterClass, setCharacterClass] = useState<Class>('warrior')
  const [isLoading, setIsLoading] = useState(false)

  const classScrollRef = useRef<HTMLDivElement>(null)

  const storySteps: StoryStep[] = [
    {
      id: 0,
      text: 'Probouzíš se v husté mlze. Nevíš, kdo jsi, ani jak jsi se sem dostal. Před sebou vidíš obrysy tří postav. Která z nich tě nejvíce přitahuje?',
      choices: [
        {
          text: 'Postava v těžké zbroji s velkým mečem',
          effect: { class: 'warrior' },
          nextStep: 1,
        },
        {
          text: 'Postava v kápi, kolem které jiskří magie',
          effect: { class: 'mage' },
          nextStep: 1,
        },
        { text: 'Postava ve stínech s dýkami v rukou', effect: { class: 'rogue' }, nextStep: 1 },
      ],
    },
    {
      id: 1,
      text: 'Postava k tobě přistoupí. Cítíš z ní zvláštní energii. Najednou se ozve hlasitý řev z lesa. Jak zareaguješ?',
      choices: [
        {
          text: 'Okamžitě tasíš zbraň a připravíš se k boji',
          effect: { race: 'orc' },
          nextStep: 2,
        },
        {
          text: 'Rychle se schováš a vyhodnotíš situaci',
          effect: { race: 'halfling' },
          nextStep: 2,
        },
        {
          text: 'Využiješ magii k vytvoření ochranné bariéry',
          effect: { race: 'elf' },
          nextStep: 2,
        },
      ],
    },
    {
      id: 2,
      text: 'Z lesa se vyřítí monstrum. Není čas na přemýšlení. Co je tvou největší předností v boji?',
      choices: [
        {
          text: 'Hrubá síla a odolnost',
          effect: { class: 'warrior', race: 'dwarf' },
          nextStep: 'end',
        },
        {
          text: 'Inteligence a znalost magie',
          effect: { class: 'mage', race: 'human' },
          nextStep: 'end',
        },
        { text: 'Rychlost a přesnost', effect: { class: 'ranger', race: 'elf' }, nextStep: 'end' },
      ],
    },
  ]

  const handleStoryChoice = (choice: (typeof storySteps)[0]['choices'][0]) => {
    if (choice.effect?.class) setCharacterClass(choice.effect.class)
    if (choice.effect?.race) setRace(choice.effect.race)

    if (choice.nextStep === 'end') {
      setStep('creation')
    } else {
      setStoryIndex(choice.nextStep)
    }
  }

  const skipTutorial = () => {
    setStep('creation')
  }

  const races = [
    {
      id: 'human' as Race,
      name: 'Člověk',
      icon: User,
      desc: 'Všestranní a adaptabilní bojovníci. Lidé jsou známí svou vyrovnaností ve všech aspektech boje. Mají dobré zdraví, slušné magické schopnosti a vyvážené bojové vlastnosti. Jejich adaptabilita jim umožňuje ovládnout jakýkoliv styl boje.',
      stats: { hp: 100, mana: 80, strength: 10, intelligence: 8, agility: 10, stamina: 10 },
      bonuses: 'Vyvážené statistiky, +10% rychlejší učení',
    },
    {
      id: 'dwarf' as Race,
      name: 'Trpaslík',
      icon: ShieldIcon,
      desc: 'Odolní a silní bojovníci z podzemních hal. Trpaslíci jsou mistři v kovářství a obraně. Jejich robustní těla snesou mnohem více ran než ostatní rasy. Preferují těžkou zbroj a silné zbraně, ale jejich malé nohy jim brání v rychlosti.',
      stats: { hp: 120, mana: 60, strength: 12, intelligence: 5, agility: 7, stamina: 15 },
      bonuses: '+20 HP, +5 Výdrž, +2 Síla, -3 Obratnost',
    },
    {
      id: 'elf' as Race,
      name: 'Elf',
      icon: Zap,
      desc: 'Rychlí a magicky nadaní lesní obyvatelé. Elfové mají vrozenou afinitu k magii a přírodě. Jsou mistři v lukostřelbě a magii živlů. Jejich štíhlé tělo jim dává nepřekonatelnou rychlost, ale jsou křehcí v blízkém boji.',
      stats: { hp: 80, mana: 120, strength: 8, intelligence: 15, agility: 14, stamina: 7 },
      bonuses: '+40 Mana, +7 Inteligence, +4 Obratnost, -20 HP',
    },
    {
      id: 'orc' as Race,
      name: 'Ork',
      icon: Swords,
      desc: 'Brutální síla divočiny. Orkové jsou nejsilnější rasou v blízkém boju. Jejich svaly a zuřivost nemají ve válce konkurenci. Magii považují za slabost a svým těžkopádným pohybům chybí finesa, ale když ork zaútočí, jen málokdo přežije.',
      stats: { hp: 140, mana: 40, strength: 18, intelligence: 3, agility: 6, stamina: 12 },
      bonuses: '+40 HP, +8 Síla, +2 Výdrž, -5 Inteligence',
    },
    {
      id: 'halfling' as Race,
      name: 'Půlčík',
      icon: Target,
      desc: 'Malí, ale obratní a šikovní. Půlčíci jsou mistři ve vyhýbání se útokům a překvapivém úderu ze stínů. Jejich malá postava a přirozená hbitost z nich dělají vynikající zloděje a záškodníky. Co jim chybí na síle, nahrazují lstí.',
      stats: { hp: 90, mana: 70, strength: 9, intelligence: 7, agility: 16, stamina: 8 },
      bonuses: '+6 Obratnost, vyšší šance na únik a kritický zásah',
    },
    {
      id: 'dragonborn' as Race,
      name: 'Dračí rod',
      icon: Sparkles,
      desc: 'Dědicové dračí krve s vyvážených silou. Potomci starověkých draků kombinují sílu, magii i obratnost. Mají vrozenou odolnost vůči magii a schopnost dýchat ohnivým dechem. Jsou vzácní a respektovaní bojovníci.',
      stats: { hp: 110, mana: 100, strength: 13, intelligence: 12, agility: 9, stamina: 11 },
      bonuses: '+10 HP, +20 Mana, +3 Síla, +4 Inteligence, dračí dech',
    },
  ]

  const classes = [
    {
      id: 'warrior' as Class,
      name: 'Válečník',
      icon: Swords,
      desc: 'Mistr blízkého boje a těžké zbroje. Válečníci jsou frontální bojovníci tréninovaní v použití všech zbraní. Zvyšují útok a obranu, což jim umožňuje stát v první linii a přežít i ty nejtvrdší bitvy. Jsou specialisté na fyzický boj.',
      statMod: { strength: +5, stamina: +5, intelligence: 0, agility: 0 },
      bonuses: '+5 Síla, +5 Výdrž, schopnost používat těžké zbroje',
    },
    {
      id: 'paladin' as Class,
      name: 'Paladin',
      icon: ShieldIcon,
      desc: 'Svatý ochránce s magií a obranou. Paladinové kombinují bojové dovednosti s léčivou a ochrannou magií. Jsou neotřesitelní obránci slabých a využívají světelnou magii k oslabení nepřátel. Jejich zbroj září jako znamení naděje.',
      statMod: { strength: +3, stamina: +8, intelligence: +3, agility: -2 },
      bonuses: '+8 Výdrž, +3 Inteligence, +3 Síla, léčivá magie',
    },
    {
      id: 'rogue' as Class,
      name: 'Lotr',
      icon: Target,
      desc: 'Rychlý zabiják ze stínů. Lotři jsou mistři nenápadnosti a kritických úderů. Spoléhají na rychlost a přesnost místo hrubé síly. Jejich speciální schopnosti zahrnují útoky ze zálohy, otrávené zbraně a dovednost odemykat zámky.',
      statMod: { strength: +4, stamina: 0, intelligence: 0, agility: +8 },
      bonuses: '+8 Obratnost, +4 Síla, kritické údery, nenápadnost',
    },
    {
      id: 'mage' as Class,
      name: 'Mág',
      icon: Wand2,
      desc: 'Mistr mystických sil a ničivé magie. Mágové ovládají živelnou magii - oheň, led, blesk. Jejich kouzla dokážou zničit celé skupiny nepřátel. Jsou však fyzicky slabí a musí udržovat odstup od nepřátel. Studiem získávají nová mocnější kouzla.',
      statMod: { strength: 0, stamina: -2, intelligence: +12, agility: +2 },
      bonuses: '+12 Inteligence, +2 Obratnost, ničivá kouzla, -2 Výdrž',
    },
    {
      id: 'ranger' as Class,
      name: 'Hraničář',
      icon: Zap,
      desc: 'Lučištník a stopař divočiny. Hraničáři jsou spojení s přírodou a ovládají boj na dálku. Jejich lukostřelba je smrtící přesná a dokážou stopovat jakoukoliv kořist. Kombinují fyzický útok s přírodní magií a schopností ovládat zvířata.',
      statMod: { strength: +6, stamina: +2, intelligence: 0, agility: +6 },
      bonuses: '+6 Síla, +6 Obratnost, +2 Výdrž, boj na dálku',
    },
    {
      id: 'necromancer' as Class,
      name: 'Nekromant',
      icon: Skull,
      desc: 'Temný kouzelník ovládající smrt. Nekromanti manipulují se smrtí a nemrtvými. Dokážou oživovat mrtvoly jako své služebníky a vysávat životní sílu z nepřátel. Jejich temná magie je mocná, ale společnost je často odsuzuje. Ovládají kletby a stínovou magii.',
      statMod: { strength: 0, stamina: 0, intelligence: +10, agility: +3 },
      bonuses: '+10 Inteligence, +3 Obratnost, oživování nemrtvých, vysávání života',
    },
  ]

  const selectedClass = classes.find((c) => c.id === characterClass)!
  const selectedRace = races.find((r) => r.id === race)!

  // Calculate final stats
  const finalStats = {
    hp: selectedRace.stats.hp,
    hpMax: selectedRace.stats.hp,
    mana: selectedRace.stats.mana,
    manaMax: selectedRace.stats.mana,
    strength: selectedRace.stats.strength + selectedClass.statMod.strength,
    intelligence: selectedRace.stats.intelligence + selectedClass.statMod.intelligence,
    agility: selectedRace.stats.agility + selectedClass.statMod.agility,
    stamina: selectedRace.stats.stamina + selectedClass.statMod.stamina,
  }

  const randomizeCharacter = () => {
    const randomRace = races[Math.floor(Math.random() * races.length)]
    const randomClass = classes[Math.floor(Math.random() * classes.length)]
    const randomNames = [
      'Aragorn',
      'Theron',
      'Kael',
      'Lyra',
      'Gorath',
      'Finnick',
      'Valdor',
      'Zara',
      'Borin',
      'Elara',
    ]
    if (randomRace) setRace(randomRace.id)
    if (randomClass) setCharacterClass(randomClass.id)
    setName(randomNames[Math.floor(Math.random() * randomNames.length)] || 'Hero')
  }

  const handleStart = async () => {
    if (!name.trim() || isLoading) return

    setIsLoading(true)
    try {
      // Create character in database
      const response = await fetch('/api/character/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          race: race.toUpperCase(),
          class: characterClass.toUpperCase(),
          stats: finalStats,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        showNotification({
          variant: 'error',
          title: 'Chyba vytváření postavy',
          description: error.error || 'Nepodařilo se vytvořit postavu',
        })
        setIsLoading(false)
        return
      }

      showNotification({
        variant: 'success',
        title: 'Postava vytvořena!',
        description: `Vítej v zemi Machala, ${name}!`,
      })

      // Small delay to show notification
      setTimeout(() => {
        router.push('/game')
      }, 500)
    } catch (error) {
      console.error('Character creation error:', error)
      showNotification({
        variant: 'error',
        title: 'Chyba',
        description: 'Došlo k chybě při vytváření postavy',
      })
      setIsLoading(false)
    }
  }

  // Intro Screen
  if (step === 'intro') {
    const currentStory = storySteps[storyIndex]

    if (!currentStory) {
      return null
    }

    return (
      <div
        className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#0a0806]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets//locations/city-background.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black/95"></div>
        </div>

        {/* Story Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-4">
          <div className="animate-in fade-in w-full max-w-2xl space-y-8 text-center duration-700">
            <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#ffd700]" />

            <h1
              className="text-xl leading-relaxed text-[#d4a574] italic sm:text-2xl"
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              &quot;{currentStory.text}&quot;
            </h1>

            <div className="mt-8 space-y-3">
              {currentStory.choices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStoryChoice(choice)}
                  disabled={isLoading}
                  className="group w-full transform rounded-lg border border-[#8b6f47] bg-black/60 p-3 text-xs text-[#f5e6d3] transition-all hover:scale-[1.02] hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] disabled:cursor-not-allowed disabled:opacity-50 sm:p-4 sm:text-sm md:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#8b6f47] text-xs text-[#8b7355] group-hover:border-[#ffd700] group-hover:text-[#ffd700]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {choice.text}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={skipTutorial}
              className="mx-auto mt-8 flex items-center justify-center gap-2 text-xs text-[#8b7355] transition-colors hover:text-[#ffd700] sm:text-sm"
            >
              <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
              Přeskočit úvod (Jsem zkušený hráč)
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Character Creation Screen
  return (
    <RouteTransition>
      <div
        className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#0a0806]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/locations/city-background.jpg)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90"></div>
        </div>

        {/* Content */}
        <div className="scrollbar-custom relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto p-2 sm:p-4">
          <div className="my-auto w-full max-w-4xl py-4 sm:py-8">
            {/* Title */}
            <div className="mb-3 text-center sm:mb-6">
              <h1
                className="mb-1 text-xl text-[#ffd700] sm:text-3xl lg:text-4xl"
                style={{
                  fontFamily: 'var(--font-medieval)',
                  textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
                }}
              >
                Vytvoř svého hrdinu
              </h1>
              <p className="text-xs text-[#d4a574] sm:text-sm lg:text-base">
                Tvá legenda začíná v zemi Machala
              </p>
            </div>

            <div className="mb-3 grid gap-2 sm:mb-4 sm:gap-4 lg:grid-cols-3">
              {/* Left: Name + Random */}
              <div className="space-y-2 sm:space-y-4">
                {/* Name Input */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-black/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
                  <label
                    className="mb-2 block text-center text-base text-[#ffd700] sm:mb-3 sm:text-xl"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Jméno hrdiny
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Zadej jméno..."
                    className="w-full rounded-lg border-2 border-[#8b6f47] bg-black/60 px-3 py-2 text-center text-base text-[#ffd700] transition-colors placeholder:text-[#8b7355] focus:border-[#ffd700] focus:outline-none sm:px-4 sm:py-3 sm:text-lg"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  />
                </div>

                {/* Random Generator */}
                <button
                  onClick={randomizeCharacter}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#8b6f47] bg-black/60 px-3 py-2.5 text-center text-sm text-[#d4a574] transition-all hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700] sm:px-4 sm:py-3"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  <Dices className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base">Náhodná postava</span>
                </button>

                {/* Stats Preview */}
                <div className="rounded-lg border-2 border-[#d4a574] bg-black/90 p-3 shadow-2xl backdrop-blur-md sm:p-4">
                  <h3
                    className="mb-2 text-center text-sm text-[#ffd700] sm:mb-3 sm:text-base"
                    style={{ fontFamily: 'var(--font-fantasy)' }}
                  >
                    Tvé statistiky
                  </h3>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:flex sm:flex-col sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Heart className="h-3 w-3 text-[#ff6b6b] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#ff6b6b] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          HP
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#ff6b6b] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.hp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Droplet className="h-3 w-3 text-[#69ccf0] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#69ccf0] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          Mana
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#69ccf0] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.mana}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Sword className="h-3 w-3 text-[#ff6b6b] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#d4a574] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          Síla
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#ffd700] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.strength}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Brain className="h-3 w-3 text-[#c084fc] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#d4a574] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          Inteligence
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#ffd700] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.intelligence}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Wind className="h-3 w-3 text-[#ffd700] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#d4a574] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          Obratnost
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#ffd700] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.agility}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Activity className="h-3 w-3 text-[#69ccf0] sm:h-4 sm:w-4" />
                        <span
                          className="text-[10px] text-[#d4a574] sm:text-xs"
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          Výdrž
                        </span>
                      </div>
                      <span
                        className="text-xs text-[#ffd700] sm:text-sm"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {finalStats.stamina}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle: Race */}
              <div className="flex h-full min-h-0 flex-col rounded-lg border border-[#d4a574] bg-black/80 p-3 backdrop-blur-sm sm:p-4">
                <h3
                  className="mb-2 flex-shrink-0 text-center text-sm text-[#ffd700] sm:mb-3 sm:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vyber svou rasu
                </h3>
                <div className="mb-2 grid flex-shrink-0 grid-cols-3 gap-1.5 sm:mb-3 sm:gap-2">
                  {races.map((r) => {
                    const Icon = r.icon
                    return (
                      <button
                        key={r.id}
                        onClick={() => setRace(r.id)}
                        className={`flex h-[60px] flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:h-[70px] sm:gap-1 sm:p-3 ${
                          race === r.id
                            ? 'scale-105 border-[#ffd700] bg-gradient-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                            : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${race === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                        />
                        <span
                          className={`text-[10px] sm:text-xs ${race === r.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {r.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="scrollbar-custom relative min-h-0 flex-1 overflow-y-auto rounded border border-[#8b6f47] bg-black/60 p-2 sm:p-3">
                  <p className="mb-2 text-[10px] leading-relaxed text-[#d4a574] sm:text-xs">
                    {selectedRace.desc}
                  </p>

                  {/* Race Stats */}
                  <div className="mt-2 border-t border-[#8b6f47]/30 pt-2">
                    <p
                      className="mb-1.5 text-[10px] text-[#ffd700]"
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      Bonusy rasy:
                    </p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] sm:text-[10px]">
                      <div className="flex items-center gap-1">
                        <Heart className="h-2.5 w-2.5 text-[#ff6b6b]" />
                        <span className="text-[#d4a574]">{selectedRace.stats.hp} HP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Droplet className="h-2.5 w-2.5 text-[#69ccf0]" />
                        <span className="text-[#d4a574]">{selectedRace.stats.mana} MP</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sword className="h-2.5 w-2.5 text-[#ff6b6b]" />
                        <span className="text-[#d4a574]">{selectedRace.stats.strength} Síla</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Brain className="h-2.5 w-2.5 text-[#c084fc]" />
                        <span className="text-[#d4a574]">
                          {selectedRace.stats.intelligence} Intel.
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="h-2.5 w-2.5 text-[#ffd700]" />
                        <span className="text-[#d4a574]">{selectedRace.stats.agility} Obrat.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-2.5 w-2.5 text-[#69ccf0]" />
                        <span className="text-[#d4a574]">{selectedRace.stats.stamina} Výdrž</span>
                      </div>
                    </div>
                    <p className="mt-2 text-[9px] text-[#8b7355] italic sm:text-[10px]">
                      {selectedRace.bonuses}
                    </p>
                  </div>
                  {/* Scroll hint gradient */}
                  <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 rounded-b bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>

              {/* Right: Class */}
              <div className="flex h-full min-h-0 flex-col rounded-lg border border-[#d4a574] bg-black/80 p-3 backdrop-blur-sm sm:p-4">
                <h3
                  className="mb-2 flex-shrink-0 text-center text-sm text-[#ffd700] sm:mb-3 sm:text-base"
                  style={{ fontFamily: 'var(--font-fantasy)' }}
                >
                  Vyber své povolání
                </h3>
                <div className="mb-2 grid flex-shrink-0 grid-cols-3 gap-1.5 sm:mb-3 sm:gap-2">
                  {classes.map((c) => {
                    const Icon = c.icon
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCharacterClass(c.id)}
                        className={`flex min-h-[60px] flex-col items-center justify-center gap-0.5 rounded-lg border-2 p-2 transition-all sm:min-h-[70px] sm:gap-1 sm:p-3 ${
                          characterClass === c.id
                            ? 'scale-105 border-[#ffd700] bg-gradient-to-br from-[#8b6f47] to-[#6d5a3e] shadow-lg'
                            : 'border-[#8b6f47]/50 bg-black/40 hover:scale-105 hover:border-[#ffd700]'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${characterClass === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                        />
                        <span
                          className={`text-[10px] sm:text-xs ${characterClass === c.id ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                          style={{ fontFamily: 'var(--font-fantasy)' }}
                        >
                          {c.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="relative min-h-0 flex-1 overflow-hidden rounded border border-[#8b6f47] bg-black/60">
                  <ScrollIndicator targetRef={classScrollRef} position="both" />
                  <div
                    ref={classScrollRef}
                    className="scrollbar-custom h-full max-h-[252px] overflow-y-auto p-2 sm:p-3"
                  >
                    <p className="mb-2 text-[10px] leading-relaxed text-[#d4a574] sm:text-xs">
                      {selectedClass.desc}
                    </p>

                    {/* Class Type Badge */}
                    <div className="mb-2">
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[9px] sm:text-[10px] ${
                          ['mage', 'necromancer'].includes(selectedClass.id)
                            ? 'border-[#c084fc] bg-[#c084fc]/20 text-[#c084fc]'
                            : ['warrior', 'paladin'].includes(selectedClass.id)
                              ? 'border-[#ff6b6b] bg-[#ff6b6b]/20 text-[#ff6b6b]'
                              : 'border-[#ffd700] bg-[#ffd700]/20 text-[#ffd700]'
                        }`}
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        {['mage', 'necromancer'].includes(selectedClass.id)
                          ? 'Kouzlící'
                          : ['warrior', 'paladin'].includes(selectedClass.id)
                            ? 'Tank'
                            : 'Hybrid'}
                      </span>
                    </div>

                    {/* Class Stat Modifiers with bars */}
                    <div className="mt-2 space-y-1.5 border-t border-[#8b6f47]/30 pt-2">
                      <p
                        className="mb-1 text-[10px] text-[#ffd700]"
                        style={{ fontFamily: 'var(--font-fantasy)' }}
                      >
                        Bonusy povolání:
                      </p>

                      {/* Strength */}
                      {selectedClass.statMod.strength !== 0 && (
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                            <div className="flex items-center gap-1">
                              <Sword className="h-2.5 w-2.5 text-[#ff6b6b]" />
                              <span className="text-[#d4a574]">Síla</span>
                            </div>
                            <span
                              className={
                                selectedClass.statMod.strength > 0
                                  ? 'text-[#6fbf6f]'
                                  : 'text-[#ff6b6b]'
                              }
                            >
                              {selectedClass.statMod.strength > 0 ? '+' : ''}
                              {selectedClass.statMod.strength}
                            </span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-black/60">
                            <div
                              className={`h-full ${selectedClass.statMod.strength > 0 ? 'bg-[#6fbf6f]' : 'bg-[#ff6b6b]'}`}
                              style={{
                                width: `${Math.abs(selectedClass.statMod.strength) * 8}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Intelligence */}
                      {selectedClass.statMod.intelligence !== 0 && (
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                            <div className="flex items-center gap-1">
                              <Brain className="h-2.5 w-2.5 text-[#c084fc]" />
                              <span className="text-[#d4a574]">Inteligence</span>
                            </div>
                            <span
                              className={
                                selectedClass.statMod.intelligence > 0
                                  ? 'text-[#6fbf6f]'
                                  : 'text-[#ff6b6b]'
                              }
                            >
                              {selectedClass.statMod.intelligence > 0 ? '+' : ''}
                              {selectedClass.statMod.intelligence}
                            </span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-black/60">
                            <div
                              className={`h-full ${selectedClass.statMod.intelligence > 0 ? 'bg-[#6fbf6f]' : 'bg-[#ff6b6b]'}`}
                              style={{
                                width: `${Math.abs(selectedClass.statMod.intelligence) * 8}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Agility */}
                      {selectedClass.statMod.agility !== 0 && (
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                            <div className="flex items-center gap-1">
                              <Wind className="h-2.5 w-2.5 text-[#ffd700]" />
                              <span className="text-[#d4a574]">Obratnost</span>
                            </div>
                            <span
                              className={
                                selectedClass.statMod.agility > 0
                                  ? 'text-[#6fbf6f]'
                                  : 'text-[#ff6b6b]'
                              }
                            >
                              {selectedClass.statMod.agility > 0 ? '+' : ''}
                              {selectedClass.statMod.agility}
                            </span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-black/60">
                            <div
                              className={`h-full ${selectedClass.statMod.agility > 0 ? 'bg-[#6fbf6f]' : 'bg-[#ff6b6b]'}`}
                              style={{
                                width: `${Math.abs(selectedClass.statMod.agility) * 8}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Stamina */}
                      {selectedClass.statMod.stamina !== 0 && (
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                            <div className="flex items-center gap-1">
                              <Activity className="h-2.5 w-2.5 text-[#69ccf0]" />
                              <span className="text-[#d4a574]">Výdrž</span>
                            </div>
                            <span
                              className={
                                selectedClass.statMod.stamina > 0
                                  ? 'text-[#6fbf6f]'
                                  : 'text-[#ff6b6b]'
                              }
                            >
                              {selectedClass.statMod.stamina > 0 ? '+' : ''}
                              {selectedClass.statMod.stamina}
                            </span>
                          </div>
                          <div className="h-1 overflow-hidden rounded-full bg-black/60">
                            <div
                              className={`h-full ${selectedClass.statMod.stamina > 0 ? 'bg-[#6fbf6f]' : 'bg-[#ff6b6b]'}`}
                              style={{
                                width: `${Math.abs(selectedClass.statMod.stamina) * 8}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Scroll hint gradient */}
                  <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 rounded-b bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStart}
              disabled={!name.trim() || isLoading}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border py-3 transition-all sm:gap-3 sm:py-4 ${
                name.trim() && !isLoading
                  ? 'cursor-pointer border-[#8b6f47] bg-black/60 text-[#d4a574] hover:border-[#ffd700] hover:bg-[#8b6f47]/20 hover:text-[#ffd700]'
                  : 'cursor-not-allowed border-[#8b6f47] bg-black/80 text-[#8b7355] opacity-50'
              }`}
              style={{ fontFamily: 'var(--font-fantasy)' }}
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#ffd700] border-t-transparent sm:h-6 sm:w-6" />
                  <span className="text-sm sm:text-base md:text-lg">
                    Vytvářím hrdinu...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-sm sm:text-base md:text-lg">
                    Vstoupit do hry
                  </span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </RouteTransition>
  )
}
