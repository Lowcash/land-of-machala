import clsx from 'clsx'

import { Stack } from '@/components/ui/core/layout'

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
    <label
      className="font-label text-outline block text-xs tracking-[0.22em] uppercase"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  )
}

function Action({ children, onClick }: ActionProps) {
  return (
    <button
      className="font-label text-primary text-[11px] tracking-[0.18em] whitespace-nowrap uppercase"
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
