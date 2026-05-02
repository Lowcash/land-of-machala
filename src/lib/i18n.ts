import { routing } from '@/i18n/routing'

import csMessages from '../../messages/cs.json'
import enMessages from '../../messages/en.json'

const messagesByLocale = {
  cs: csMessages,
  en: enMessages,
} as const

export { routing }

export function getMessages(locale: keyof typeof messagesByLocale = routing.defaultLocale) {
  return messagesByLocale[locale]
}
