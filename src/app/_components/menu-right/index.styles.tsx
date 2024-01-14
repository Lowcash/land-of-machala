import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

const _Text = styled(Typography)``
export const Text = (p: any) => <_Text variant='overline' color='black' {...p} />

const _Menu = styled(Flex)``
export const Menu = (p: any) => (
  <_Menu as={'aside'} spacing={2} direction='column' justifyContent='space-between' fullHeight {...p} />
)

const _ButtonsContainer = styled(Flex)`
  height: 350px;

  position: relative;
  button {
    position: absolute;
  }
`
export const ButtonsContainer = (p: any) => <_ButtonsContainer alignItems='center' justifyContent='center' {...p} />

const _PositionsContainer = styled(Flex)``
export const PositionsContainer = (p: any) => <_PositionsContainer spacing={2} justifyContent='center' {...p} />

const _SettingsContainer = styled(Flex)`
  height: 350px;

  position: relative;
  button {
    position: absolute;
  }
`
export const SettingsContainer = (p: any) => <_SettingsContainer alignItems='center' justifyContent='center' {...p} />
