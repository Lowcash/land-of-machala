import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'

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

export default function Progress({ value, theme }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <_Progress variant='determinate' value={value} theme_={theme} />
    </Box>
  )
}

const _Progress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'theme_',
})<{ theme_?: ThemeT }>(({ theme, theme_ }) => ({
  height: 10,
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
