import { Fragment } from 'react'

import { SITE_FOOTER_LABEL, SITE_FOOTER_LINKS } from '@/lib/site-config'

import { Stack } from '@/components/ui/core/layout'
import { BodyText, TEXT_TRACKING_CLASS } from '@/components/ui/core/typography'
import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'

const FOOTER_LINK_CLASS = 'hover:text-primary cursor-pointer transition-colors'
const FOOTER_LABEL_CLASS = 'text-[var(--font-size-body-sm)]'

const FOOTER_NAV_CLASS = `font-interface text-[var(--font-size-label-meta)] text-on-surface-variant/80 flex flex-wrap items-center justify-center ${TEXT_TRACKING_CLASS.wordmark} uppercase`

export function RootStageFooter() {
  return (
    <RootStageFrame as="footer">
      <Stack align="center">
        <BodyText align="center" italic tone="muted">
          <span className={FOOTER_LABEL_CLASS}>{SITE_FOOTER_LABEL}</span>
        </BodyText>
        <nav aria-label="Site links" className={FOOTER_NAV_CLASS}>
          {SITE_FOOTER_LINKS.map((link, index) => (
            <Fragment key={link}>
              {index > 0 ? <span aria-hidden="true">•</span> : null}
              <button aria-disabled="true" className={FOOTER_LINK_CLASS} type="button">
                {link}
              </button>
            </Fragment>
          ))}
        </nav>
      </Stack>
    </RootStageFrame>
  )
}
