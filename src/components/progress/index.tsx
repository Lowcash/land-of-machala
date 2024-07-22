'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as S from './index.styles'

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & S.ProgressProps
type Handle = React.ElementRef<typeof ProgressPrimitive.Root>

export default React.forwardRef<Handle, Props>(({ className, value, max, children, ...props }, ref) => {
  const indicatorValue = 100 - ((value ?? 0) / (max ?? 100)) * 100

  return (
    <S.ProgressRoot ref={ref} {...props}>
      <S.ProgressIndicator style={{ transform: `translateX(-${indicatorValue}%)` }} />
      {children && (
        <S.ProgressText>
          <div style={{ marginTop: 3 }}>{children}</div>
        </S.ProgressText>
      )}
    </S.ProgressRoot>
  )
})