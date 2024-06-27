import { Button } from '@/components/ui/button'
import { PersonIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

const User = () => (
  <Link href={'/api/auth/signout'}>
    <Button variant='outline' size='icon'>
      <PersonIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <PersonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Sign out</span>
    </Button>
  </Link>
)

export default User
