import { ComponentProps, PropsWithChildren } from 'react'
import { Alert as UIAlert, AlertDescription } from './ui/alert'
import { SketchLogoIcon } from '@radix-ui/react-icons'

interface Props extends Pick<ComponentProps<typeof UIAlert>, 'variant'> {}

export default function Alert({ children, variant }: PropsWithChildren<Props>) {
  return (
    <UIAlert variant={variant}>
      <SketchLogoIcon className='h-4 w-4' />
      <AlertDescription>{children}</AlertDescription>
    </UIAlert>
  )
}
