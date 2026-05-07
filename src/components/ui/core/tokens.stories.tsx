import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import clsx from 'clsx'

import { Box } from '@/components/ui/core/box'
import { Divider } from '@/components/ui/core/divider'
import { Stack } from '@/components/ui/core/layout'
import { BodyText, DisplayValue, HeadingText, LabelText } from '@/components/ui/core/typography'

const COLOR_SWATCHES = [
  { className: 'bg-background', label: 'Background', token: '--color-background' },
  {
    className: 'bg-surface-container-lowest',
    label: 'Surface lowest',
    token: '--color-surface-container-lowest',
  },
  {
    className: 'bg-surface-container-low',
    label: 'Surface low',
    token: '--color-surface-container-low',
  },
  {
    className: 'bg-surface-container',
    label: 'Surface',
    token: '--color-surface-container',
  },
  {
    className: 'bg-surface-container-high',
    label: 'Surface high',
    token: '--color-surface-container-high',
  },
  { className: 'bg-primary', label: 'Primary', token: '--color-primary' },
  {
    className: 'bg-primary-container',
    label: 'Primary container',
    token: '--color-primary-container',
  },
  {
    className: 'bg-secondary-container',
    label: 'Secondary container',
    token: '--color-secondary-container',
  },
  { className: 'bg-error', label: 'Error', token: '--color-error' },
] as const

const INK_SWATCHES = [
  { className: 'text-on-surface', label: 'On surface', token: '--color-on-surface' },
  {
    className: 'text-on-surface-variant',
    label: 'On surface variant',
    token: '--color-on-surface-variant',
  },
  { className: 'text-outline', label: 'Outline', token: '--color-outline' },
  {
    className: 'text-outline-variant',
    label: 'Outline variant',
    token: '--color-outline-variant',
  },
  { className: 'text-on-primary', label: 'On primary', token: '--color-on-primary' },
] as const

const GAP_PREVIEWS = [
  { className: 'gap-(--gap-stack-sm)', label: 'Stack gap / tight', token: '--gap-stack-sm' },
  { className: 'gap-(--gap-stack-md)', label: 'Stack gap / base', token: '--gap-stack-md' },
  { className: 'gap-(--gap-stack-lg)', label: 'Stack gap / loose', token: '--gap-stack-lg' },
] as const

const meta = {
  title: 'UI/Foundation/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

type SectionProps = {
  children: React.ReactNode
  eyebrow: string
  title: string
}

type TokenCardProps = {
  children: React.ReactNode
  label: string
  token: string
}

function Section({ children, eyebrow, title }: SectionProps) {
  return (
    <Stack gap="tight">
      <LabelText size="meta" tone="default" uppercase>
        {eyebrow}
      </LabelText>
      <HeadingText as="h2" size="section">
        {title}
      </HeadingText>
      {children}
    </Stack>
  )
}

function TokenCard({ children, label, token }: TokenCardProps) {
  return (
    <Box border fullHeight padding="panel" radius="panel" tone="surface">
      <Stack fullWidth>
        {children}
        <Stack gap="none">
          <LabelText size="meta" tone="default" uppercase>
            {label}
          </LabelText>
          <BodyText tone="muted">{token}</BodyText>
        </Stack>
      </Stack>
    </Box>
  )
}

export const Overview: Story = {
  render: () => (
    <div className="bg-background min-h-dvh px-6 py-10 md:px-10">
      <Stack className="mx-auto w-full max-w-6xl" gap="loose">
        <Section eyebrow="Foundation" title="Colors and tokens">
          <div className="max-w-3xl">
            <BodyText tone="muted">
              Storybook surface for token audit. Use this to review palette, ink hierarchy, spacing
              rhythm, and radius scale without digging through CSS variables.
            </BodyText>
          </div>
        </Section>

        <Divider />

        <Section eyebrow="Palette" title="Surface and accent colors">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {COLOR_SWATCHES.map((swatch) => (
              <TokenCard key={swatch.token} label={swatch.label} token={swatch.token}>
                <div
                  className={clsx(
                    'border-outline-variant/40 rounded-control h-20 w-full border',
                    swatch.className
                  )}
                />
              </TokenCard>
            ))}
          </div>
        </Section>

        <Section eyebrow="Ink" title="Text and outline colors">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {INK_SWATCHES.map((swatch) => (
              <TokenCard key={swatch.token} label={swatch.label} token={swatch.token}>
                <Stack className="bg-surface-container-lowest rounded-control border-outline-variant/40 border p-4">
                  <div className={clsx('text-xl', swatch.className)}>
                    <HeadingText as="p" tone="inherit">
                      Token sample
                    </HeadingText>
                  </div>
                  <div className={swatch.className}>
                    <BodyText tone="inherit">Copy preview inside current surface.</BodyText>
                  </div>
                </Stack>
              </TokenCard>
            ))}
          </div>
        </Section>

        <div className="grid gap-4 xl:grid-cols-2">
          <Section eyebrow="Shape" title="Radius scale">
            <div className="grid gap-4 md:grid-cols-3">
              <TokenCard label="Compact radius" token="--radius-compact">
                <div className="bg-primary/20 border-primary/35 rounded-compact border p-6">
                  <LabelText tone="primary" uppercase>
                    Checkboxes, compact actions
                  </LabelText>
                </div>
              </TokenCard>
              <TokenCard label="Control radius" token="--radius-control">
                <div className="bg-primary/20 border-primary/35 rounded-control border p-6">
                  <LabelText tone="primary" uppercase>
                    Buttons, inputs, toggles
                  </LabelText>
                </div>
              </TokenCard>
              <TokenCard label="Panel radius" token="--radius-panel">
                <div className="bg-primary/20 border-primary/35 rounded-panel border p-6">
                  <LabelText tone="primary" uppercase>
                    Cards, panels, stat blocks
                  </LabelText>
                </div>
              </TokenCard>
            </div>
          </Section>

          <Section eyebrow="Rhythm" title="Spacing scale">
            <div className="grid gap-4">
              <TokenCard label="Panel inset" token="--inset-panel">
                <Box border className="border-dashed" padding="panel" radius="panel" tone="panel">
                  <BodyText>Panel inset preview</BodyText>
                </Box>
              </TokenCard>
              <div className="grid gap-4 md:grid-cols-3">
                {GAP_PREVIEWS.map((gap) => (
                  <TokenCard key={gap.token} label={gap.label} token={gap.token}>
                    <div className={clsx('flex flex-col', gap.className)}>
                      <div className="bg-primary/70 rounded-control h-3 w-full" />
                      <div className="bg-primary/55 rounded-control h-3 w-full" />
                      <div className="bg-primary/40 rounded-control h-3 w-full" />
                    </div>
                  </TokenCard>
                ))}
              </div>
            </div>
          </Section>
        </div>

        <Section eyebrow="Display" title="Numeric accent sample">
          <Box border padding="panel" radius="panel" tone="panel">
            <Stack align="center">
              <LabelText size="meta" tone="default" uppercase>
                Primary display value
              </LabelText>
              <DisplayValue align="center" size="hero" tone="primary">
                42
              </DisplayValue>
            </Stack>
          </Box>
        </Section>
      </Stack>
    </div>
  ),
}
