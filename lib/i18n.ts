import i18next from 'i18next'

import csTranslation from '@/locales/cs.json'

export const resources = {
  cs: {
    translation: csTranslation,
  },
} as const

i18next.init({
  lng: 'cs',
  // fallbackLng: 'en',
  resources,
  interpolation: {
    escapeValue: false,
  },
})

export default i18next
