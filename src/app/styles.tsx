'use client'

import { styled } from '@mui/material'

import { Flex } from '~/styles/flex'

const _Page = styled(Flex)`
  padding: 24px;
`
export const Page = (p: any) => <_Page spacing={5} direction='column' {...p} />
