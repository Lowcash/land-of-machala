'use client'

import { useGetUserQuery } from '@/data/user/client'

export default function ABCD() {
  const userQuery = useGetUserQuery()

  return <>{userQuery.data?.email}</>
}
