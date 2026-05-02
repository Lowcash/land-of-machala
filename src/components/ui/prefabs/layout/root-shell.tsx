import Image from 'next/image'

import { SITE_BACKGROUND_PATH } from '@/lib/site-config'

import { Box } from '@/components/ui/core/layout'
import { RootShellFooter } from '@/components/ui/prefabs/layout/root-shell-footer'
import { RootShellHeader } from '@/components/ui/prefabs/layout/root-shell-header'

type RootShellProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

export function RootShell({ children, className = '', ...props }: RootShellProps) {
  return (
    <div
      className={['bg-background relative isolate min-h-screen overflow-hidden', className].join(
        ' '
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-20">
        <Image
          alt="Painterly medieval city backdrop"
          className="object-cover opacity-60"
          fill
          priority
          sizes="100vw"
          src={SITE_BACKGROUND_PATH}
        />
      </div>
      <div className="from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br" />
      <Box className="relative flex min-h-screen flex-col">
        <RootShellHeader />
        <main className="flex flex-1">{children}</main>
        <RootShellFooter />
      </Box>
    </div>
  )
}
