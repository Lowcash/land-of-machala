import clsx from 'clsx'

import { Card } from '@/components/ui/core/card'
import { Box } from '@/components/ui/core/layout'
import type { SpaceToken } from '@/components/ui/core/layout'
import { Stack } from '@/components/ui/core/layout'
import { BodyText, SectionTitle } from '@/components/ui/core/typography'

type ListProps = {
  children: React.ReactNode
  className?: string
}

type HeaderProps = {
  description?: React.ReactNode
  overline?: React.ReactNode
  title: React.ReactNode
}

type ContentProps = {
  children: React.ReactNode
  className?: string
}

type ColumnsProps = {
  children: React.ReactNode
  className?: string
}

type PanelProps = {
  children: React.ReactNode
  className?: string
  gap?: SpaceToken
}

const PANEL_GAP_CLASS: Record<SpaceToken, string> = {
  sm: 'gap-(--space-stack-sm)',
  md: 'gap-(--space-stack-md)',
  lg: 'gap-(--space-stack-lg)',
  xl: 'gap-(--space-stack-xl)',
  xxl: 'gap-(--space-stack-xxl)',
}

function Root({ children }: { children: React.ReactNode }) {
  return (
    <Card centered gap="lg" layout="stack" padding="cozy" width="auto">
      {children}
    </Card>
  )
}

function List({ children, className }: ListProps) {
  return (
    <Stack as="ul" className={className} gap="sm" resetList>
      {children}
    </Stack>
  )
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

function Prompt({ children }: { children: React.ReactNode }) {
  return <BodyText align="center">{children}</BodyText>
}

function Header({ description, overline, title }: HeaderProps) {
  return (
    <SectionTitle
      description={description}
      descriptionSize="base"
      overline={overline}
      showDivider
      title={title}
      titleSize="lg"
    />
  )
}

function Actions({ children }: { children: React.ReactNode }) {
  return (
    <Stack align="center" gap="md">
      {children}
    </Stack>
  )
}

function Content({ children, className }: ContentProps) {
  return (
    <Stack as="section" className={clsx('mx-auto w-full max-w-xl text-left', className)} gap="md">
      {children}
    </Stack>
  )
}

function Columns({ children, className }: ColumnsProps) {
  return (
    <section
      className={clsx('grid gap-(--space-stack-md) lg:grid-cols-[1fr_1fr_0.9fr]', className)}
    >
      {children}
    </section>
  )
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <section className="sticky bottom-0 z-10 -mx-(--space-pad-lg) -mb-(--space-pad-lg) flex flex-col gap-(--space-stack-md) border-t border-white/8 bg-surface-container/90 px-(--space-pad-lg) pb-(--space-pad-lg) pt-(--space-stack-md) backdrop-blur-md sm:flex-row sm:items-center sm:justify-between md:-mx-(--space-pad-xl) md:-mb-(--space-pad-xl) md:px-(--space-pad-xl) md:pb-(--space-pad-xl)">
      {children}
    </section>
  )
}

function Panel({ children, className, gap = 'md' }: PanelProps) {
  return (
    <Box
      border
      className={clsx('flex flex-col', PANEL_GAP_CLASS[gap], className)}
      padding="md"
      radius="xl"
      tone="panel"
    >
      {children}
    </Box>
  )
}

export const OriginsCard = {
  Actions,
  Columns,
  Content,
  Footer,
  Header,
  List,
  ListItem,
  Panel,
  Prompt,
  Root,
} as const
