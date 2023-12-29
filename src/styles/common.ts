'use client'
import { styled } from '@mui/system'

import { Flex } from './flex'

export const Main = styled(Flex)`
  > * {
    flex: 1;
  }
`
Main.defaultProps = {
  as: 'main',
  direction: 'row',
  spacing: 1,
  fullWidth: true,
  fullHeight: true,
}
