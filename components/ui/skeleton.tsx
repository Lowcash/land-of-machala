import { VStack } from './stack'

interface SkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  width?: string | number
  height?: string | number
  circle?: boolean
}

function Skeleton({ width, height, circle, style, ...props }: SkeletonProps) {
  return (
    <VStack
      rounded={circle ? 'full' : 'md'}
      _internalClassName="bg-primary/10 animate-pulse"
      _internalStyle={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
