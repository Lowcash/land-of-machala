import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all public app routes while excluding APIs, framework internals, and static assets.
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
}
