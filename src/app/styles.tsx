'use client'

import { styled } from '@mui/material'

import { Flex } from '~/styles/flex'

const _Page = styled(Flex)`
  padding: 24px;
`
export const Page = (p: any) => <_Page direction='column' justifyContent='space-between' fullHeight {...p} />

const _TopContainer = styled(Flex)``
export const TopContainer = (p: any) => <_TopContainer spacing={5} direction='column' fullWidth {...p} />
