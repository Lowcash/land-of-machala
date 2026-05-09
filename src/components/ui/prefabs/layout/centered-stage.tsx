import { Box } from '@/components/ui/core/box'
import { StageLayout } from '@/components/ui/prefabs/layout/stage-layout'

type CenteredStageProps = React.PropsWithChildren

export function CenteredStage({ children }: CenteredStageProps) {
  return (
    <StageLayout frame="center" showFooter={false} showHeader={false}>
      <Box as="section">{children}</Box>
    </StageLayout>
  )
}
