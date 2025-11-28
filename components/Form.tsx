'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { z, type ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FieldValues, FormProvider, useFormContext } from 'react-hook-form'

import { useHookFormAction, type HookProps } from '@next-safe-action/adapter-react-hook-form/hooks'

import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Option } from '@/components/ui/option'
import { Button } from '@/components/ui/button'

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic form schema requires any for Zod type flexibility
interface Props<T extends ZodType<any>> {
  ref?: React.Ref<Handle>
  schema: T
  data?: FieldValues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic action type requires any
  action: Parameters<typeof useHookFormAction<any, any, any, any, any>>[0]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic action callbacks require any
  onAction?: HookProps<any, any, any, any, any>['actionProps']
  onForm?: {
    onChange?: (data: z.infer<T>) => void
  }
}

export interface Handle {
  submit?: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Generic form component requires any for schema type
export default function Form<T extends ZodType<any>>({ children, ...p }: PropsWithChildrenAndClassName<Props<T>>) {
  const formRef = React.useRef<React.ComponentRef<'form'>>(null)

  const { form: hookForm, handleSubmitWithAction } = useHookFormAction(
    p.action,
    // @ts-expect-error -- Zod v4 type compatibility with zodResolver
    zodResolver(p.schema),
    {
      actionProps: p.onAction,
      formProps: {
        values: p.data,
      },
    },
  )

  React.useEffect(() => {
    const subscription = hookForm.watch((v) => p.onForm?.onChange?.(v as z.infer<T>))
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hookForm.watch])

  React.useImperativeHandle(p.ref, () => ({
    submit: () => formRef?.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })),
  }))

  return (
    <FormProvider {...hookForm}>
      <form ref={formRef} className={cn('flex w-full flex-col', p.className)} onSubmit={handleSubmitWithAction}>
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
  ...p
}: PropsWithChildrenAndClassName<Pick<React.ComponentProps<typeof Button>, 'variant' | 'onClick'>>) => (
  // when using with combination with onChange, submit can be triggered twice => button type button
  <Button {...p} className={cn('w-full', p.className)} variant={variant} type='button'>
    {children}
  </Button>
)
FormButton.displayName = 'Form.Button'
Form.Button = FormButton
