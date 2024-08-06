'use client'

import React, { useEffect } from 'react'

import { COLOR_BUTTON_COLOR_KEY, ColorButton } from '.'

interface Props {
  color: string
}

export default function Button(p: Props) {
  const [num, setNum] = React.useState(0)

  const buttonRef = React.useRef<React.ElementRef<typeof ColorButton>>(null)
  const colorRef = React.useRef(p.color)

  const handleToggle = () => {
    if (buttonRef.current && buttonRef.current) {
      colorRef.current = colorRef.current === 'yellow' ? 'blue' : 'yellow'
      buttonRef.current.style.setProperty(COLOR_BUTTON_COLOR_KEY, colorRef.current)

      // console.log(colorRef.current)

      setNum((prev) => prev + 1)
    }
  }

  useEffect(() => {
    console.log(`enter ${num}`)
    return () => {
      console.log(`exit ${num}`)
    }
  }, [num])

  return (
    <ColorButton ref={buttonRef} onClick={handleToggle} style={{ [COLOR_BUTTON_COLOR_KEY as any]: colorRef.current }}>
      Toggle
    </ColorButton>
  )
}
