import Image from 'next/image'

import clsx from 'clsx'

import { SITE_BACKGROUND_PATH } from '@/lib/site-config'

import { RootStageFooter } from '@/components/ui/prefabs/layout/root-stage-footer'
import { RootStageFrame } from '@/components/ui/prefabs/layout/root-stage-frame'
import { RootStageHeader } from '@/components/ui/prefabs/layout/root-stage-header'

export type RootStageShell = 'auth' | 'default'

type RootStageProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  shell?: RootStageShell
  showFooter?: boolean
  showHeader?: boolean
}

const ROOT_STAGE_BASE_CLASS =
  'bg-background relative isolate flex min-h-dvh flex-col overflow-hidden'

const ROOT_STAGE_OVERLAY_CLASS =
  'from-background/92 via-background/65 to-background/92 absolute inset-0 -z-10 bg-linear-to-br'

const ROOT_STAGE_SHELL_BASE_CLASS =
  'relative z-10 my-auto flex w-full flex-col py-(--inset-item) sm:py-(--inset-panel)'

const ROOT_STAGE_SHELL_CLASS = {
  auth: `${ROOT_STAGE_SHELL_BASE_CLASS} gap-(--gap-stage) lg:mx-auto lg:max-w-[92rem]`,
  default: `${ROOT_STAGE_SHELL_BASE_CLASS} gap-(--gap-stack-lg)`,
} as const

type RootStageComponent = typeof RootStageBase & {
  Frame: typeof RootStageFrame
}

export const RootStage: RootStageComponent = Object.assign(RootStageBase, {
  Frame: RootStageFrame,
})

function RootStageBase({
  children,
  className = '',
  shell = 'default',
  showFooter = true,
  showHeader = true,
  ...props
}: RootStageProps) {
  return (
    <div className={clsx(ROOT_STAGE_BASE_CLASS, className)} {...props}>
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
      <section className={ROOT_STAGE_SHELL_CLASS[shell]}>
        {showHeader ? <RootStageHeader /> : null}
        {children}
        {showFooter ? <RootStageFooter /> : null}
      </section>
    </div>
  )
}
