import React from 'react'
import tw from 'twin.macro'

const _MenuOuter = tw.div`
  flex flex-col justify-between
  h-screen
`

const _MenuInner = tw.div`
  flex flex-col justify-between
  gap-4
`

type MenuProps = {
  append?: JSX.Element
}

export const Menu = ({ children, append }: React.PropsWithChildren<MenuProps>) => (
  <_MenuOuter>
    <_MenuInner>{children}</_MenuInner>
    {append}
  </_MenuOuter>
)

export const Section = tw.div`
  flex flex-col
`

export const Item = tw.div`
  inline-flex justify-between
  w-full
  gap-1
`

export const Text = tw.label`
  text-gray-500
`
