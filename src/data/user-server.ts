import { getUserSession } from '@/server/actions/user'
import { QueryClient } from '@tanstack/react-query'

import { GET_USER_KEY } from './user'

export function prefetchGetUserQuery(query: QueryClient) {
  return query.prefetchQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getUserSession(),
  })
}
