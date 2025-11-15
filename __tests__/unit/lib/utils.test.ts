import { describe, it, expect } from 'vitest'
import { cn, random, clamp } from '@/lib/utils'

describe('lib/utils', () => {
  describe('cn (className merger)', () => {
    it('should merge class names', () => {
      expect(cn('btn', 'btn-primary')).toBe('btn btn-primary')
    })

    it('should handle conditional classes', () => {
      expect(cn('btn', false && 'hidden', 'active')).toBe('btn active')
    })

    it('should deduplicate Tailwind classes', () => {
      const result = cn('p-4 p-2')
      expect(result).toBe('p-2') // Later class wins
    })
  })

  describe('random', () => {
    it('should generate number in range', () => {
      const result = random(10, 5)
      expect(result).toBeGreaterThanOrEqual(5)
      expect(result).toBeLessThan(10)
    })

    it('should generate from 0 when no from specified', () => {
      const result = random(10)
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThan(10)
    })

    it('should handle same from and to', () => {
      const result = random(5, 5)
      expect(result).toBe(5)
    })
  })

  describe('clamp', () => {
    it('should clamp value above max', () => {
      expect(clamp(150, 0, 100)).toBe(100)
    })

    it('should clamp value below min', () => {
      expect(clamp(-10, 0, 100)).toBe(0)
    })

    it('should not clamp value in range', () => {
      expect(clamp(50, 0, 100)).toBe(50)
    })

    it('should use default min and max', () => {
      expect(clamp(150)).toBe(100) // max default = 100
      expect(clamp(-10)).toBe(0) // min default = 0
    })
  })
})
