import { cn } from '@/lib/utils'

import { Card, CardContent } from '@/components/ui/card'

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card
      className={cn(
        'border-double-gold w-full max-w-md overflow-hidden bg-black/40 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  )
}
