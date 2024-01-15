import { styled } from '@mui/system'
import { withAttrs } from '~/utils/style'
import { MenuItem, Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

export const Menu = withAttrs(styled(Flex)``, {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between',
})

export const Item = styled(MenuItem)`
  justify-content: space-between;
  gap: 16px;
`

export const Text = withAttrs(styled(Typography)``, {
  variant: 'overline',
  color: 'black',
})
