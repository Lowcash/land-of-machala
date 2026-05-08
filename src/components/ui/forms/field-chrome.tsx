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

const CONTROL_LABEL_CLASS = 'cursor-pointer leading-6'

const FIELD_ACTION_CLASS = `font-interface text-on-surface-variant hover:text-primary focus-visible:text-primary ${TEXT_TRACKING_CLASS.action} whitespace-nowrap uppercase underline-offset-4 transition focus-visible:underline`

function Root({ children }: React.PropsWithChildren) {
  return <Stack>{children}</Stack>
}

function Header({ children, hasAction = false }: HeaderProps) {
  return (
    <Stack
      className={clsx(hasAction && 'sm:flex-row sm:items-center sm:justify-between')}
      fullWidth
      gap="none"
    >
      {children}
    </Stack>
  )
}

function InlineControl({ children }: React.PropsWithChildren) {
  return (
    <Inline align="center" className="group" fullWidth>
      {children}
    </Inline>
  )
}

function ControlLabel({ children, error = false, htmlFor }: ControlLabelProps) {
  return (
    <LabelText as="label" htmlFor={htmlFor} tone={error ? 'error' : 'muted'}>
      <span className={CONTROL_LABEL_CLASS}>{children}</span>
    </LabelText>
  )
}

function Label({ children, error = false, htmlFor }: LabelProps) {
  return (
    <LabelText as="label" htmlFor={htmlFor} tone={error ? 'error' : 'primary'} uppercase>
      {children}
    </LabelText>
  )
}

function Action({ children, onClick }: ActionProps) {
  return (
    <button className={FIELD_ACTION_CLASS} onClick={onClick} type="button">
      {children}
    </button>
  )
}

function HelperText({ children, reserveSpace = true, tone = 'default' }: HelperTextProps) {
  const text = children ?? (reserveSpace ? '\u00A0' : null)

  return (
    <div className={clsx(reserveSpace && 'min-h-4', tone === 'invisible' && 'text-transparent')}>
      <BodyText
        as="p"
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
