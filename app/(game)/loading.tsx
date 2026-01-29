import { PageLayout } from '@/components/layout/PageLayout'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <PageLayout
      header={
        <div className="flex items-center gap-4 border-b border-[#8b6f47]/30 bg-black/40 p-4 backdrop-blur-md">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        </div>
      }
      footer={
        <div className="border-t border-[#8b6f47]/30 bg-black/80 px-4 py-2">
          <div className="mx-auto flex max-w-lg justify-between gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      }
    >
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Main Content Skeleton */}
          <div className="space-y-4 lg:col-span-2">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-[150px] w-full rounded-lg" />
              <Skeleton className="h-[150px] w-full rounded-lg" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-4 lg:col-span-1">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
