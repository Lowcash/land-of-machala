'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as S from './index.styles'
import { Text } from '~/styles/text'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & S.ProgressProps
>(({ className, value, children, ...props }, ref) => {
  const indicatorValue = 100 - (value || 0)

  return  (
    <S.ProgressRoot ref={ref} {...props}>
      <S.ProgressIndicator style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
      {children && <Text>{children}</Text>}
    </S.ProgressRoot>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export default Progress
