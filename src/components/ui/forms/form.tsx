'use client'

import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type FormHTMLAttributes,
  type HTMLAttributes,
  createContext,
  useContext,
  useId,
} from 'react'

import { Slot } from '@radix-ui/react-slot'
import {
  Control,
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'
import { UseFormReturn } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { StackProps, getStackClasses } from '../core/stack'
import { Checkbox } from './checkbox'
import { Input } from './input'
import { Label } from './label'

type FormHTMLProps = FormHTMLAttributes<HTMLFormElement>

interface FormRootProps<TFieldValues extends FieldValues>
  extends
    Omit<FormHTMLProps, 'onSubmit' | 'className' | keyof StackProps>,
    Omit<StackProps, 'onSubmit'> {
  form: UseFormReturn<TFieldValues>
  onSubmit: (values: TFieldValues) => void | Promise<void>
}

const FormRoot = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  display,
  direction = 'col',
  cols,
  align,
  justify,
  gap = 'md',
  fullWidth,
  fullHeight,
  wrap,
  p,
  flex,
  className,
  ...props
}: FormRootProps<TFieldValues>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          getStackClasses({
            display,
            direction,
            cols,
            align,
            justify,
            gap,
            fullWidth,
            fullHeight,
            wrap,
            p,
            flex,
          }),
          className
        )}
        {...props}
      >
        {children}
      </form>
    </Form>
  )
}

// --- Helpers ---

interface FormFieldContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  label?: string
  horizontal?: boolean
  children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode
}

const FormFieldContainer = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  horizontal,
  children,
}: FormFieldContainerProps<TFieldValues, TName>) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem horizontal={horizontal}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>{children(field)}</FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ComponentPropsWithoutRef<typeof Input>, 'name'> {
  name: TName
  label?: string
  control: Control<TFieldValues>
}

const FormInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  control,
  ...props
}: FormInputProps<TFieldValues, TName>) => {
  return (
    <FormFieldContainer control={control} name={name} label={label}>
      {(field) => <Input {...props} {...field} />}
    </FormFieldContainer>
  )
}

interface FormCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<ComponentPropsWithoutRef<typeof Checkbox>, 'name' | 'checked' | 'onChange'> {
  name: TName
  label?: string
  control: Control<TFieldValues>
}

const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  control,
  ...props
}: FormCheckboxProps<TFieldValues, TName>) => {
  return (
    <FormFieldContainer control={control} name={name} horizontal>
      {(field) => (
        <Checkbox
          {...props}
          label={label}
          checked={field.value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => field.onChange(e.target.checked)}
        />
      )}
    </FormFieldContainer>
  )
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

const FormItem = ({
  children,
  horizontal,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, 'className'> & { horizontal?: boolean }) => {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        className={cn('flex gap-2', horizontal ? 'flex-row items-center' : 'flex-col')}
        {...props}
      >
        {children}
      </div>
    </FormItemContext.Provider>
  )
}

const FormLabel = ({ ...props }: Omit<ComponentPropsWithoutRef<typeof Label>, 'className'>) => {
  const { error, formItemId } = useFormField()

  return <Label htmlFor={formItemId} variant={error ? 'primary' : 'highlight'} {...props} />
}

const FormControl = ({ ...props }: ComponentPropsWithoutRef<typeof Slot>) => {
  const { error, formItemId, formMessageId } = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={error ? formMessageId : undefined}
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormMessage = ({
  children,
  ...props
}: Omit<HTMLAttributes<HTMLParagraphElement>, 'className'>) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p id={formMessageId} className="text-xs font-medium text-red-500/80" {...props}>
      {body}
    </p>
  )
}

const Form = Object.assign(FormProvider, {
  Root: FormRoot,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Message: FormMessage,
  Field: FormField,
  Input: FormInput,
  Checkbox: FormCheckbox,
}) as typeof FormProvider & {
  Root: typeof FormRoot
  Item: typeof FormItem
  Label: typeof FormLabel
  Control: typeof FormControl
  Message: typeof FormMessage
  Field: typeof FormField
  Input: typeof FormInput
  Checkbox: typeof FormCheckbox
}

export {
  useFormField,
  Form,
  FormRoot,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
  FormInput,
  FormCheckbox,
}
