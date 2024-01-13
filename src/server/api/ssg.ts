import { createServerSideHelpers } from '@trpc/react-query/server'
import { createContext } from '~/trpc/server'
import { appRouter } from './root'
import superjson from 'superjson'

export const ssg = createServerSideHelpers({
  router: appRouter,
  ctx: await createContext(),
  transformer: superjson, // optional - adds superjson serialization
})
