import { Alert as UIAlert, AlertDescription } from './ui/alert'
import { FaExclamationTriangle } from 'react-icons/fa'

interface Props extends Pick<React.ComponentProps<typeof UIAlert>, 'variant'> {}

export default function Alert(p: React.PropsWithChildren<Props>) {
  return (
    <UIAlert variant={p.variant}>
      <FaExclamationTriangle className='h-4 w-4' />
      <AlertDescription className='mt-1.5'>{p.children}</AlertDescription>
    </UIAlert>
  )
}
