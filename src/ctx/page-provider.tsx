'use client'

import * as React from 'react'

type Page = 'landing' | 'game' | 'inventory' | 'quest'

interface PageContextProps {
  page: Page
  setPage?: (page: Page) => void
}

const PageContext = React.createContext<PageContextProps>({ page: 'landing' })

interface Props {
  signed: boolean
}

export function PageProvider({ children, ...p }: React.PropsWithChildren<Props>) {
  const [page, setPage] = React.useState<Page>(p.signed ? 'game' : 'landing')

  return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>
}

export function usePageContext() {
  return React.useContext(PageContext)
}
