import { styled } from '@mui/system'
import { MenuItem, Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

export const Menu = styled(Flex)``
Menu.defaultProps = {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between',
}

export const Item = styled(MenuItem)`
  justify-content: space-between;
  gap: 16px;
`

export const Text = styled(Typography)``
Text.defaultProps = {
  variant: 'overline',
  color: 'black',
}
