import React, { ComponentProps, PropsWithChildren } from 'react'
import { SwipeableDrawer, styled } from '@mui/material'

type Props = {
  onOpen?: () => void
  onClose?: () => void
} & Pick<ComponentProps<typeof SwipeableDrawer>, 'variant' | 'open' | 'anchor'> &
  _Props

export default function Drawer({
  width = 200,
  height,
  outerWidth = width,
  variant = 'persistent',
  open,
  anchor,
  children,
  onOpen,
  onClose,
}: PropsWithChildren<Props>) {
  return (
    <_Drawer
      open={open}
      variant={variant}
      anchor={anchor}
      width={width}
      height={height}
      outerWidth={outerWidth}
      onClose={() => onClose?.()}
      onOpen={() => onOpen?.()}
    >
      {children}
    </_Drawer>
  )
}

type _Props = {
  width?: number | string
  height?: number | string
  outerWidth?: number | string
}

const _Drawer = styled(SwipeableDrawer, {
  shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'outerWidth',
})<_Props>(({ width, height, outerWidth, open }) => ({
  width: open ? outerWidth : 0,
  flexShrink: 0,
  zIndex: 999,
  ['& .MuiDrawer-paper']: {
    width,
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
_Drawer.defaultProps = {
  ModalProps: {
    keepMounted: true, // Better open performance on mobile
  },
}
