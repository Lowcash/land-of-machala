import Image from 'next/image'

import clsx from 'clsx'

import { SITE_BACKGROUND_PATH } from '@/lib/site-config'

import { RootStageFooter } from '@/components/ui/prefabs/layout/root-stage-footer'
import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'
import { RootStageHeader } from '@/components/ui/prefabs/layout/root-stage-header'

type RootStageProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
}

const ROOT_STAGE_OVERLAY_CLASS =
  'from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br'

type RootStageComponent = typeof RootStageBase & {
  Frame: typeof RootStageFrame
}

export const RootStage: RootStageComponent = Object.assign(RootStageBase, {
  Frame: RootStageFrame,
})

function RootStageBase({ children, className = '', ...props }: RootStageProps) {
  return (
    <div
      className={clsx(
        'bg-background relative isolate flex min-h-dvh flex-col overflow-hidden',
        className
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
      <div className={ROOT_STAGE_OVERLAY_CLASS} />
      <RootStageHeader />
      <main className="flex flex-1">{children}</main>
      <RootStageFooter />
    </div>
  )
}
