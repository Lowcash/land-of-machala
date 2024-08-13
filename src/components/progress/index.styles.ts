// import tw from 'twin.macro'
// import styled from '@emotion/styled/macro'

// import { Text } from '@/styles/text'
// import * as ProgressPrimitive from '@radix-ui/react-progress'

// type Color = 'red' | 'green' | 'blue' | 'gold'

// const THEME_MAP: Record<Color, any> = {
//   red: tw`bg-[var(--red)]`,
//   green: tw`bg-[var(--green)]`,
//   blue: tw`bg-[var(--blue)]`,
//   gold: tw`bg-[var(--gold)]`,
// }

// export type ProgressProps = {
//   color?: Color
// }

// export const ProgressIndicator = styled(ProgressPrimitive.Indicator)`
//   ${tw`
//     h-full w-full 
//     flex-1 
//     transition-all
//   `}
// `

// export const ProgressText = styled(Text)`
//   background: rgba(255, 255, 255, 0.45);
//   padding: 0 0.25rem;
//   border-radius: 0.125rem;
//   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
// `

// export const ProgressRoot = styled(ProgressPrimitive.Root, {
//   shouldForwardProp: (p) => p !== 'color',
// })<ProgressProps>`
//   border: 1px solid rgba(0, 0, 0, 0.1);
//   background: var(--gold2);
  
//   ${tw`
//     w-full h-full
//     relative
//     overflow-hidden 
//     rounded-full
//   `}

//   ${ProgressIndicator} {
//     ${({ color }) => THEME_MAP[color ?? 'blue']}
//   }

//   ${ProgressText} {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//   }
// `

