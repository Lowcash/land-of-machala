type PropsWithAttrs<C extends React.ComponentType<any>> = React.ComponentPropsWithRef<C> & { [key: string]: any }

export function withAttrs<C extends React.ComponentType<any>>(Component: C, attrs: PropsWithAttrs<C>) {
  // @ts-ignore
  return (props: PropsWithAttrs<C>): JSX.Element => <Component {...attrs} {...props} />
}
