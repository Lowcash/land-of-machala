import React from 'react'
import { cn } from '@/lib/utils'

import { Label } from '@/components/ui/label'

export const H2 = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 {...p} className={cn('text-2xl font-bold', p.className)} />
)
export const H3 = (p: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 {...p} className={cn('text-xl font-bold', p.className)} />
)

interface TextProps {
  bold?: boolean
  light?: boolean
  size?: 'normal' | 'small' | 'large'
  large?: boolean
  italic?: boolean
}

export const Text = <C extends React.ElementType = 'label'>({
  bold,
  light,
  size = 'normal',
  italic,
  ...p
}: React.HtmlHTMLAttributes<HTMLElement> & TextProps & { as?: C }) => {
  const { as: Component = Label } = p

  return (
    <Component
      {...p}
      className={cn(
        size === 'normal' ? 'text-base' : size === 'small' ? 'text-sm' : 'text-xl',
        !!bold && 'font-bold',
        !!light && 'text-gray-500',
        !!italic && 'italic',
        p.className,
      )}
    />
  )
}

export const Link = (p: React.HTMLAttributes<HTMLAnchorElement> & TextProps) => (
  <Text {...p} as='a' className={cn('cursor-pointer hover:text-gray-600', p.className)} />
)

export const Input = React.forwardRef<HTMLInputElement, React.HTMLProps<HTMLInputElement>>((p, ref) => (
  <input {...p} ref={ref} className={cn('max-w-28 rounded-md border-2 bg-transparent pl-2', p.className)} />
))
