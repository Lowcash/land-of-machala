'use client'

import { Button } from '@/components/ui/button'
import type { StoryStep } from '@/lib/game/onboarding-data'
import { storySteps } from '@/lib/game/onboarding-data'
import { cn } from '@/lib/utils'
import { BookOpen, SkipForward } from 'lucide-react'
import { Layout } from '../../Shared/Layout'

interface IntroStoryProps {
  storyIndex: number
  onChoice: (choice: StoryStep['choices'][0]) => void
  onSkip: () => void
  isLoading?: boolean
}

export function IntroStory({ storyIndex, onChoice, onSkip, isLoading }: IntroStoryProps) {
  const currentStory = storySteps[storyIndex]

  if (!currentStory) return null

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <div className="animate-in fade-in w-full max-w-2xl space-y-8 text-center duration-700">
        <BookOpen className="text-game-gold mx-auto mb-4 h-12 w-12" />

        <div className="flex min-h-32 flex-col justify-center sm:min-h-28">
          <h1 className="text-game-gold-muted font-fantasy text-xl leading-relaxed italic sm:text-2xl">
            &quot;{currentStory.text}&quot;
          </h1>
        </div>

        <div className="mt-8 space-y-3">
          {currentStory.choices.map((choice, idx) => (
            <Button
              key={idx}
              onClick={() => onChoice(choice)}
              disabled={isLoading}
              variant="ghost"
              className={cn(
                'group border-game-copper hover:border-game-gold hover:bg-game-copper/20 hover:text-game-gold',
                'font-fantasy min-h-16 w-full rounded-lg border bg-black/60 p-3 text-xs text-[#f5e6d3]',
                'transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50',
                'sm:p-4 sm:text-sm md:text-base'
              )}
            >
              <span className="flex items-center justify-center gap-3">
                <span className="border-game-copper text-game-copper-muted group-hover:border-game-gold group-hover:text-game-gold flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{choice.text}</span>
              </span>
            </Button>
          ))}
        </div>

        <Button
          onClick={onSkip}
          variant="ghost"
          className="text-game-copper-muted hover:text-game-gold mx-auto mt-8 flex items-center justify-center gap-2 text-xs transition-colors sm:text-sm"
        >
          <SkipForward className="h-3 w-3 sm:h-4 sm:w-4" />
          Přeskočit úvod (Jsem zkušený hráč)
        </Button>
      </div>
    </Layout>
  )
}
