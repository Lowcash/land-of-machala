import { MutedText } from '@/components/ui/prefabs/typography/shared'

export interface FooterProps {
  versionLabel: string
  copyrightLabel: string
  year: number
  version: string
}

/**
 * Global application footer.
 * Pure UI component that displays version and copyright info.
 */
export function Footer({ versionLabel, copyrightLabel, year, version }: FooterProps) {
  return (
    <footer className="w-full border-t border-(--color-secondary)/20 py-4 text-center">
      <MutedText as="span" suppressHydrationWarning>
        {versionLabel} {version} • © {year} {copyrightLabel}
      </MutedText>
    </footer>
  )
}
