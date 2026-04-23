import type { MetadataRoute } from 'next'

import {
  SITE_APP_NAME,
  SITE_LANGUAGE,
  SITE_SHORT_NAME,
  SITE_THEME_COLOR,
  SITE_WEB_APP_DESCRIPTION,
} from '@/lib/site-config'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_APP_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_WEB_APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: SITE_THEME_COLOR,
    theme_color: SITE_THEME_COLOR,
    lang: SITE_LANGUAGE,
    categories: ['games', 'entertainment'],
  }
}
