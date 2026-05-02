import { Card } from '@/components/ui/core/card'
import { Box, Stack } from '@/components/ui/core/layout'
import { BodyText, MetaLabel, SectionTitle } from '@/components/ui/core/typography'

type EntryCardRootProps = {
  children: React.ReactNode
}

type EntryCardHeaderProps = {
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

function Root({ children }: EntryCardRootProps) {
  return (
    <Card fillHeight gap="6" layout="stack" minHeight="entry" padding="roomy">
      {children}
    </Card>
  )
}

function Header({ description, title }: EntryCardHeaderProps) {
  return (
    <SectionTitle description={description} descriptionItalic descriptionSize="lg" title={title} />
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
    <div className="flex w-full items-center gap-4">
      <span className="bg-outline-variant/40 h-px flex-1" />
      <MetaLabel tone="muted">{label}</MetaLabel>
      <span className="bg-outline-variant/40 h-px flex-1" />
    </div>
  )
}

function Footer({ children }: EntryCardFooterProps) {
  return (
    <Stack fullWidth justify="between" space="6">
      {children}
    </Stack>
  )
}

function Actions({ children }: EntryCardFooterProps) {
  return (
    <Stack align="center" space="3">
      {children}
    </Stack>
  )
}

export const EntryCard = {
  Actions,
  Divider,
  Footer,
  Header,
  Root,
  Status,
}
