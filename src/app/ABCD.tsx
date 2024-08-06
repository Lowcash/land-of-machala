'use client'

import { useGetUserQuery } from '@/data/user'

export default function ABCD() {
  const userQuery = useGetUserQuery()

  return <>{userQuery.data?.email}</>
}
