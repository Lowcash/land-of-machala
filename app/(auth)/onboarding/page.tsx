import { OnboardingForm } from '@/components/features/Auth/OnboardingForm'
import { getMyCharacterAction } from '@/lib/actions/character'
import { redirect } from 'next/navigation'

export default async function OnboardingPage() {
  const [result] = await getMyCharacterAction()

  if (result?.character) {
    redirect('/game')
  }

  return <OnboardingForm />
}
