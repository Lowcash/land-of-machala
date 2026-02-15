/**
 * Constants for character name generation.
 */

export const NAME_PREFIXES = [
  'Eldar',
  'Thorn',
  'Grom',
  'Aria',
  'Kael',
  'Luna',
  'Brak',
  'Morg',
  'Fay',
  'Zorn',
]

export const NAME_SUFFIXES = ['ion', 'ia', 'osh', 'is', 'en', 'os', 'ar', 'eth', 'um', 'ax']

/**
 * Generates a random fantasy character name.
 */
export function generateRandomName(): string {
  const prefix = NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)]
  const suffix = NAME_SUFFIXES[Math.floor(Math.random() * NAME_SUFFIXES.length)]
  return `${prefix}${suffix}`
}
