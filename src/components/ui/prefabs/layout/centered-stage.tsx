import { Box } from '@/components/ui/core/box'
import { RootStage } from '@/components/ui/prefabs/layout/root-stage'

type CenteredStageProps = React.PropsWithChildren

export function CenteredStage({ children }: CenteredStageProps) {
  return (
    <RootStage>
      <RootStage.Frame preset="center">
        <Box as="section">{children}</Box>
      </RootStage.Frame>
    </RootStage>
  )
}
