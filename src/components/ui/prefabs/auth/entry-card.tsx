import { Button } from '@/components/ui/core/button'
import { Box } from '@/components/ui/core/box'
import { Divider as CoreDivider } from '@/components/ui/core/divider'
import { Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { FlowCard } from '@/components/ui/prefabs/flow-card'

type EntryCardRootProps = React.PropsWithChildren

type EntryCardFooterProps = React.PropsWithChildren

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

type EntryCardSupportProps = React.PropsWithChildren

type EntryCardGuestSwitchActionsProps = {
  guestLabel: string
  onGuestClick?: () => void
  onSwitchClick: () => void
  switchLabel: string
}

function Root({ children }: EntryCardRootProps) {
  return <FlowCard.Root fillHeight>{children}</FlowCard.Root>
}

function Footer({ children }: EntryCardFooterProps) {
  return (
    <Stack fullWidth justify="between">
      {children}
    </Stack>
  )
}

const Content = FlowCard.Content

function Header({ description, title }: EntryCardHeaderProps) {
  return (
    <FlowCard.Header
      description={description}
      descriptionItalic
      descriptionVisibility="desktop"
      title={title}
    />
  )
}

function Status({ message }: EntryCardStatusProps) {
  if (!message) {
    return null
  }

  return (
    <Box border padding="panel" radius="panel" tone="surface">
      <BodyText align="center">{message}</BodyText>
    </Box>
  )
}

function Support({ children }: EntryCardSupportProps) {
  return <Stack>{children}</Stack>
}

function Divider({ label }: EntryCardDividerProps) {
  return <CoreDivider label={label} />
}

function GuestSwitchActions({
  guestLabel,
  onGuestClick,
  onSwitchClick,
  switchLabel,
}: EntryCardGuestSwitchActionsProps) {
  return (
    <FlowCard.Actions>
      <Button fullWidth onClick={onGuestClick} variant="ghost">
        {guestLabel}
      </Button>
      <Button fullWidth onClick={onSwitchClick} variant="secondary">
        {switchLabel}
      </Button>
    </FlowCard.Actions>
  )
}

export const EntryCard = {
  Root,
  Footer,
  Content,
  Header,
  Status,
  Support,
  Divider,
  GuestSwitchActions,
}
