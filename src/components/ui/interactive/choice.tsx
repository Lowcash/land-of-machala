import * as React from 'react'
import { cn } from '../../../lib/utils'
import { Button } from '../core/button'
import { Badge } from '../core/badge'

interface ChoiceProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number | string
  title: string
  description?: string
}

const Choice = React.forwardRef<HTMLButtonElement, ChoiceProps>(
  ({ index, title, description, className, ...props }, ref) => {
    const letter = typeof index === 'number' ? String.fromCharCode(65 + index) : index

    return (
      <Button
        ref={ref}
        variant="secondary"
        className={cn(
          'group flex min-h-16 w-full transform items-start justify-start p-4 text-left transition-all hover:scale-[1.02] hover:border-(--color-primary) hover:bg-(--color-primary)/10',
          className
        )}
        style={{ fontFamily: 'var(--font-fantasy)' }}
        {...props}
      >
        <div className="flex items-center gap-4">
          <Badge
            variant="outline-secondary"
            className="h-8 w-8 text-sm group-hover:border-(--color-primary) group-hover:text-(--color-primary)"
          >
            {letter}
          </Badge>
          <div className="flex flex-col items-start gap-1">
            <span className="text-base font-medium text-(--color-ivory) group-hover:text-(--color-primary)">
              {title}
            </span>
            {description && (
              <span className="text-xs text-(--color-secondary)/80">
                {description}
              </span>
            )}
          </div>
        </div>
      </Button>
    )
  }
)
Choice.displayName = 'Choice'

export { Choice }
