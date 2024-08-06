'use client'

import { getUserSession } from '@/server/actions/user'
import { useQuery } from '@tanstack/react-query'

import { GET_USER } from '../_key'

export function useGetUserQuery() {
  return useQuery({
    queryKey: [GET_USER],
    queryFn: () => getUserSession(),
  })
}