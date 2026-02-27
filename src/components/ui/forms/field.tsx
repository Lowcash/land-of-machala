'use client'

import {
  Children,
  type HTMLAttributes,
  type ReactElement,
  cloneElement,
  useId,
} from 'react'

import { cn } from '@/lib/utils'

import { Label } from './label'

interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  horizontal?: boolean
  children: React.ReactNode
}

export function Field({ label, error, horizontal, children, className, ...props }: FieldProps) {
  const id = useId()
  const child = Children.only(children) as ReactElement & {
    props: { id?: string }
  }

  return (
    <div
      className={cn(
        'flex gap-2',
        horizontal ? 'flex-row items-center' : 'flex-col items-stretch',
        className
      )}
      {...props}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className={cn(horizontal ? 'flex-1' : 'w-full')}>
        {cloneElement(child, { id: child.props.id || id })}
      </div>
      {error && <span className="text-xs font-medium text-red-500/80">{error}</span>}
    </div>
  )
}
