'use client'

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (prepare for Sentry integration)
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Call optional error handler
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback

      if (FallbackComponent) {
        return (
          <FallbackComponent error={this.state.error} reset={() => this.setState({ hasError: false, error: null })} />
        )
      }

      return (
        <DefaultErrorFallback error={this.state.error} reset={() => this.setState({ hasError: false, error: null })} />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error: Error
  reset: () => void
}

function DefaultErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center gap-4 p-8'>
      <div className='flex items-center gap-2 text-destructive'>
        <AlertCircle className='h-8 w-8' />
        <h2 className='text-2xl font-bold'>Něco se pokazilo</h2>
      </div>

      <p className='max-w-md text-center text-muted-foreground'>
        {error.message || 'Vyskytla se neočekávaná chyba. Zkuste to prosím znovu.'}
      </p>

      {process.env.NODE_ENV === 'development' && (
        <details className='max-w-2xl rounded border p-4 text-sm'>
          <summary className='cursor-pointer font-semibold'>Technické detaily</summary>
          <pre className='mt-2 overflow-auto text-xs'>{error.stack}</pre>
        </details>
      )}

      <div className='flex gap-2'>
        <Button onClick={() => reset()} variant='warning'>
          Zkusit znovu
        </Button>
        <Button onClick={() => (window.location.href = '/')} variant='default'>
          Zpět na hlavní stránku
        </Button>
      </div>
    </div>
  )
}

export default ErrorBoundary
