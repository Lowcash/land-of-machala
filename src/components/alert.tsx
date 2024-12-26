import { Alert as UIAlert, AlertDescription } from './ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface Props extends Pick<React.ComponentProps<typeof UIAlert>, 'variant'> {}

export default function Alert(p: React.PropsWithChildren<Props>) {
  return (
    <UIAlert variant={p.variant}>
      <ExclamationTriangleIcon className='h-4 w-4' />
      <AlertDescription className='mt-1.5'>{p.children}</AlertDescription>
    </UIAlert>
  )
}
