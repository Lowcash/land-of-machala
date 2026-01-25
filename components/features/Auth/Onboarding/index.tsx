'use client'

import { useNotification } from '@/components/providers/NotificationProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCharacterAction } from '@/lib/actions/character'
import type { Class, Race, StoryStep } from '@/lib/game/onboarding-data'
import { RANDOM_NAMES, classes, races } from '@/lib/game/onboarding-data'
import type { CharacterClass, CharacterRace } from '@prisma/client'
import * as Accordion from '@radix-ui/react-accordion'
import { Dices } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Layout } from '../Shared/Layout'
import { ClassSelector } from './Creation/ClassSelector'
import { RaceSelector } from './Creation/RaceSelector'
import { StatsDisplay } from './Creation/StatsDisplay'
import { IntroStory } from './Story/IntroStory'

export function Onboarding() {
  const router = useRouter()
  const { showNotification } = useNotification()
  const [step, setStep] = useState<'intro' | 'creation'>('intro')
  const [storyIndex, setStoryIndex] = useState(0)

  // Character creation state
  const [name, setName] = useState('')
  const [race, setRace] = useState<Race>('human')
  const [characterClass, setCharacterClass] = useState<Class>('warrior')
  const [isLoading, setIsLoading] = useState(false)

  const handleStoryChoice = (choice: StoryStep['choices'][0]) => {
    if (choice.effect?.class) setCharacterClass(choice.effect.class)
    if (choice.effect?.race) setRace(choice.effect.race)

    if (choice.nextStep === 'end') {
      setStep('creation')
    } else {
      setStoryIndex(choice.nextStep)
    }
  }

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

    if (randomRace) setRace(randomRace.id)
    if (randomClass) setCharacterClass(randomClass.id)
    setName(RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)] || 'Hero')
  }

  const handleStart = async () => {
    if (!name.trim() || isLoading) return

    setIsLoading(true)
    try {
      const [, err] = await createCharacterAction({
        name: name.trim(),
        race: race.toUpperCase() as CharacterRace,
        class: characterClass.toUpperCase() as CharacterClass,
      })

      if (err) {
        showNotification({
          variant: 'error',
          title: 'Chyba vytváření postavy',
          description: err.message || 'Nepodařilo se vytvořit postavu',
        })
        setIsLoading(false)
        return
      }

      showNotification({
        variant: 'success',
        title: 'Postava vytvořena!',
        description: `Vítej v zemi Machala, ${name}!`,
      })

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

  if (step === 'intro') {
    return (
      <IntroStory
        storyIndex={storyIndex}
        onChoice={handleStoryChoice}
        onSkip={() => setStep('creation')}
        isLoading={isLoading}
      />
    )
  }

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg" centered={false}>
      <div className="scrollbar-custom relative z-10 flex min-h-0 flex-1 flex-col items-center overflow-y-auto p-2 sm:p-4">
        <div className="my-auto w-full max-w-6xl py-4 sm:py-8">
          <div className="mb-6 text-center">
            <h1
              className="text-game-gold mb-1 text-2xl sm:text-4xl lg:text-5xl"
              style={{
                fontFamily: 'var(--font-medieval)',
                textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
              }}
            >
              Vytvoř svého hrdinu
            </h1>
            <p className="text-game-gold-muted text-sm sm:text-base">
              Tvá legenda začíná v zemi Machala
            </p>
          </div>

          {/* Main Selection Area */}
          <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Form & Stats (3 cols) */}
            <div className="space-y-4 lg:col-span-3">
              <Card className="border-game-gold-muted border-2">
                <CardContent className="p-4 sm:p-6">
                  <Label className="text-game-gold font-fantasy mb-3 block text-center text-xl">
                    Jméno hrdiny
                  </Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Zadej jméno..."
                    className="border-game-copper text-game-gold placeholder:text-game-copper-muted focus:border-game-gold font-fantasy w-full rounded-lg border-2 bg-black/60 px-4 py-3 text-center text-lg transition-colors focus:outline-none"
                  />
                  <Button
                    variant="game-secondary"
                    onClick={randomizeCharacter}
                    className="border-game-copper text-game-gold-muted hover:border-game-gold hover:bg-game-copper/20 hover:text-game-gold font-fantasy mt-4 flex h-auto w-full items-center justify-center gap-2 rounded-lg border bg-black/60 py-3 transition-all"
                  >
                    <Dices className="h-5 w-5" />
                    <span>Náhodná postava</span>
                  </Button>
                </CardContent>
              </Card>

              <StatsDisplay stats={finalStats} />

              <Button
                variant="game-primary"
                onClick={handleStart}
                disabled={!name.trim() || isLoading}
                className="border-game-gold bg-game-gold hover:bg-game-gold w-full rounded-lg border-2 py-4 text-xl font-bold text-black shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                style={{ fontFamily: 'var(--font-medieval)' }}
              >
                {isLoading ? 'Vstupuji do světa...' : 'Začít dobrodružství'}
              </Button>
            </div>

            {/* Center Column: Race (4 or 5 cols) */}
            <div className="lg:col-span-4 lg:hidden">
              <Accordion.Root type="single" collapsible defaultValue="race">
                <RaceSelector
                  selectedId={race}
                  onSelect={(id) => setRace(id as Race)}
                  isMobile={true}
                />
                <div className="h-2" />
                <ClassSelector
                  selectedId={characterClass}
                  onSelect={(id) => setCharacterClass(id as Class)}
                  isMobile={true}
                />
              </Accordion.Root>
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <RaceSelector selectedId={race} onSelect={(id) => setRace(id as Race)} />
            </div>

            {/* Right Column: Class (5 cols) */}
            <div className="hidden lg:col-span-5 lg:block">
              <ClassSelector
                selectedId={characterClass}
                onSelect={(id) => setCharacterClass(id as Class)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
