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
}

export const Text = <C extends React.ElementType = 'label'>(
  p: React.HtmlHTMLAttributes<HTMLElement> & TextProps & { as?: C },
) => {
  const { as: Component = Label } = p

  return (
    <Component {...p} className={cn('text-base', !!p.bold && 'font-bold', !!p.light && 'text-gray-500', p.className)} />
  )
}

export const Link = (p: React.HTMLAttributes<HTMLAnchorElement> & TextProps) => (
  <Text {...p} as='a' className={cn('cursor-pointer hover:text-gray-600', p.className)} />
)

export const Input = (p: React.HTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={cn('max-w-28 rounded-md border-2 bg-transparent pl-2', p.className)} />
)
