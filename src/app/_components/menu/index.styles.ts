import { styled } from '@mui/system'
import { Flex } from '~/styles/flex'

export const Menu = styled(Flex)``
Menu.defaultProps = {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between'
}
