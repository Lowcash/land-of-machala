'use client'

import { styled } from '@mui/system'

import { Flex } from './flex'

const _Main = styled(Flex)`
  > * {
    flex: 1;
  }
`

export const Main = (p: any) => <_Main as='main' direction='row' fullWidth fullHeight {...p} />
