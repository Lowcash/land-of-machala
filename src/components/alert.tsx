import React from 'react'
import { Alert as UIAlert, AlertDescription } from './ui/alert'
import { SketchLogoIcon } from '@radix-ui/react-icons'

type Props = Pick<React.ComponentProps<typeof UIAlert>, 'variant'>

export function Alert({ children, variant }: React.PropsWithChildren<Props>) {
  return (
    <UIAlert variant={variant}>
      <SketchLogoIcon className='h-4 w-4' />
      <AlertDescription>{children}</AlertDescription>
    </UIAlert>
  )
}
