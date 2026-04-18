import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['cs', 'en'],

  // Used when no locale matches
  defaultLocale: 'cs',

  // Public URLs stay unprefixed; locale is resolved through middleware and cookie state.
  localePrefix: 'never',

  localeCookie: {
    name: 'LAND_OF_MACHALA_LOCALE',
    maxAge: 60 * 60 * 24 * 365,
  },

  alternateLinks: false,
})

// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
