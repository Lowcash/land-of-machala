import { z } from 'zod'

export const onboardingParamsSchema = z.object({
  step: z.coerce.number().int().min(0).max(3).default(0),
  story: z.coerce.number().int().min(0).default(0),
  race: z.string().optional(),
  class: z.string().optional(),
})

export type OnboardingParams = z.infer<typeof onboardingParamsSchema>

export function parseOnboardingParams(searchParams: {
  [key: string]: string | string[] | undefined
}): OnboardingParams {
  // Handle case where searchParams might be null/undefined in some contexts
  const params = searchParams || {}

  // Create a clean object for parsing
  const raw: Record<string, string | undefined> = {}

  if (params.step && !Array.isArray(params.step)) raw.step = params.step
  if (params.story && !Array.isArray(params.story)) raw.story = params.story
  if (params.race && !Array.isArray(params.race)) raw.race = params.race
  if (params.class && !Array.isArray(params.class)) raw.class = params.class

  const result = onboardingParamsSchema.safeParse(raw)

  if (!result.success) {
    // Return defaults if parsing fails
    return { step: 0, story: 0, race: undefined, class: undefined }
  }

  return result.data
}
