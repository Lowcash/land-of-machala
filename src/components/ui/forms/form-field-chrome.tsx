import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'
import { LabelText } from '@/components/ui/core/typography'

type HeaderProps = {
  children: React.ReactNode
  hasAction?: boolean
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

type ControlLabelProps = {
  children: React.ReactNode
  error?: boolean
  htmlFor: string
}

const FIELD_ACTION_CLASS =
  'font-label text-on-surface-variant hover:text-primary focus-visible:text-primary text-[10px] tracking-[0.18em] whitespace-nowrap uppercase underline-offset-4 transition focus-visible:underline'

const CONTROL_LABEL_CLASS = 'cursor-pointer text-sm leading-6'

function Shell({ children }: React.PropsWithChildren) {
  return <Stack gap="sm">{children}</Stack>
}

function Header({ children, hasAction = false }: HeaderProps) {
  return (
    <div
      className={clsx(
        hasAction &&
          'flex flex-col items-start gap-(--space-stack-sm) sm:flex-row sm:items-center sm:justify-between sm:gap-(--space-stack-md)'
      )}
    >
      {children}
    </div>
  )
}

function Label({ children, error = false, htmlFor }: LabelProps) {
  return (
    <LabelText as="label" className="block" htmlFor={htmlFor} tone={error ? 'error' : 'primary'}>
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

function Inline({ children }: React.PropsWithChildren) {
  return <div className="group flex items-center gap-(--space-stack-md)">{children}</div>
}

function ControlLabel({ children, error = false, htmlFor }: ControlLabelProps) {
  return (
    <label
      className={clsx(error ? 'text-error' : 'text-on-surface-variant', CONTROL_LABEL_CLASS)}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

export const FormField = {
  Action,
  ControlLabel,
  Header,
  Inline,
  Label,
  Shell,
} as const
