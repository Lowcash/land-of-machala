'use client'

import * as React from 'react'

import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

import { HStack, VStack } from './stack'
import { Label } from './typography'

interface CheckboxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  label?: string
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  className,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <HStack gap="sm" align="center">
      <VStack
        as="button"
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        h="5"
        w="5"
        align="center"
        justify="center"
        rounded="sm"
        _internalStyle={{ borderWidth: '2px' }}
        _internalClassName={cn(
          'border-2 transition-all disabled:cursor-not-allowed disabled:opacity-50',
          checked
            ? 'border-[#ffd700] bg-[#ffd700]'
            : 'border-[#8b6f47] bg-black/60 hover:border-[#ffd700]',
          className
        )}
        {...props}
      >
        {checked && <Check className="h-3.5 w-3.5 text-black" />}
      </VStack>
      {label && (
        <Label
          onClick={() => !disabled && onCheckedChange?.(!checked)}
          font="fantasy"
          color="copper"
          _internalClassName={cn(
            'cursor-pointer text-xs transition-colors select-none hover:text-[#ffd700] sm:text-sm',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
        </Label>
      )}
    </HStack>
  )
}
