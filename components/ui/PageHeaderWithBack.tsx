import { ArrowLeft } from 'lucide-react'
import type { Route } from 'next'
import Link from 'next/link'

interface PageHeaderWithBackProps {
  href: Route | string
  label: string
}

export function PageHeaderWithBack({ href, label }: PageHeaderWithBackProps) {
  return (
    <div className="sticky top-0 z-30 shrink-0 border-b border-[#8b6f47] bg-black/95 px-4 py-3 backdrop-blur-sm">
      <Link
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        href={href as any}
        className="inline-flex items-center gap-2 text-sm text-[#d4a574] transition-colors hover:text-[#ffd700]"
      >
        <ArrowLeft className="h-4 w-4" />
        {label}
      </Link>
    </div>
  )
}
