'use client'

import { usePlayerMoveMutation } from '@/hooks/api/use-player'

import {
  RxChevronUp,
  RxChevronDown,
  RxChevronLeft,
  RxChevronRight,
  RxReader,
  RxBackpack,
  RxMagicWand,
  RxGroup,
} from 'react-icons/rx'
import { Footer } from '@/styles/common'
import { Button } from '@/components/ui/button'

import { DIRECTIONS } from '@/config'

export default function Action() {
  const playerMoveMutation = usePlayerMoveMutation()

  const handleMove = (direction: (typeof DIRECTIONS)[number]) => playerMoveMutation.mutate({ direction })

  return (
    <Footer>
      <Button
        className='col-start-5 row-start-1 h-12 w-12 border shadow-lg'
        variant='warning'
        size='icon-lg'
        onClick={() => handleMove('up')}
      >
        <RxChevronUp size={'2em'} />
      </Button>
      <Button
        className='col-start-5 row-start-3 h-12 w-12 border shadow-lg'
        variant='warning'
        size='icon-lg'
        onClick={() => handleMove('down')}
      >
        <RxChevronDown size={'2em'} />
      </Button>
      <Button
        className='col-start-3 row-start-2 h-12 w-12 border shadow-lg'
        variant='warning'
        size='icon-lg'
        onClick={() => handleMove('left')}
      >
        <RxChevronLeft size={'2em'} />
      </Button>
      <Button
        className='col-start-7 row-start-2 h-12 w-12 border shadow-lg'
        variant='warning'
        size='icon-lg'
        onClick={() => handleMove('right')}
      >
        <RxChevronRight size={'2em'} />
      </Button>

      <Button className='col-start-11 row-start-1 h-12 w-12 border shadow-lg' variant='warning' size='icon-lg'>
        <RxReader size={'2em'} />
      </Button>
      <Button className='col-start-11 row-start-2 h-12 w-12 border shadow-lg' variant='warning' size='icon-lg'>
        <RxMagicWand size={'2em'} />
      </Button>
      <Button className='col-start-11 row-start-3 h-12 w-12 border shadow-lg' variant='warning' size='icon-lg'>
        <RxBackpack size={'2em'} />
      </Button>

      <Button className='col-start-1 row-start-1 h-12 w-12 border shadow-lg' size='icon-lg'>
        <RxGroup size={'2em'} />
      </Button>
      <Button className='col-start-9 row-start-1 h-12 w-12 border shadow-lg' size='icon-lg'>
        <RxGroup size={'2em'} />
      </Button>
    </Footer>
  )
}
