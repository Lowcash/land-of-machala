'use client'

import { useTheme } from 'next-themes'
import { ToastContainer, type ToastContainerProps, Bounce } from 'react-toastify'

export { toast } from 'react-toastify'

export function ToastProvider({ children }: React.PropsWithChildren) {
  const { theme } = useTheme()

  return (
    <>
      {children}
      <ToastContainer {...SETTINGS} theme={theme} />
    </>
  )
}

const SETTINGS: ToastContainerProps = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: false,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  transition: Bounce,
}
