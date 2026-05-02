type ResolveFieldIdOptions = {
  explicitId?: string
  fallbackSeed?: string
  generatedId: string
  prefix: string
}

const NON_ALPHANUMERIC = /[^a-z0-9]+/g

function toIdSlug(seed: string) {
  return seed
    .toLowerCase()
    .trim()
    .replace(NON_ALPHANUMERIC, '-')
    .replace(/^-+|-+$/g, '')
}

export function resolveFieldId({
  explicitId,
  fallbackSeed,
  generatedId,
  prefix,
}: ResolveFieldIdOptions) {
  if (explicitId) {
    return explicitId
  }

  if (fallbackSeed) {
    const slug = toIdSlug(fallbackSeed)

    if (slug) {
      return slug
    }
  }

  const normalizedGeneratedId = generatedId.replace(/[:]/g, '-')

  return `${prefix}-${normalizedGeneratedId}`
}
