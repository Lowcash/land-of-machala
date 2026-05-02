import { routing } from '@/i18n/routing'
import { getRequestConfig } from 'next-intl/server'

import { getMessages } from '@/lib/i18n'

export default getRequestConfig(async () => ({
  locale: routing.defaultLocale,
  messages: getMessages(routing.defaultLocale),
}))
