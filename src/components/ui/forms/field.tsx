import * as React from 'react'

import { cn } from '../../../lib/utils'
import { Label } from './label'

interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  error?: string
  children: React.ReactNode
}

export function Field({ label, error, children, className, ...props }: FieldProps) {
  const id = React.useId()
  const child = React.Children.only(children) as React.ReactElement & {
    props: { id?: string }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {React.cloneElement(child, { id: child.props.id || id })}
      {error && (
        <span className="text-xs font-medium text-red-500/80">{error}</span>
      )}
    </div>
  )
}
