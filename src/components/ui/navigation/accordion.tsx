'use client'

import * as React from 'react'
import type { ReactNode } from 'react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import { HStack, VStack } from '@/components/ui/core/stack'
import { Heading, Text } from '@/components/ui/core/typography'

/**
 * Custom Props to avoid exposing Radix primitives to docgen which causes circularity.
 * We explicitly define ONLY what we want to expose.
 */
interface AccordionRootProps {
  children: ReactNode
  type: 'single' | 'multiple'
  defaultValue?: string
  value?: string
  collapsible?: boolean
  className?: string
  onValueChange?: (value: string) => void
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionRootProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Root ref={ref} className={cn('w-full', className)} {...(props as any)} />
  )
)
Accordion.displayName = 'Accordion'

interface AccordionItemProps {
  children: ReactNode
  value: string
  disabled?: boolean
  className?: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('w-full border-b border-(--color-secondary)/30 last:border-0', className)}
      {...props}
    />
  )
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps {
  children: ReactNode
  className?: string
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 cursor-pointer items-center justify-between px-4 py-3.5 text-left transition-all active:scale-[0.99]',
          'font-fantasy text-lg sm:text-xl text-(--color-ivory)/90',
          'border-b border-(--color-secondary)/20 last:border-0',
          'hover:bg-(--color-secondary)/10 hover:text-(--color-primary)',
          'data-[state=open]:bg-(--color-primary)/5 data-[state=open]:text-(--color-primary) [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-(--color-primary) opacity-60 transition-all duration-300 group-hover:opacity-100 group-data-[state=open]:opacity-100" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all',
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = 'AccordionContent'

// ===================================================================
// High-Level Component (Game Accordion)
// ===================================================================

interface GameAccordionItem {
  value: string
  title: string
  content: ReactNode
  selectedLabel?: string
}

interface GameAccordionProps {
  items: GameAccordionItem[]
  defaultValue?: string
  className?: string
  /**
   * If true, accordion headers disappear on desktop (lg+),
   * making content a standard vertical stack.
   */
  passthroughOnDesktop?: boolean
}

export function GameAccordion({
  items,
  defaultValue,
  className,
  passthroughOnDesktop = false,
}: GameAccordionProps) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={cn('flex w-full flex-col gap-3', passthroughOnDesktop && 'lg:gap-4', className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={cn(
            'flex w-full flex-col overflow-hidden rounded-lg border border-(--color-secondary)/30 bg-black/40 transition-all duration-500',
            'shadow-lg data-[state=open]:border-(--color-primary)/50 data-[state=open]:bg-black/80',
            passthroughOnDesktop && 'lg:border-none lg:bg-transparent lg:shadow-none'
          )}
        >
          <AccordionTrigger className={cn('border-none', passthroughOnDesktop && 'lg:hidden')}>
            <div className="flex w-full items-center justify-between gap-2">
              <span>{item.title}</span>
              {item.selectedLabel && (
                <span className="font-fantasy text-xs text-(--color-secondary) decoration-(--color-secondary)/30 underline-offset-4 opacity-80 group-data-[state=open]:opacity-100">
                  {item.selectedLabel}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent
            forceMount={passthroughOnDesktop ? true : undefined}
            className={cn(
              passthroughOnDesktop && [
                'max-lg:data-[state=closed]:hidden',
                'lg:block! lg:h-auto! lg:overflow-visible lg:p-0! lg:opacity-100!',
                'lg:data-[state=closed]:animate-none lg:data-[state=open]:animate-none',
              ]
            )}
          >
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
