import { Fragment } from 'react'

import { SITE_FOOTER_LABEL, SITE_FOOTER_LINKS } from '@/lib/site-config'

import { Inline, Stack } from '@/components/ui/core/layout'
import { BodyText, TEXT_TRACKING_CLASS } from '@/components/ui/core/typography'
import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'

const FOOTER_LINK_CLASS = 'hover:text-primary cursor-pointer transition-colors'
const FOOTER_LABEL_CLASS = 'text-sm'

const FOOTER_NAV_CLASS = `font-interface text-micro text-on-surface-variant/80 ${TEXT_TRACKING_CLASS.wordmark} uppercase`

export function RootStageFooter() {
  return (
    <RootStageFrame as="footer">
      <Stack align="center">
        <BodyText align="center" italic tone="muted">
          <span className={FOOTER_LABEL_CLASS}>{SITE_FOOTER_LABEL}</span>
        </BodyText>
        <Inline aria-label="Site links" as="nav" className={FOOTER_NAV_CLASS} gap="tight" justify="center" wrap>
          {SITE_FOOTER_LINKS.map((link, index) => (
            <Fragment key={link}>
              {index > 0 ? <span aria-hidden="true">•</span> : null}
              <button aria-disabled="true" className={FOOTER_LINK_CLASS} type="button">
                {link}
              </button>
            </Fragment>
          ))}
        </Inline>
      </Stack>
    </RootStageFrame>
  )
}
