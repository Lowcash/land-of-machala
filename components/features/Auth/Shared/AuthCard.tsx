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
        'w-full max-w-md overflow-hidden rounded-lg border-2 border-[#d4a574] bg-black/90 shadow-2xl backdrop-blur-md',
        className
      )}
    >
      <CardContent className="p-4 sm:p-6">{children}</CardContent>
    </Card>
  )
}
