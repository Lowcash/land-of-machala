'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as S from './index.styles'
import { Text } from '~/styles/text'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & S.ProgressProps
>(({ className, value, max, children, ...props }, ref) => {
  const indicatorValue = ((value ?? 0) / (max ?? 100)) * 100

  return (
    <S.ProgressRoot ref={ref} {...props}>
      <S.ProgressIndicator style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {children && <Text className='text'>{children}</Text>}
    </S.ProgressRoot>
  )
})

export default Progress
