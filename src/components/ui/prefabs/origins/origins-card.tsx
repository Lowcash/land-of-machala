import clsx from 'clsx'

import { Button } from '@/components/ui/core/button'
import { Box } from '@/components/ui/core/box'
import { Inline, Stack } from '@/components/ui/core/layout'
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

type ContentProps = React.PropsWithChildren

type FooterProps = React.PropsWithChildren

type PanelProps = React.PropsWithChildren

type ColumnsProps = React.PropsWithChildren

type ListProps = React.PropsWithChildren

type ProgressActionsProps = {
  onPrimaryClick: () => void
  onSecondaryClick?: () => void
  primaryDisabled?: boolean
  primaryLabel: string
  secondaryLabel: string
}

const FOOTER_CLASS = 'mx-auto w-full max-w-xl flex-col sm:flex-row'
const COLUMNS_CLASS =
  'grid md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr] md:[&>*:first-child]:col-span-2 xl:[&>*:first-child]:col-span-1'

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

function Content({ children }: ContentProps) {
  return (
    <section className="mx-auto w-full max-w-xl">
      <FlowCard.Content as="section">{children}</FlowCard.Content>
    </section>
  )
}

function Footer({ children }: FooterProps) {
  return (
    <Inline className={FOOTER_CLASS} fullWidth justify="between" wrap>
      {children}
    </Inline>
  )
}

function Panel({ children }: PanelProps) {
  return (
    <Box border padding="panel" radius="panel" tone="panel">
      <Stack>{children}</Stack>
    </Box>
  )
}

function Columns({ children }: ColumnsProps) {
  return <section className={COLUMNS_CLASS}>{children}</section>
}

function List({ children }: ListProps) {
  return <Stack as="ul" resetList>{children}</Stack>
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

function Prompt({ children }: { children: React.ReactNode }) {
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
    <Footer>
      <Button onClick={onSecondaryClick} variant="ghost">
        {secondaryLabel}
      </Button>
      <Button disabled={primaryDisabled} onClick={onPrimaryClick}>
        {primaryLabel}
      </Button>
    </Footer>
  )
}

export const OriginsCard = {
  Root,
  Header,
  Content,
  Footer,
  Panel,
  Columns,
  List,
  ListItem,
  Prompt,
  ProgressActions,
} as const
