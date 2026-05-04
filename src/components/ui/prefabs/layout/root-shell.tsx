import Image from 'next/image'

import clsx from 'clsx'

import { SITE_BACKGROUND_PATH } from '@/lib/site-config'

import { Box } from '@/components/ui/core/layout'
import { RootShellFooter } from '@/components/ui/prefabs/layout/root-shell-footer'
import { RootShellFrame } from '@/components/ui/prefabs/layout/root-shell-frame'
import { RootShellHeader } from '@/components/ui/prefabs/layout/root-shell-header'

export { RootShellFrame } from '@/components/ui/prefabs/layout/root-shell-frame'

type RootShellProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const SHELL_OVERLAY_CLASS =
  'from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br'

type RootShellComponent = typeof RootShellBase & {
  Frame: typeof RootShellFrame
}

export const RootShell: RootShellComponent = Object.assign(RootShellBase, {
  Frame: RootShellFrame,
})

function RootShellBase({ children, className = '', ...props }: RootShellProps) {
  return (
    <div
      className={clsx('bg-background relative isolate min-h-screen overflow-hidden', className)}
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
      <div className={SHELL_OVERLAY_CLASS} />
      <Box className="relative flex min-h-screen flex-col">
        <RootShellHeader />
        <main className="flex flex-1">{children}</main>
        <RootShellFooter />
      </Box>
    </div>
  )
}
