import clsx from 'clsx'

import type { ChronicleItem } from '@/lib/auth/demo-data'
import { ENTRY_SIDE_COPY } from '@/lib/auth/entry-messages'

import { Inline, List, Stack } from '@/components/ui/core/layout'
import { BodyText, LabelText } from '@/components/ui/core/typography'

type ChronicleFeedProps = {
  chronicles: ChronicleItem[]
}

const CHRONICLE_HEADER_CLASS = 'justify-center lg:justify-start'
const CHRONICLE_HEADER_MARK_CLASS = 'bg-primary/45 hidden h-px w-10 lg:block'
const CHRONICLE_HEADER_LABEL_CLASS = 'text-primary/70 text-xs tracking-[0.2em]'

const CHRONICLE_ITEM_CLASS = 'border-l-2'

export function ChronicleFeed({ chronicles }: ChronicleFeedProps) {
  return (
    <Stack>
      <Inline as="header" className={clsx(CHRONICLE_HEADER_CLASS)}>
        <span aria-hidden="true" className={CHRONICLE_HEADER_MARK_CLASS} />
        <span className={CHRONICLE_HEADER_LABEL_CLASS}>{ENTRY_SIDE_COPY.recentChroniclesTitle}</span>
      </Inline>
      <List>
        {chronicles.map((item) => (
          <Stack
            as="li"
            className={clsx(
              CHRONICLE_ITEM_CLASS,
              item.tone === 'highlight'
                ? 'border-primary-container bg-surface-container-low/55'
                : 'border-outline-variant bg-surface-container-low/40'
            )}
            key={item.id}
          >
            <BodyText italic tone={item.tone === 'highlight' ? 'default' : 'muted'}>
              &quot;{item.text}&quot;
            </BodyText>
            <LabelText size="meta" tone="default" uppercase>
              {item.timestamp}
            </LabelText>
          </Stack>
        ))}
      </List>
    </Stack>
  )
}
