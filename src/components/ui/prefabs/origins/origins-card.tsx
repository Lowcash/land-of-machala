import clsx from 'clsx'

import { Box } from '@/components/ui/core/layout'
import { Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { FlowCard } from '@/components/ui/prefabs/flow-card'

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

type FooterProps = {
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
}

type RootProps = {
  children: React.ReactNode
  width?: 'compact' | 'full'
}

const FOOTER_BASE_CLASS = 'flex flex-col sm:flex-row sm:items-center sm:justify-between'

function Root({ children, width = 'full' }: RootProps) {
  return (
    <FlowCard.Root centered width={width === 'compact' ? '3xl' : 'auto'}>
      {children}
    </FlowCard.Root>
  )
}

function List({ children, className }: ListProps) {
  return (
    <Stack as="ul" className={className} resetList>
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
  return <FlowCard.Header description={description} overline={overline} showDivider title={title} />
}

function Actions({ children }: { children: React.ReactNode }) {
  return <FlowCard.Actions>{children}</FlowCard.Actions>
}

function Content({ children, className }: ContentProps) {
  return (
    <FlowCard.Content as="section" className={clsx('mx-auto w-full max-w-xl', className)}>
      {children}
    </FlowCard.Content>
  )
}

function Columns({ children, className }: ColumnsProps) {
  return (
    <section
      className={clsx(
        'grid md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr] md:[&>*:first-child]:col-span-2 xl:[&>*:first-child]:col-span-1',
        className
      )}
    >
      {children}
    </section>
  )
}

function Footer({ children, className }: FooterProps) {
  return (
    <section className={clsx('mx-auto w-full max-w-xl', FOOTER_BASE_CLASS, className)}>
      {children}
    </section>
  )
}

function Panel({ children, className }: PanelProps) {
  return (
    <Box border className={clsx('flex flex-col', className)} tone="panel">
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
