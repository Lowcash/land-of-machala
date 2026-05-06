import clsx from 'clsx'

import type { ChronicleItem } from '@/lib/auth/demo-data'
import { ENTRY_SIDE_COPY } from '@/lib/auth/entry-copy'

import { Stack } from '@/components/ui/core/layout'
import { BodyText, LabelText, MetaLabel } from '@/components/ui/core/typography'

type ChronicleFeedProps = {
  chronicles: ChronicleItem[]
}

const CHRONICLE_HEADER_CLASS = 'flex items-center justify-center lg:justify-start'

const CHRONICLE_ITEM_CLASS = 'border-l-2'

export function ChronicleFeed({ chronicles }: ChronicleFeedProps) {
  return (
    <Stack>
      <header className={clsx(CHRONICLE_HEADER_CLASS)}>
        <span className="bg-primary/45 hidden h-px w-10 lg:block" />
        <LabelText tone="muted">{ENTRY_SIDE_COPY.recentChroniclesTitle}</LabelText>
      </header>
      <Stack as="ul" resetList>
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
            <MetaLabel>{item.timestamp}</MetaLabel>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}
