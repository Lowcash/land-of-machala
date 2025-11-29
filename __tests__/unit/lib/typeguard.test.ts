import { describe, it, expect } from 'vitest'
import { isString } from '@/lib/typeguard'

describe('lib/typeguard', () => {
  describe('isString', () => {
    it('should return true for string', () => {
      expect(isString('hello')).toBe(true)
      expect(isString('')).toBe(true)
      expect(isString('123')).toBe(true)
    })

    it('should return false for non-string', () => {
      expect(isString(123)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString(true)).toBe(false)
    })
  })
})
