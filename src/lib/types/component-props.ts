export type NativePropsWithoutClassNameStyle<T> = Omit<T, 'className' | 'style'>

export type FormSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>) => void
