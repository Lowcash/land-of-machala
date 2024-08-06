'use client'

import { getUserSession } from '@/server/actions/user'
import { useQuery } from '@tanstack/react-query'

export const GET_USER_KEY = 'get-user-key'

export function useGetUserQuery() {
  return useQuery({
    queryKey: [GET_USER_KEY],
    queryFn: () => getUserSession(),
  })
}