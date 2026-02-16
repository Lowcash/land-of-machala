'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

import { Label } from './label'

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  horizontal?: boolean
  children: React.ReactNode
}

export function Field({ label, error, horizontal, children, className, ...props }: FieldProps) {
  const id = React.useId()
  const child = React.Children.only(children) as React.ReactElement & {
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
        {React.cloneElement(child, { id: child.props.id || id })}
      </div>
      {error && <span className="text-xs font-medium text-red-500/80">{error}</span>}
    </div>
  )
}
