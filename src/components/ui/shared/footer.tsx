import { resolveFooterData } from '@/lib/game/utils/resolvers'

import { MutedText } from '@/components/ui/prefabs/typography/shared'

export function Footer() {
  const { year, version } = resolveFooterData()

  return (
    <footer className="w-full border-t border-(--color-secondary)/20 py-6 text-center">
      <MutedText as="span" suppressHydrationWarning>
        Verze {version} • © {year} Land of Machala
      </MutedText>
    </footer>
  )
}
