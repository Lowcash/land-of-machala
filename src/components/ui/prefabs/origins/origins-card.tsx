import clsx from 'clsx'

import { Card } from '@/components/ui/core/card'
import { Box } from '@/components/ui/core/layout'
import type { SpaceToken } from '@/components/ui/core/layout'
import { Stack } from '@/components/ui/core/layout'

type RootProps = {
  children: React.ReactNode
  width: 'narrow' | 'wide'
}

type ListProps = {
  children: React.ReactNode
  className?: string
  gap?: SpaceToken
}

type ActionsProps = {
  children: React.ReactNode
}

type ContentProps = {
  children: React.ReactNode
  className?: string
}

type ColumnsProps = {
  children: React.ReactNode
  className?: string
}

type FooterProps = {
  children: React.ReactNode
}

type PanelProps = {
  children: React.ReactNode
  gap?: SpaceToken
}

function Root({ children, width }: RootProps) {
  return (
    <Card centered gap="xl" layout="stack" padding="cozy" width={width === 'wide' ? '4xl' : '2xl'}>
      {children}
    </Card>
  )
}

function List({ children, className, gap = 'sm' }: ListProps) {
  return (
    <Stack as="ul" className={className} gap={gap} resetList>
      {children}
    </Stack>
  )
}

function Actions({ children }: ActionsProps) {
  return (
    <Stack align="center" gap="sm">
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

function Footer({ children }: FooterProps) {
  return (
    <section className="flex flex-col gap-(--space-stack-md) sm:flex-row sm:items-center sm:justify-between">
      {children}
    </section>
  )
}

function Panel({ children, gap = 'md' }: PanelProps) {
  return (
    <Box border padding="md" radius="xl" tone="panel">
      <Stack gap={gap}>{children}</Stack>
    </Box>
  )
}

export const OriginsCard = {
  Actions,
  Columns,
  Content,
  Footer,
  List,
  Panel,
  Root,
} as const
