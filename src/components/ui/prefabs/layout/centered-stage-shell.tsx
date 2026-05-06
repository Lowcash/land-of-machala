import { Box } from '@/components/ui/core/layout'
import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

type CenteredStageShellProps = {
  children: React.ReactNode
}

export function CenteredStageShell({ children }: CenteredStageShellProps) {
  return (
    <RootShell>
      <RootShell.Frame preset="center">
        <Box as="section">{children}</Box>
      </RootShell.Frame>
    </RootShell>
  )
}
