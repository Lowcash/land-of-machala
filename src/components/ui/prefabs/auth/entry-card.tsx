import { Card } from '@/components/ui/core/card'
import { Box, Stack } from '@/components/ui/core/layout'
import type { SpaceToken } from '@/components/ui/core/layout'
import { BodyText, MetaLabel, SectionTitle } from '@/components/ui/core/typography'

type EntryCardRootProps = {
  children: React.ReactNode
}

type EntryCardHeaderProps = {
  className?: string
  description: string
  title: string
}

type EntryCardStatusProps = {
  message?: string
}

type EntryCardDividerProps = {
  label: string
}

type EntryCardFooterProps = {
  children: React.ReactNode
}

type EntryCardContentProps = {
  children: React.ReactNode
}

type EntryCardSupportProps = {
  children: React.ReactNode
  gap?: SpaceToken
}

function Root({ children }: EntryCardRootProps) {
  return (
    <Card fillHeight gap="xl" layout="stack" minHeight="entry" padding="roomy">
      {children}
    </Card>
  )
}

function Header({ className, description, title }: EntryCardHeaderProps) {
  return (
    <SectionTitle
      className={className}
      description={description}
      descriptionItalic
      descriptionSize="lg"
      title={title}
    />
  )
}

function Status({ message }: EntryCardStatusProps) {
  if (!message) {
    return null
  }

  return (
    <Box border padding="md" radius="xl" tone="surface">
      <BodyText align="center" size="sm">
        {message}
      </BodyText>
    </Box>
  )
}

function Divider({ label }: EntryCardDividerProps) {
  return (
    <div className="flex w-full items-center gap-(--space-stack-lg)">
      <span className="bg-outline-variant/40 h-px flex-1" />
      <MetaLabel tone="muted">{label}</MetaLabel>
      <span className="bg-outline-variant/40 h-px flex-1" />
    </div>
  )
}

function Content({ children }: EntryCardContentProps) {
  return <Stack gap="lg">{children}</Stack>
}

function Support({ children, gap = 'lg' }: EntryCardSupportProps) {
  return <Stack gap={gap}>{children}</Stack>
}

function Footer({ children }: EntryCardFooterProps) {
  return (
    <Stack fullWidth justify="between" gap="xl">
      {children}
    </Stack>
  )
}

function Actions({ children }: EntryCardFooterProps) {
  return (
    <Stack align="center" gap="md">
      {children}
    </Stack>
  )
}

export const EntryCard = {
  Actions,
  Content,
  Divider,
  Footer,
  Header,
  Root,
  Status,
  Support,
}
