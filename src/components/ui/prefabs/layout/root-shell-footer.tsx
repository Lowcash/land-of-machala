import { SITE_FOOTER_LABEL, SITE_FOOTER_LINKS } from '@/lib/site-config'

import { BodyText } from '@/components/ui/core/typography'

const FOOTER_LINK_CLASS = 'hover:text-primary cursor-pointer transition-colors'

export function RootShellFooter() {
  return (
    <footer className="px-6 py-6 md:px-10 md:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 pt-4 text-center">
        <div className="bg-outline-variant/40 h-px w-56 md:w-64" />
        <BodyText align="center" italic size="sm" tone="muted">
          {SITE_FOOTER_LABEL}
        </BodyText>
        <nav className="font-label text-on-surface-variant/80 flex flex-wrap items-center justify-center gap-3 text-[11px] tracking-[0.24em] uppercase">
          {SITE_FOOTER_LINKS.map((link, index) => (
            <span key={link} className="inline-flex items-center gap-3">
              {index > 0 ? <span aria-hidden="true">|</span> : null}
              <button aria-disabled="true" className={FOOTER_LINK_CLASS} type="button">
                {link}
              </button>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}
