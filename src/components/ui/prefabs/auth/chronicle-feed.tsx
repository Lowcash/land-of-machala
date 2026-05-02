import type { ChronicleItem } from '@/lib/auth/demo-data'
import { ENTRY_SIDE_COPY } from '@/lib/auth/entry-copy'

import { Stack } from '@/components/ui/core/layout'
import { BodyText, Eyebrow, MetaLabel } from '@/components/ui/core/typography'

type ChronicleFeedProps = {
  chronicles: ChronicleItem[]
}

export function ChronicleFeed({ chronicles }: ChronicleFeedProps) {
  return (
    <Stack space="4">
      <header className="flex items-center justify-center gap-3 lg:justify-start">
        <span className="bg-primary/45 hidden h-px w-10 lg:block" />
        <Eyebrow tone="muted">{ENTRY_SIDE_COPY.recentChroniclesTitle}</Eyebrow>
      </header>
      <ul className="space-y-3">
        {chronicles.map((item) => (
          <li key={item.id}>
            <div
              className={[
                'space-y-1 rounded-lg border-l-2 p-4',
                item.tone === 'highlight'
                  ? 'border-primary-container bg-surface-container-low/55'
                  : 'border-outline-variant bg-surface-container-low/40',
              ].join(' ')}
            >
              <BodyText italic size="sm" tone={item.tone === 'highlight' ? 'default' : 'muted'}>
                &quot;{item.text}&quot;
              </BodyText>
              <MetaLabel>{item.timestamp}</MetaLabel>
            </div>
          </li>
        ))}
      </ul>
    </Stack>
  )
}
