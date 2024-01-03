import styled from '@emotion/styled'
import { MenuItem, Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

export const Menu = styled(Flex)``
Menu.defaultProps = {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between',
}
