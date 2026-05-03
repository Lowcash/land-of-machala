import { ENTRY_LEGAL_COPY } from '@/lib/auth/entry-copy'

type LegalTermsLabelProps = {
  onLegalLinkClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const LEGAL_LINK_CLASS =
  'text-primary hover:text-primary-fixed hover:decoration-current cursor-pointer underline decoration-transparent transition'

export function LegalTermsLabel({ onLegalLinkClick }: LegalTermsLabelProps) {
  return (
    <>
      {ENTRY_LEGAL_COPY.prefix}{' '}
      <button className={LEGAL_LINK_CLASS} onClick={onLegalLinkClick} type="button">
        {ENTRY_LEGAL_COPY.merchantLawsLabel}
      </button>{' '}
      {ENTRY_LEGAL_COPY.connector}{' '}
      <button className={LEGAL_LINK_CLASS} onClick={onLegalLinkClick} type="button">
        {ENTRY_LEGAL_COPY.privacyCodexLabel}
      </button>{' '}
      {ENTRY_LEGAL_COPY.suffix}
    </>
  )
}
