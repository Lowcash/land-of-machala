import * as React from 'react'
import { cn } from '@/lib/utils'

interface AuthLayoutProps {
  children: React.ReactNode
}

/**
 * Shared layout for authentication-related pages.
 * Handles background image, overlay, and consistent centering.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-center bg-no-repeat opacity-40" 
        aria-hidden="true" 
      />
      
      {/* Dark Gradient Overlay for readability */}
      <div 
        className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/80" 
        aria-hidden="true" 
      />

      {/* Content wrapper */}
      <div className="relative flex w-full max-w-5xl flex-col items-center justify-center p-6 sm:p-8 lg:p-12">
        {children}
      </div>
    </main>
  )
}
