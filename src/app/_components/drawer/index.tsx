import React, { PropsWithChildren } from 'react'
import * as S from './index.styles'

type Props = {
  onOpen?: () => void
  onClose?: () => void
} & S.Props

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
    <S.Drawer
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
    </S.Drawer>
  )
}
