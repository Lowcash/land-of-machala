import { ComponentProps } from 'react'
import { SwipeableDrawer, styled } from '@mui/material'

export type Props = {
  width?: number | string
  height?: number | string
  outerWidth?: number | string
} & Pick<ComponentProps<typeof SwipeableDrawer>, 'variant' | 'open' | 'anchor'>

const _Drawer = styled(SwipeableDrawer, {
  shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'outerWidth',
})<Props>(({ width, height, outerWidth, open }) => ({
  width: open ? outerWidth : 0,
  flexShrink: 0,
  zIndex: 999,
  ['& .MuiDrawer-paper']: {
    width,
    maxWidth: width,
    height,
    backgroundColor: 'sandybrown',
    // color: 'unset',
    // top: 'unset',
    // left: 'unset',
    // right: 'unset',
    // bottom: 'unset',
    // border: 'unset',
  },
}))

export const Drawer = (p: any) => (
  <_Drawer
    ModalProps={{
      keepMounted: true,
    }}
    {...p}
  />
)
