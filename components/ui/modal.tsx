'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/stack'

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen = true, children, className }: ModalProps) {
  if (!isOpen) return null

  return (
    <VStack
      align="center"
      justify="center"
      p="md"
      _internalClassName={cn('fixed inset-0 z-50 animate-in fade-in duration-200', className)}
    >
      <VStack
        backdrop
        bg="black-80"
        position="absolute"
        inset="0"
        _internalClassName="cursor-pointer"
        // onClick={onClose} // Optional: close on backdrop click
      />
      <VStack
        position="relative"
        fullWidth
        _internalClassName="max-w-2xl animate-in zoom-in-95 duration-200"
      >
        {children}
      </VStack>
    </VStack>
  )
}

interface ModalContentProps {
  children: React.ReactNode
  variant?: 'default' | 'dialog' | 'muted'
  className?: string
}

function ModalContent({ children, variant = 'dialog', className }: ModalContentProps) {
  return (
    <Card variant={variant} _internalClassName={className}>
      {children}
    </Card>
  )
}

function ModalHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card.Header _internalClassName={className}>{children}</Card.Header>
}

function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card.Content _internalClassName={className}>{children}</Card.Content>
}

function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card.Footer _internalClassName={className}>{children}</Card.Footer>
}

Modal.Content = ModalContent
Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter
