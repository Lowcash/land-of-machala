import { Link } from '@/i18n/routing'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ActionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string
  icon?: LucideIcon
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function ActionLink({ href, icon: Icon, children, onClick, ...props }: ActionLinkProps) {
  const content = (
    <>
      {Icon && (
        <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
      <span>{children}</span>
    </>
  )

  const commonClasses = cn(
    'group flex flex-row items-center gap-2 text-sm text-(--color-secondary) no-underline transition-colors hover:text-(--color-primary) hover:underline'
  )

  if (href) {
    return (
      <Link href={href} className={commonClasses} {...(props as any)}>
        {content}
      </Link>
    )
  }

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
      }}
      className={commonClasses}
      {...props}
    >
      {content}
    </a>
  )
}
