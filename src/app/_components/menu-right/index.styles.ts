import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Flex } from '~/styles/flex'

export const Text = styled(Typography)``
Text.defaultProps = {
  variant: 'overline',
  color: 'black',
}

export const Menu = styled(Flex)``
Menu.defaultProps = {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between',
  fullHeight: true
}

export const ButtonsContainer = styled(Flex)`
  height: 350px;

  position: relative;
  button {
    position: absolute;
  }
`
ButtonsContainer.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
}

export const PositionsContainer = styled(Flex)``
PositionsContainer.defaultProps = {
  spacing: 2,
  justifyContent: 'center',
}

export const SettingsContainer = styled(Flex)`
  height: 350px;

  position: relative;
  button {
    position: absolute;
  }
`
SettingsContainer.defaultProps = {
  alignItems: 'center',
  justifyContent: 'center',
}
