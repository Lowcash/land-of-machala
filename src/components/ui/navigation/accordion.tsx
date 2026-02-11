'use client'

import * as React from 'react'
import type { ReactNode } from 'react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/core/stack'
import { Text } from '@/components/ui/core/typography'

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Root ref={ref} className={cn('w-full', className)} {...props} />
))
Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-(--color-secondary)/30 last:border-0', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex flex-1 items-center justify-between rounded-lg border border-(--color-secondary)/50 bg-black/40 px-4 py-3 text-left transition-all hover:bg-(--color-secondary)/10 [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      <Text color="gold" font="fantasy" className="text-lg">
        {children}
      </Text>
      <ChevronDown className="h-4 w-4 shrink-0 text-(--color-primary) transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    {children}
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// ===================================================================
// High-Level Component (Game Accordion)
// ===================================================================

interface GameAccordionItem {
  value: string
  title: string
  content: ReactNode
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
      className={cn('w-full', passthroughOnDesktop && 'lg:space-y-6', className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={cn('border-none', passthroughOnDesktop && 'lg:border-none')}
        >
          <AccordionTrigger className={cn(passthroughOnDesktop && 'lg:hidden')}>
            {item.title}
          </AccordionTrigger>
          <AccordionContent
            forceMount={passthroughOnDesktop ? true : undefined}
            className={cn(
              passthroughOnDesktop && [
                'max-lg:data-[state=closed]:hidden',
                'lg:block! lg:h-auto! lg:overflow-visible lg:pt-0 lg:opacity-100!',
                'lg:data-[state=closed]:animate-none lg:data-[state=open]:animate-none',
              ]
            )}
          >
            <VStack gap="md" pt="sm" lg={{ pt: 'none' }}>
              {item.content}
            </VStack>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
