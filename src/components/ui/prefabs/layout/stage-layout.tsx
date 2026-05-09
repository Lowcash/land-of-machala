import { RootStage, type RootStageShell } from '@/components/ui/prefabs/layout/root-stage'
import type {
  RootStageFrameAs,
  RootStageFramePreset,
} from '@/components/ui/prefabs/layout/root-stage-frame'

type StageLayoutProps = React.PropsWithChildren<{
  frame: RootStageFramePreset
  frameAs?: RootStageFrameAs
  shell?: RootStageShell
  showFooter?: boolean
  showHeader?: boolean
}>

export function StageLayout({
  children,
  frame,
  frameAs = 'main',
  shell = 'default',
  showFooter = true,
  showHeader = true,
}: StageLayoutProps) {
  return (
    <RootStage shell={shell} showFooter={showFooter} showHeader={showHeader}>
      <RootStage.Frame as={frameAs} preset={frame}>
        {children}
      </RootStage.Frame>
    </RootStage>
  )
}
