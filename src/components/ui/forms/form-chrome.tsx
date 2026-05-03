import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'
import { LabelText } from '@/components/ui/core/typography'

type ShellProps = {
  children: React.ReactNode
}

type HeaderProps = {
  children: React.ReactNode
  hasAction?: boolean
}

type LabelProps = {
  children: React.ReactNode
  htmlFor: string
}

type ActionProps = {
  children: React.ReactNode
  onClick?: () => void
}

function Shell({ children }: ShellProps) {
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

function Label({ children, htmlFor }: LabelProps) {
  return (
    <LabelText as="label" className="block" htmlFor={htmlFor}>
      {children}
    </LabelText>
  )
}

function Action({ children, onClick }: ActionProps) {
  return (
    <button
      className="font-label text-on-surface-variant hover:text-primary focus-visible:text-primary text-[10px] tracking-[0.18em] whitespace-nowrap uppercase underline-offset-4 transition focus-visible:underline"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

export const FormField = {
  Action,
  Header,
  Label,
  Shell,
} as const
