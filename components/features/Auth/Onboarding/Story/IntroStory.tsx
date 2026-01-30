import Link from 'next/link'

import { BookOpen, SkipForward } from 'lucide-react'

import { storySteps } from '@/lib/game/onboarding'

import { Button } from '@/components/ui/button'

import { Layout } from '../../Shared/Layout'

interface IntroStoryProps {
  storyIndex: number
}

export function IntroStory({ storyIndex }: IntroStoryProps) {
  const currentStory = storySteps[storyIndex]

  if (!currentStory) return null

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="animate-in fade-in w-full max-w-2xl space-y-8 text-center duration-700">
        <BookOpen className="mx-auto mb-4 h-12 w-12 text-[#ffd700]" />

        <div className="flex min-h-32 flex-col justify-center sm:min-h-28">
          <h1
            className="text-xl leading-relaxed text-[#d4a574] italic sm:text-2xl"
            style={{ fontFamily: 'var(--font-fantasy)' }}
          >
            &quot;{currentStory.text}&quot;
          </h1>
        </div>

        <div className="mt-8 space-y-3">
          {currentStory.choices.map((choice, idx) => {
            const nextParams = new URLSearchParams()
            if (choice.nextStep === 'end') {
              nextParams.set('step', '1') // Step 1 = character creation
            } else {
              nextParams.set('story', choice.nextStep.toString())
            }

            if (choice.effect?.race) nextParams.set('race', choice.effect.race)
            if (choice.effect?.class) nextParams.set('class', choice.effect.class)

            return (
              <Button
                key={idx}
                asChild
                variant="game-choice"
                className="w-full justify-center text-xs sm:text-sm md:text-base"
              >
                <Link href={`?${nextParams.toString()}`}>
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#8b6f47] text-xs text-[#8b7355] group-hover:border-[#ffd700] group-hover:text-[#ffd700]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{choice.text}</span>
                  </span>
                </Link>
              </Button>
            )
          })}
        </div>

        <Button
          asChild
          variant="game-link-subtle"
          className="mx-auto mt-8 flex w-fit items-center justify-center gap-2 text-xs sm:text-sm"
        >
          <Link href="?step=1">
            <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
            Přeskočit úvod (Jsem zkušený hráč)
          </Link>
        </Button>
      </div>
    </Layout>
  )
}
