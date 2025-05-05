'use client'

import { usePlayerShowQuery } from '@/hooks/api/use-player'

import { Text } from '@/styles/typography'
import Button from '@/components/button/Move/Button'

export default function Move() {
  const playerShowQuery = usePlayerShowQuery()

  return (
    <div className='relative flex h-36 w-full items-center justify-center gap-2 [&>*]:absolute'>
      <Button direction='up' className='-mt-16 h-14 w-24 border shadow-lg' />
      <Button direction='down' className='-mb-16 h-14 w-24 border shadow-lg' />
      <Button direction='left' className='-mb-16 -ml-52 h-14 w-24 border shadow-lg' />
      <Button direction='right' className='-mb-16 -mr-52 h-14 w-24 border shadow-lg' />
    </div>
  )
}
