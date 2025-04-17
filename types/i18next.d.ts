import 'i18next'
import { resources, defaultNS } from '@/lib/i18n'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['cs']
    returnNull: false
  }
}
