import { ComponentProps, PropsWithChildren } from 'react'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Typography } from '@mui/material'
import { StyledComponent } from '@emotion/styled'

type ThemeT = 'red' | 'green' | 'blue' | 'orange'

const ThemeMap: Record<ThemeT, string> = {
  red: 'red',
  green: 'green',
  blue: '#1a90ff',
  orange: 'orange',
}

type Props = {
  value: number
  theme?: ThemeT
}

export default function Progress({ value, theme, children }: PropsWithChildren<Props>) {
  return (
    <_ProgressWrap>
      <_Progress variant='determinate' value={value} theme_={theme} />
      {children && <Text>{children}</Text>}
    </_ProgressWrap>
  )
}

const _Progress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'theme_',
})<{ theme_?: ThemeT }>(({ theme, theme_ }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    backgroundColor: ThemeMap[theme_ ?? 'blue'],
  },
}))

const _ProgressWrap = styled('div')`
  position: relative;
  h5 {
    position: absolute;

    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const _Text = styled(Typography)``
const Text = (p: any) => <_Text variant='h5' color='text.secondary' {...p} />
