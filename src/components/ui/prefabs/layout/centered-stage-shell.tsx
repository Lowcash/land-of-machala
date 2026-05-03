import { Box } from '@/components/ui/core/layout'
import { RootShell, RootShellFrame } from '@/components/ui/prefabs/layout/root-shell'

type CenteredStageShellProps = {
  children: React.ReactNode
  width?: 'narrow' | 'wide'
}

export function CenteredStageShell({ children, width = 'wide' }: CenteredStageShellProps) {
  return (
    <RootShell>
      <RootShellFrame className="flex flex-1 items-center justify-center" inset="stage">
        <Box as="section" className={width === 'wide' ? 'w-full max-w-5xl' : 'w-full max-w-3xl'}>
          {children}
        </Box>
      </RootShellFrame>
    </RootShell>
  )
}
