import tw from "tailwind-styled-components"

const _HeaderOuter = tw.header`z-40 h-9 w-screen bg-amber-300`
const _HeaderInner = tw.div`ml-auto w-fit gap-2`

export const Header = ({ children }: React.PropsWithChildren) => (
  <_HeaderOuter>
    <_HeaderInner>{children}</_HeaderInner>
  </_HeaderOuter>
)