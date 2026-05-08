import type { NativePropsWithoutClassNameStyle } from '@/lib/types/component-props'

type InlineTextButtonProps = NativePropsWithoutClassNameStyle<
  React.ButtonHTMLAttributes<HTMLButtonElement>
>

export function InlineTextButton({ children, type = 'button', ...props }: InlineTextButtonProps) {
  return (
    <button
      className="rounded-compact text-primary focus-visible:ring-primary bg-transparent p-0 underline underline-offset-2 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
