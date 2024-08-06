import { getUserSession } from '@/server/actions/user'
import { QueryClient } from '@tanstack/react-query'

import { GET_USER } from '../_key'

export function prefetchGetUserQuery(query: QueryClient) {
  return query.prefetchQuery({
    queryKey: [GET_USER],
    queryFn: () => getUserSession(),
  })
}
