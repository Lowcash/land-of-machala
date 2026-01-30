import { z } from 'zod'

export const buyItemSchema = z.object({
  itemId: z.string().optional(),
  itemName: z.string().optional(),
  price: z.number().int().positive(),
  shopType: z.enum(['smith', 'market', 'black_market']).optional(),
})

export const sellItemSchema = z.object({
  inventoryItemId: z.string(),
  price: z.number().int().positive(),
})

export const purchaseServiceSchema = z.object({
  serviceId: z.string(),
})
