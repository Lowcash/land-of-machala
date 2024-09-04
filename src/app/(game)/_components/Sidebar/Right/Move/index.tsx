import * as S from './styles'
import Button from './Button'
import { FaChevronUp, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Move() {
  return (
    <S.Move>
      <Button direction='up' className='-mt-28'>
        <FaChevronUp />
      </Button>
      <Button direction='down' className='-mb-28'>
        <FaChevronDown />
      </Button>
      <Button direction='left' className='-ml-28'>
        <FaChevronLeft />
      </Button>
      <Button direction='right' className='-mr-28'>
        <FaChevronRight />
      </Button>
    </S.Move>
  )
}
