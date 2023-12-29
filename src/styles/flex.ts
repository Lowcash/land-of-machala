import { styled } from '@mui/system'

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'

type Align = 'baseline' | 'flex-start' | 'center' | 'flex-end'

type JustifyContent = Align | 'space-between'

export interface Props {
  readonly spacing?: number
  readonly direction?: FlexDirection
  readonly alignItems?: Align
  readonly justifyContent?: JustifyContent
  readonly fullWidth?: boolean
  readonly fullHeight?: boolean
}

const DEVICE_GAP = (spacing?: number) => (spacing ? `gap: calc(${spacing} * var(--unit));` : undefined)

export const Flex = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'as' &&
    prop !== 'spacing' &&
    prop !== 'direction' &&
    prop !== 'alignItems' &&
    prop !== 'justifyContent' &&
    prop !== 'fullWidth' &&
    prop !== 'fullHeight',
})<Props>`
  display: flex;

  ${({ fullWidth }) =>
    fullWidth &&
    `
      width: 100%;
    `}

  ${({ fullHeight }) =>
    fullHeight &&
    `
      height: 100%;
    `}

  ${({ justifyContent }) =>
    justifyContent &&
    `
      justify-content: ${justifyContent};
    `}
    
  ${({ alignItems }) =>
    alignItems &&
    `
      align-items: ${alignItems};
    `}

  ${({ direction }) =>
    direction &&
    `
      flex-direction: ${direction};
    `}

  ${({ spacing }) => DEVICE_GAP(spacing)}
`
