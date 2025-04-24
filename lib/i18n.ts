// import 'server-only' // TODO allow when all server side translates ready (schemas missing)

import i18n from 'i18next'

import cs from '@/locales/cs.json'

export const resources = {
  cs: {
    translation: cs,
  },
} as const

i18n.init({
  lng: 'cs',
  // fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
