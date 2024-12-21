import cz from './cz.json'

export const loc = cz

export function tl(text: string, params?: Array<string>) {
  if (!params) return text

  for (let i = 0; i < params.length; i++) {
    text = text.replace(new RegExp(`{([${i}])}`, 'g'), params?.[i] ?? '')
  }

  return text
}
