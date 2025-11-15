import { Skeleton } from '@/components/ui/skeleton'

export default function GameLoading() {
  return (
    <div className='flex min-h-[600px] flex-col gap-4 p-8'>
      {/* Character info skeleton */}
      <div className='flex items-center gap-4'>
        <Skeleton className='h-16 w-16 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-6 w-32' />
          <Skeleton className='h-4 w-48' />
        </div>
      </div>

      {/* Stats skeleton */}
      <div className='grid grid-cols-3 gap-4'>
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-20 w-full' />
      </div>

      {/* Main content skeleton */}
      <div className='flex-1'>
        <Skeleton className='h-full w-full' />
      </div>

      {/* Actions skeleton */}
      <div className='flex gap-2'>
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
        <Skeleton className='h-10 w-24' />
      </div>
    </div>
  )
}
