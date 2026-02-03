import { Card } from '@/components/ui/card'

interface AuthCardProps {
  children: React.ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Card variant="dialog">
      <Card.Content>{children}</Card.Content>
    </Card>
  )
}
