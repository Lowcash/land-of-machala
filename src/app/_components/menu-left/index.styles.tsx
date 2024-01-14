import { styled } from '@mui/system'
import { MenuItem, Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

const _Menu = styled(Flex)``
export const Menu = (p: any) => (
  <_Menu as={'aside'} spacing={2} direction='column' justifyContent='space-between' fullHeight {...p} />
)

export const Item = styled(MenuItem)`
  justify-content: space-between;
  gap: 16px;
`

const _Text = styled(Typography)``
export const Text = (p: any) => <_Text variant='oveline' color='black' {...p} />
