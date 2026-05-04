import clsx from 'clsx'

import type { ChronicleItem } from '@/lib/auth/demo-data'
import { ENTRY_SIDE_COPY } from '@/lib/auth/entry-copy'

import { Stack } from '@/components/ui/core/layout'
import { BodyText, Eyebrow, MetaLabel } from '@/components/ui/core/typography'

type ChronicleFeedProps = {
  chronicles: ChronicleItem[]
}

export function ChronicleFeed({ chronicles }: ChronicleFeedProps) {
  return (
    <Stack gap="lg">
      <header className="flex items-center justify-center gap-(--space-stack-md) lg:justify-start">
        <span className="bg-primary/45 hidden h-px w-10 lg:block" />
        <Eyebrow tone="muted">{ENTRY_SIDE_COPY.recentChroniclesTitle}</Eyebrow>
      </header>
      <Stack as="ul" gap="md" resetList>
        {chronicles.map((item) => (
          <li
            className={clsx(
              'flex flex-col gap-(--space-stack-sm) rounded-lg border-l-2 p-(--space-pad-md)',
              item.tone === 'highlight'
                ? 'border-primary-container bg-surface-container-low/55'
                : 'border-outline-variant bg-surface-container-low/40'
            )}
            key={item.id}
          >
            <BodyText italic size="sm" tone={item.tone === 'highlight' ? 'default' : 'muted'}>
              &quot;{item.text}&quot;
            </BodyText>
            <MetaLabel>{item.timestamp}</MetaLabel>
          </li>
        ))}
      </Stack>
    </Stack>
  )
}
