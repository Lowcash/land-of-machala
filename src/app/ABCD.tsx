'use client'

import { getUser } from '@/server/actions/user'
import { useQuery } from '@tanstack/react-query'

export default function ABCD() {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  })

  return <>{userQuery.data?.email}</>
}
