import { Box } from '@/components/ui/core/box'
import { Button } from '@/components/ui/core/button'
import { Grid, Inline, List, Stack } from '@/components/ui/core/layout'
import { BodyText } from '@/components/ui/core/typography'
import { FlowCard } from '@/components/ui/prefabs/flow-card'

type RootProps = {
  children: React.ReactNode
  width?: 'compact' | 'full'
}

type HeaderProps = {
  description?: React.ReactNode
  overline?: React.ReactNode
  title: React.ReactNode
}

type ProgressActionsProps = {
  onPrimaryClick: () => void
  onSecondaryClick?: () => void
  primaryDisabled?: boolean
  primaryLabel: string
  secondaryLabel: string
}

const FOOTER_CLASS = 'mx-auto w-full max-w-xl flex-col sm:flex-row'
const COLUMNS_CLASS =
  'xl:grid-cols-[1.1fr_1fr_1fr] md:[&>*:first-child]:col-span-2 xl:[&>*:first-child]:col-span-1'

function Root({ children, width = 'full' }: RootProps) {
  return (
    <FlowCard.Root centered width={width === 'compact' ? 'content' : 'auto'}>
      {children}
    </FlowCard.Root>
  )
}

function Header({ description, overline, title }: HeaderProps) {
  return <FlowCard.Header description={description} overline={overline} showDivider title={title} />
}

function Content({ children }: React.PropsWithChildren) {
  return (
    <FlowCard.Content as="section" className="mx-auto max-w-xl" fullWidth>
      {children}
    </FlowCard.Content>
  )
}

function Footer({ children }: React.PropsWithChildren) {
  return (
    <Inline className={FOOTER_CLASS} fullWidth justify="between" wrap>
      {children}
    </Inline>
  )
}

function Panel({ children }: React.PropsWithChildren) {
  return (
    <Box border padding="panel" radius="panel" tone="panel">
      <Stack>{children}</Stack>
    </Box>
  )
}

function Columns({ children }: React.PropsWithChildren) {
  return (
    <Grid as="section" className={COLUMNS_CLASS} mdColumns={2}>
      {children}
    </Grid>
  )
}

function Items({ children }: React.PropsWithChildren) {
  return <List>{children}</List>
}

function Prompt({ children }: React.PropsWithChildren) {
  return <BodyText align="center">{children}</BodyText>
}

function ProgressActions({
  onPrimaryClick,
  onSecondaryClick,
  primaryDisabled = false,
  primaryLabel,
  secondaryLabel,
}: ProgressActionsProps) {
  return (
    <FlowCard.Actions fullWidth>
      <Footer>
        <Button onClick={onSecondaryClick} variant="ghost">
          {secondaryLabel}
        </Button>
        <Button disabled={primaryDisabled} onClick={onPrimaryClick}>
          {primaryLabel}
        </Button>
      </Footer>
    </FlowCard.Actions>
  )
}

export const OriginsCard = {
  Root,
  Header,
  Content,
  Footer,
  Panel,
  Columns,
  List: Items,
  Prompt,
  ProgressActions,
} as const
