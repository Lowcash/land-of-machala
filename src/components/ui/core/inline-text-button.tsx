type InlineTextButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export function InlineTextButton({ children, onClick }: InlineTextButtonProps) {
  return (
    <button className="text-primary underline" onClick={onClick} type="button">
      {children}
    </button>
  )
}
