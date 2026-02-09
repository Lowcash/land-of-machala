import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: number | string
}

export function Loader({ size = 16 }: LoaderProps) {
  return <Loader2 className="animate-spin" size={size} />
}
