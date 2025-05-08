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

interface Props {
  type?: 'move' | 'move_disabled' | 'combat_start' | 'combat_attack' | 'combat_run_away'
}

export default function Action({ type = 'move' }: Props) {
  const playerMoveMutation = usePlayerMoveMutation()

  const handleMove = (direction: (typeof DIRECTIONS)[number]) => playerMoveMutation.mutate({ direction })

  return (
    <Footer>
      <div className='grid h-full grid-cols-9 grid-rows-3 justify-items-center w-[15rem]'>
        {(type === 'move' || type === 'move_disabled' || type === 'combat_run_away') && (
          <>
            {/* Up */}
            <Button
              className='col-start-5 row-start-1 h-12 w-12 border shadow-lg'
              variant='warning'
              size='icon-lg'
              onClick={() => handleMove('up')}
              disabled={type === 'move_disabled'}
            >
              <RxChevronUp size={'2em'} />
            </Button>
            {/* Down */}
            <Button
              className='col-start-5 row-start-3 h-12 w-12 border shadow-lg'
              variant='warning'
              size='icon-lg'
              onClick={() => handleMove('down')}
              disabled={type === 'move_disabled'}
            >
              <RxChevronDown size={'2em'} />
            </Button>
            {/* Left */}
            <Button
              className='col-start-3 row-start-2 h-12 w-12 border shadow-lg'
              variant='warning'
              size='icon-lg'
              onClick={() => handleMove('left')}
              disabled={type === 'move_disabled'}
            >
              <RxChevronLeft size={'2em'} />
            </Button>
            {/* Right */}
            <Button
              className='col-start-7 row-start-2 h-12 w-12 border shadow-lg'
              variant='warning'
              size='icon-lg'
              onClick={() => handleMove('right')}
              disabled={type === 'move_disabled'}
            >
              <RxChevronRight size={'2em'} />
            </Button>
          </>
        )}

        {type === 'combat_attack' && (
          <>
            {/* Attack 1 */}
            <Button className='col-start-2 row-start-3 h-12 w-12 border shadow-lg' size='icon-lg'>
              <RxGroup size={'2em'} />
            </Button>
            {/* Attack 2 */}
            <Button className='col-start-4 row-start-3 h-12 w-12 border shadow-lg' size='icon-lg'>
              <RxGroup size={'2em'} />
            </Button>
            {/* Attack 3 */}
            <Button className='col-start-6 row-start-3 h-12 w-12 border shadow-lg' size='icon-lg'>
              <RxGroup size={'2em'} />
            </Button>
            {/* Attack 4 */}
            <Button className='col-start-8 row-start-3 h-12 w-12 border shadow-lg' size='icon-lg'>
              <RxGroup size={'2em'} />
            </Button>
          </>
        )}

        {/* Action 1 */}
        <Button className='col-start-2 row-start-1 h-12 w-12 border shadow-lg' size='icon-lg'>
          <RxGroup size={'2em'} />
        </Button>
        {/* Action 2 */}
        <Button className='col-start-8 row-start-1 h-12 w-12 border shadow-lg' size='icon-lg'>
          <RxGroup size={'2em'} />
        </Button>
      </div>

      <div className='grid h-full grid-cols-1 grid-rows-3 justify-items-center'>
        {/* Quests */}
        <Button className='col-start-1 row-start-1 h-12 w-12 border shadow-lg' variant='warning' size='icon-lg'>
          <RxReader size={'2em'} />
        </Button>
        {/* Talents */}
        <Button
          className='col-start-1 row-start-2 h-12 w-12 border shadow-lg'
          variant='warning'
          size='icon-lg'
          disabled={type === 'combat_start' || type === 'combat_attack' || type === 'combat_run_away'}
        >
          <RxMagicWand size={'2em'} />
        </Button>
        {/* Inventory */}
        <Button
          className='col-start-1 row-start-3 h-12 w-12 border shadow-lg'
          variant='warning'
          size='icon-lg'
          disabled={type === 'combat_start' || type === 'combat_attack' || type === 'combat_run_away'}
        >
          <RxBackpack size={'2em'} />
        </Button>
      </div>
    </Footer>
  )
}
