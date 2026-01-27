import { Onboarding } from '@/components/features/Auth/Onboarding'

export const metadata = {
  title: 'Vytvoření postavy | Land of Machala',
  description: 'Vytvoř svého hrdinu a vstup do světa Machala.',
}

export default async function OnboardingPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  return <Onboarding searchParams={searchParams} />
}
