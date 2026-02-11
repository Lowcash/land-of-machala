import { MutedText } from '@/components/ui/prefabs/typography/shared'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-(--color-secondary)/20 py-6 text-center">
      <MutedText as="span" className="text-xs text-(--color-secondary)/60" suppressHydrationWarning>
        Verze 2.0 • © {currentYear} Land of Machala
      </MutedText>
    </footer>
  )
}
