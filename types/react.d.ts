type PropsWithClassName<P = unknown> = P & {
  className?: string
}

type PropsWithChildrenAndClassName<P = unknown> = React.PropsWithChildren<P> & PropsWithClassName<P>
