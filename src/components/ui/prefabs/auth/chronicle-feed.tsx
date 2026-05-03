import clsx from 'clsx'

import type { ChronicleItem } from '@/lib/auth/demo-data'
import { ENTRY_SIDE_COPY } from '@/lib/auth/entry-copy'

import { Box, Stack } from '@/components/ui/core/layout'
import { BodyText, LabelText, MetaLabel } from '@/components/ui/core/typography'

type ChronicleFeedProps = {
  chronicles: ChronicleItem[]
}

export function ChronicleFeed({ chronicles }: ChronicleFeedProps) {
  return (
    <Stack gap="lg">
      <header className="flex items-center justify-center gap-(--space-stack-md) lg:justify-start">
        <span className="bg-primary/45 hidden h-px w-10 lg:block" />
        <LabelText tone="muted">{ENTRY_SIDE_COPY.recentChroniclesTitle}</LabelText>
      </header>
      <Stack as="ul" gap="md" resetList>
        {chronicles.map((item) => (
          <Box
            as="li"
            key={item.id}
            className={clsx(
              'rounded-lg border-l-2',
              item.tone === 'highlight'
                ? 'border-primary-container bg-surface-container-low/55'
                : 'border-outline-variant bg-surface-container-low/40'
            )}
            padding="md"
          >
            <Stack gap="sm">
              <BodyText italic size="sm" tone={item.tone === 'highlight' ? 'default' : 'muted'}>
                &quot;{item.text}&quot;
              </BodyText>
              <MetaLabel>{item.timestamp}</MetaLabel>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
