'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form'

import { cn } from '../../../lib/utils'
import { Label } from './label'
import { Input } from './input'
import { Checkbox } from './checkbox'

import { UseFormReturn } from 'react-hook-form'


interface FormRootProps<TFieldValues extends FieldValues> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form: UseFormReturn<TFieldValues>
  onSubmit: (values: TFieldValues) => void | Promise<void>
}

const FormRoot = <TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormRootProps<TFieldValues>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
        {...props}
      >
        {children}
      </form>
    </Form>
  )
}

// --- Helpers ---

interface FormFieldContainerProps {
  control: any
  name: string
  label?: string
  children: (field: any) => React.ReactNode
}

const FormFieldContainer = ({ control, name, label, children }: FormFieldContainerProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          {children(field)}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

interface FormInputProps extends Omit<React.ComponentPropsWithoutRef<typeof Input>, 'name'> {
  name: string
  label?: string
  control: any
}

const FormInput = ({ name, label, control, ...props }: FormInputProps) => {
  return (
    <FormFieldContainer control={control} name={name} label={label}>
      {(field) => <Input {...props} {...field} />}
    </FormFieldContainer>
  )
}

interface FormCheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof Checkbox>, 'name' | 'checked' | 'onChange'> {
  name: string
  label?: string
  control: any
}

const FormCheckbox = ({ name, label, control, ...props }: FormCheckboxProps) => {
  return (
    <FormFieldContainer control={control} name={name} label={label}>
      {(field) => (
        <Checkbox
          {...props}
          checked={field.value}
          onChange={(e) => field.onChange((e.target as HTMLInputElement).checked)}
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

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

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
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
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

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn('flex flex-col gap-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

const FormLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Label>) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      className={cn(error && 'text-red-500/80', className)}
      htmlFor={formItemId}
      variant={error ? 'default' : 'highlight'}
      {...props}
    />
  )
}

const FormControl = ({ ...props }: React.ComponentPropsWithoutRef<typeof Slot>) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormMessage = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className={cn('text-xs font-medium text-red-500/80', className)}
      {...props}
    >
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
