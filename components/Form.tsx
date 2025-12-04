'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { z, type ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type FieldValues, FormProvider, useFormContext } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Option } from '@/components/ui/option'
import { Button } from '@/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic form schema requires any for Zod type flexibility
interface Props<T extends ZodType<any>> {
  ref?: React.Ref<Handle>
  schema: T
  data?: FieldValues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ZSA server action type requires any for flexibility
  action: any // ZSA server action
  onAction?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Action result types require any for flexibility
    onSuccess?: (data: any) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Error types require any for flexibility
    onError?: (error: any) => void
  }
  onForm?: {
    onChange?: (data: z.infer<T>) => void
  }
}

export interface Handle {
  submit?: () => void
  getValues?: () => FieldValues
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic form component requires any for schema type
export default function Form<T extends ZodType<any>>({ children, ...p }: PropsWithChildrenAndClassName<Props<T>>) {
  const formRef = React.useRef<React.ComponentRef<'form'>>(null)

  type FormData = z.infer<T>

  const form = useForm<FormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Zod resolver requires any for generic schema compatibility
    resolver: zodResolver(p.schema as any),
    defaultValues: p.data as FormData,
  })

  const onSubmit = async (data: FormData) => {
    try {
      const result = await p.action(data)
      p.onAction?.onSuccess?.(result)
    } catch (error) {
      p.onAction?.onError?.(error)
    }
  }

  React.useImperativeHandle(p.ref, () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Form submission type casting required for react-hook-form compatibility
    submit: () => form.handleSubmit(onSubmit as any)(),
    getValues: () => form.getValues(),
  }))

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Form submission type casting required for react-hook-form compatibility
        onSubmit={form.handleSubmit(onSubmit as any)}
        className={cn('flex w-full flex-col', p.className)}
      >
        {children}
      </form>
    </FormProvider>
  )
}

interface FieldProps<T> {
  id: keyof T
  element: React.JSX.Element
  label?: React.JSX.Element | string
  description?: React.JSX.Element | string
}

function Field<T>({ id, label, description, element: fieldElement }: FieldProps<T>) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={id as string}
      render={({ field: renderFieldProps }) => {
        const { value, ...otherRenderFieldProps } = renderFieldProps

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {React.cloneElement(fieldElement, {
                ...otherRenderFieldProps,
                id,
                value: value || '',
                error: form.formState.errors[id as string]?.message,
              })}
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}

type FieldPropsWithoutElement<T> = Omit<FieldProps<T>, 'element'>

const FormInput = <T,>({
  id,
  label,
  description,
  ...fieldProps
}: FieldPropsWithoutElement<T> & React.ComponentProps<typeof Input>) => {
  return <Field id={id as string} label={label} description={description} element={<Input {...fieldProps} id={id} />} />
}
FormInput.displayName = 'Form.Input'
Form.Input = FormInput

const FormOption = <T,>({
  id,
  label,
  description,
  ...fieldProps
}: FieldPropsWithoutElement<T> & React.ComponentProps<typeof Option>) => {
  return (
    <Field id={id as string} label={label} description={description} element={<Option {...fieldProps} id={id} />} />
  )
}
FormOption.displayName = 'Form.Option'
Form.Option = FormOption

const FormButton = ({
  children,
  variant = 'warning',
  disabled,
  type = 'submit',
  ...p
}: PropsWithChildrenAndClassName<
  Pick<React.ComponentProps<typeof Button>, 'variant' | 'onClick' | 'type'> & { disabled?: boolean }
>) => {
  const form = useFormContext()
  const isSubmitting = form?.formState?.isSubmitting || false

  return (
    <Button
      {...p}
      className={cn('w-full', p.className)}
      variant={variant}
      type={type}
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? 'Loading...' : children}
    </Button>
  )
}
FormButton.displayName = 'Form.Button'
Form.Button = FormButton
