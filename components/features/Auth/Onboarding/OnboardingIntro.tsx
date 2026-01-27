import { IntroStory } from './Story/IntroStory'

interface OnboardingIntroProps {
  storyIndex: number
}

export function OnboardingIntro({ storyIndex }: OnboardingIntroProps) {
  return <IntroStory storyIndex={storyIndex} />
}
