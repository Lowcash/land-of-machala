'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FieldValues, FormProvider, useForm, useFormContext } from 'react-hook-form'

import { type Infer } from 'next-safe-action/adapters/types'
import { type ValidationErrors } from 'next-safe-action'
import { useAction } from 'next-safe-action/hooks'
import { useHookFormActionErrorMapper } from '@next-safe-action/adapter-react-hook-form/hooks'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Option } from '@/components/ui/option'
import { Button } from '@/components/ui/button'

interface Props<T extends ZodType<any>> {
  ref?: React.Ref<Handle>
  schema: T
  data?: FieldValues
  action: Parameters<typeof useAction>[0]
  onAction: Parameters<typeof useAction>[1]
  onForm?: {
    onChange?: (data: Infer<T>) => void
  }
}

export interface Handle {
  submit?: () => void
}

export default function Form<T extends ZodType<any>>({ children, ...p }: PropsWithChildrenAndClassName<Props<T>>) {
  const formRef = React.useRef<React.ComponentRef<'form'>>(null)
  const actionResult = useAction(p.action, p.onAction)

  const { hookFormValidationErrors } = useHookFormActionErrorMapper<typeof p.schema>(
    actionResult.result.validationErrors as ValidationErrors<typeof p.schema>,
    {
      joinBy: '\n',
    },
  )

  const hookForm = useForm({ resolver: zodResolver(p.schema), values: p.data, errors: hookFormValidationErrors })

  React.useEffect(() => {
    const subscription = hookForm.watch((v) => p.onForm?.onChange?.(v as Infer<T>))
    return () => subscription.unsubscribe()
  }, [hookForm.watch])

  React.useImperativeHandle(p.ref, () => ({
    submit: () => formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })),
  }))

  return (
    <FormProvider {...hookForm}>
      <form
        ref={formRef}
        className={cn('flex w-full flex-col', p.className)}
        onSubmit={hookForm.handleSubmit(async (data) => actionResult.executeAsync(data))}
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
        const { ref, value, ...otherRenderFieldProps } = renderFieldProps

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

Form.Input = <T,>({
  id,
  label,
  description,
  ...fieldProps
}: FieldPropsWithoutElement<T> & React.ComponentProps<typeof Input>) => {
  return <Field id={id as string} label={label} description={description} element={<Input {...fieldProps} id={id} />} />
}
Form.Option = <T,>({
  id,
  label,
  description,
  ...fieldProps
}: FieldPropsWithoutElement<T> & React.ComponentProps<typeof Option>) => {
  return (
    <Field id={id as string} label={label} description={description} element={<Option {...fieldProps} id={id} />} />
  )
}
Form.Button = ({
  children,
  variant = 'warning',
  ...p
}: PropsWithChildrenAndClassName<Pick<React.ComponentProps<typeof Button>, 'variant' | 'onClick'>>) => (
  // when using with combination with onChange, submit can be triggered twice => button type button
  <Button {...p} className={cn('w-full', p.className)} variant={variant} type='button'>
    {children}
  </Button>
)
