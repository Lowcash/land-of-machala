import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { Flex } from '~/styles/flex'
import { withAttrs } from '~/utils/style'

export const Text = withAttrs(styled(Typography)``, {
  variant: 'overline',
  color: 'black',
})

export const Menu = withAttrs(styled(Flex)``, {
  as: 'aside',
  spacing: 2,
  direction: 'column',
  justifyContent: 'space-between',
  fullHeight: true,
})

export const ButtonsContainer = withAttrs(
  styled(Flex)`
    height: 350px;

    position: relative;
    button {
      position: absolute;
    }
  `,
  {
    alignItems: 'center',
    justifyContent: 'center',
  },
)

export const PositionsContainer = withAttrs(styled(Flex)``, { spacing: 2, justifyContent: 'center' })

export const SettingsContainer = withAttrs(
  styled(Flex)`
    height: 350px;

    position: relative;
    button {
      position: absolute;
    }
  `,
  { alignItems: 'center', justifyContent: 'center' },
)
