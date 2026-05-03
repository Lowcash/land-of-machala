import { Box } from '@/components/ui/core/layout'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

type CenteredStageShellProps = {
  children: React.ReactNode
}

export function CenteredStageShell({ children }: CenteredStageShellProps) {
  return (
    <RootShell>
      <RootShell.Frame inset="stage" preset="stage-center">
        <Box as="section" className="w-full max-w-5xl">
          {children}
        </Box>
      </RootShell.Frame>
    </RootShell>
  )
}
