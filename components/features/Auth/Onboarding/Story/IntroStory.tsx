import { BookOpen, SkipForward } from 'lucide-react'

import { storySteps } from '@/lib/game/onboarding'

import { Button } from '@/components/ui/button'
import { HStack, VStack } from '@/components/ui/stack'
import { GoldTitle } from '@/components/ui/typography'

import { Layout } from '../../Shared/Layout'

interface IntroStoryProps {
  storyIndex: number
}

export function IntroStory({ storyIndex }: IntroStoryProps) {
  const currentStory = storySteps[storyIndex]

  if (!currentStory) return null

  return (
    <Layout backgroundImage="/assets/locations/city-background.jpg">
      <VStack
        _internalClassName="animate-in fade-in max-w-2xl duration-700"
        align="center"
        gap="xl"
        fullWidth
      >
        <VStack>
          <BookOpen className="text-game-gold h-12 w-12" />
        </VStack>

        <VStack _internalClassName="min-h-[7rem]" justify="center" align="center" fullWidth>
          <VStack _internalClassName="text-xl sm:text-2xl" fullWidth>
            <GoldTitle italic align="center">
              &quot;{currentStory.text}&quot;
            </GoldTitle>
          </VStack>
        </VStack>

        <VStack gap="sm" fullWidth>
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
                variant="choice"
                fullWidth
                indicator={String.fromCharCode(65 + idx)}
                label={choice.text}
                href={`?${nextParams.toString()}`}
              />
            )
          })}
        </VStack>

        <HStack justify="center" fullWidth>
          <Button
            variant="link_game"
            icon={SkipForward}
            label="Přeskočit úvod (Jsem zkušený hráč)"
            href="?step=1"
          />
        </HStack>
      </VStack>
    </Layout>
  )
}
