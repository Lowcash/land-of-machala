'use client'

import { styled } from '@mui/system'

import { Flex } from './flex'
import { withAttrs } from '~/utils/style'

export const Main = withAttrs(
  styled(Flex)`
    > * {
      flex: 1;
    }
  `,
  {
    as: 'main',
    direction: 'row',
    fullWidth: true,
    fullHeight: true,
  },
)
