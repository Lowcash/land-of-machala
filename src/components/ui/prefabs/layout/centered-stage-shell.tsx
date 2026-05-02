import { RootShell } from '@/components/ui/prefabs/layout/root-shell'

type CenteredStageShellProps = {
  children: React.ReactNode
  width?: 'narrow' | 'wide'
}

export function CenteredStageShell({ children, width = 'wide' }: CenteredStageShellProps) {
  return (
    <RootShell>
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 py-10 md:px-10 md:py-14">
        <section className={width === 'wide' ? 'w-full max-w-5xl' : 'w-full max-w-3xl'}>
          {children}
        </section>
      </div>
    </RootShell>
  )
}
