import clsx from 'clsx'

import { Inline, Stack } from '@/components/ui/core/layout'
import { BodyText, LabelText, TEXT_TRACKING_CLASS } from '@/components/ui/core/typography'

type HelperTextTone = 'default' | 'error' | 'invisible'

type HeaderProps = {
  children: React.ReactNode
  hasAction?: boolean
}

type ControlLabelProps = {
  children: React.ReactNode
  error?: boolean
  htmlFor: string
}

type LabelProps = {
  children: React.ReactNode
  error?: boolean
  htmlFor: string
}

type ActionProps = {
  children: React.ReactNode
  onClick?: () => void
}

type HelperTextProps = {
  children?: React.ReactNode
  reserveSpace?: boolean
  tone?: HelperTextTone
}

const CONTROL_LABEL_CLASS = 'font-reading cursor-pointer leading-(--line-height-snug)'

const FIELD_LABEL_CLASS = TEXT_TRACKING_CLASS.ui

const FIELD_ACTION_CLASS =
  'text-primary-bright hover:text-primary focus-visible:text-primary inline-flex items-center whitespace-nowrap underline decoration-transparent underline-offset-4 transition hover:decoration-current focus-visible:decoration-current'

const FIELD_ACTION_TEXT_CLASS = TEXT_TRACKING_CLASS.ui

function Root({ children }: React.PropsWithChildren) {
  return <Stack gap="tight">{children}</Stack>
}

function Header({ children, hasAction = false }: HeaderProps) {
  return (
    <Stack
      className={clsx(hasAction && 'flex-row items-baseline')}
      fullWidth
      gap="none"
      justify={hasAction ? 'between' : 'start'}
    >
      {children}
    </Stack>
  )
}

function InlineControl({ children }: React.PropsWithChildren) {
  return (
    <Inline align="center" className="group" fullWidth gap="tight">
      {children}
    </Inline>
  )
}

function ControlLabel({ children, error = false, htmlFor }: ControlLabelProps) {
  return (
    <LabelText as="label" htmlFor={htmlFor} size="body" tone={error ? 'error' : 'muted'}>
      <span className={CONTROL_LABEL_CLASS}>{children}</span>
    </LabelText>
  )
}

function Label({ children, error = false, htmlFor }: LabelProps) {
  return (
    <LabelText as="label" htmlFor={htmlFor} size="label" tone={error ? 'error' : 'muted'} uppercase>
      <span className={FIELD_LABEL_CLASS}>{children}</span>
    </LabelText>
  )
}

function Action({ children, onClick }: ActionProps) {
  return (
    <button className={FIELD_ACTION_CLASS} onClick={onClick} type="button">
      <LabelText as="span" size="label" tone="inherit" uppercase>
        <span className={FIELD_ACTION_TEXT_CLASS}>{children}</span>
      </LabelText>
    </button>
  )
}

function HelperText({ children, reserveSpace = true, tone = 'default' }: HelperTextProps) {
  const text = children ?? (reserveSpace ? '\u00A0' : null)

  return (
    <div className={clsx(reserveSpace && 'min-h-4', tone === 'invisible' && 'text-transparent')}>
      <BodyText
        as="p"
        size="label"
        tone={tone === 'error' ? 'error' : tone === 'invisible' ? 'inherit' : 'muted'}
      >
        {text}
      </BodyText>
    </div>
  )
}

export const FieldChrome = {
  Root,
  Header,
  Inline: InlineControl,
  ControlLabel,
  Label,
  Action,
  HelperText,
} as const
