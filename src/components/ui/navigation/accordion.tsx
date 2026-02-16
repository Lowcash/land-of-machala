'use client'

import * as React from 'react'
import type { ReactNode } from 'react'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

import { VStack } from '@/components/ui/core/stack'
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
    <AccordionPrimitive.Header asChild>
      <Heading level="h2" as="h2" className={cn('w-full', className)}>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'group flex w-full cursor-pointer items-center justify-between rounded-lg border border-(--color-secondary)/50 bg-black/40 px-4 py-3 text-left transition-all hover:bg-(--color-secondary)/10 [&[data-state=open]>svg]:rotate-180'
          )}
          {...props}
        >
          <Text color="gold" font="fantasy" className="text-lg">
            {children}
          </Text>
          <ChevronDown className="h-4 w-4 shrink-0 text-(--color-primary) transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
      </Heading>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps {
  children: ReactNode
  className?: string
  forceMount?: true
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm',
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
      className={cn(
        'flex w-full flex-col gap-4',
        passthroughOnDesktop && 'lg:space-y-4',
        className
      )}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className={cn(
            'flex w-full flex-col border-none',
            passthroughOnDesktop && 'lg:border-none'
          )}
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
            <VStack gap="none" fullWidth>
              {item.content}
            </VStack>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
