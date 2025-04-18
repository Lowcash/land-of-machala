import i18n from 'i18next'

import csTranslation from '@/locales/cs.json'

export const resources = {
  cs: {
    translation: csTranslation,
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
