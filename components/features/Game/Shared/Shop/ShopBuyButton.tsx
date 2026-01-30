'use client'

import { ShoppingCart } from 'lucide-react'

import { useServerAction } from '@/lib/hooks/ui/useServerAction'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface ShopBuyButtonProps {
  price: number
  canAfford: boolean
  // We accept any promise that resolves to [result, error] tuple or similar compatible with useServerAction
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: () => Promise<any>
  fullWidth?: boolean
}

export function ShopBuyButton({ price, canAfford, action, fullWidth }: ShopBuyButtonProps) {
  const { execute, isPending } = useServerAction({
    shouldRefresh: true,
  })

  return (
    <Button
      variant={canAfford ? 'default' : 'outline'}
      size="sm"
      className={cn('gap-2 transition-all', !canAfford && 'opacity-50', fullWidth && 'w-full')}
      disabled={!canAfford || isPending}
      onClick={() => execute(action)}
    >
      <ShoppingCart className="h-4 w-4" />
      <span>{price}g</span>
    </Button>
  )
}
