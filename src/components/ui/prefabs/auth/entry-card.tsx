import { Box } from '@/components/ui/core/box'
import { Button } from '@/components/ui/core/button'
import { Divider as CoreDivider } from '@/components/ui/core/divider'
import { Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { FlowCard } from '@/components/ui/prefabs/flow-card'

const Content = FlowCard.Content

type EntryCardRootProps = React.PropsWithChildren

function Root({ children }: EntryCardRootProps) {
  return <FlowCard.Root fillHeight>{children}</FlowCard.Root>
}

type EntryCardFooterProps = React.PropsWithChildren

function Footer({ children }: EntryCardFooterProps) {
  return (
    <Stack fullWidth justify="between">
      {children}
    </Stack>
  )
}

type EntryCardHeaderProps = {
  description: string
  title: string
}

function Header({ description, title }: EntryCardHeaderProps) {
  return (
    <FlowCard.Header
      description={description}
      descriptionVariant="heading"
      descriptionVisibility="desktop"
      title={title}
    />
  )
}

type EntryCardStatusProps = {
  message?: string
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

type EntryCardSupportProps = React.PropsWithChildren

function Support({ children }: EntryCardSupportProps) {
  return <Stack>{children}</Stack>
}

type EntryCardDividerProps = {
  label: string
}

function Divider({ label }: EntryCardDividerProps) {
  return <CoreDivider label={label} />
}

type EntryCardGuestSwitchActionsProps = {
  guestLabel: string
  onGuestClick?: () => void
  onSwitchClick: () => void
  switchLabel: string
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
