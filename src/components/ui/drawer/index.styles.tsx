// import { ComponentProps } from 'react'
// import { withAttrs } from '~/utils/style'
// // import { SwipeableDrawer, styled } from '@mui/material'

// export type Props = {
//   width?: number | string
//   height?: number | string
//   outerWidth?: number | string
// } & Pick<ComponentProps<typeof SwipeableDrawer>, 'variant' | 'open' | 'anchor'>

// export const Drawer = withAttrs(
//   styled(SwipeableDrawer, {
//     shouldForwardProp: (p) => p !== 'width' && p !== 'height' && p !== 'outerWidth',
//   })<Props>(({ width, height, outerWidth, open }) => ({
//     width: open ? outerWidth : 0,
//     flexShrink: 0,
//     zIndex: 999,
//     ['& .MuiDrawer-paper']: {
//       width,
//       maxWidth: width,
//       height,
//       backgroundColor: 'sandybrown',
//       // color: 'unset',
//       // top: 'unset',
//       // left: 'unset',
//       // right: 'unset',
//       // bottom: 'unset',
//       // border: 'unset',
//     },
//   })),
//   {
//     ModalProps: {
//       keepMounted: true,
//     },
//     onClose: () => {},
//     onOpen: () => {},
//   },
// )
