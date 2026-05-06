import { Fragment } from 'react'

import { SITE_FOOTER_LABEL, SITE_FOOTER_LINKS } from '@/lib/site-config'

import { Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { RootShellFrame } from '@/components/ui/prefabs/layout/root-shell-frame'

const FOOTER_LINK_CLASS = 'hover:text-primary cursor-pointer transition-colors'

const FOOTER_NAV_CLASS =
  'font-label text-on-surface-variant/80 flex flex-wrap items-center justify-center tracking-[0.24em] uppercase'

export function RootShellFooter() {
  return (
    <RootShellFrame as="footer">
      <Stack align="center">
        <BodyText align="center" italic tone="muted">
          {SITE_FOOTER_LABEL}
        </BodyText>
        <nav className={FOOTER_NAV_CLASS}>
          {SITE_FOOTER_LINKS.map((link, index) => (
            <Fragment key={link}>
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <button aria-disabled="true" className={FOOTER_LINK_CLASS} type="button">
                {link}
              </button>
            </Fragment>
          ))}
        </nav>
      </Stack>
    </RootShellFrame>
  )
}
