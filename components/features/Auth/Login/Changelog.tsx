import { Scroll } from 'lucide-react'

export function Changelog() {
  const updates = [
    {
      id: 1,
      prefix: 'Rozšíření dovedností:',
      text: '19 skills ve 3 větvích (Combat, Defense, Magic)',
      color: 'text-[#6fbf6f]',
    },
    {
      id: 2,
      prefix: 'WoW-style talent systém:',
      text: '3-tier progrese s unlock požadavky',
      color: 'text-[#69ccf0]',
    },
    {
      id: 3,
      prefix: 'Movement systém:',
      text: 'Směrové pohyby (N/S/E/W) + náhodné souboje',
      color: 'text-[#ff6b6b]',
    },
    {
      id: 4,
      prefix: 'UI Update:',
      text: 'Kompaktní CharacterBox redesign s medieval fantasy stylem',
      color: 'text-[#d4a574]',
    },
  ]

  return (
    <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
      <h4
        className="mb-3 flex items-center gap-2 text-base text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <Scroll className="h-5 w-5" />
        Nejnovější změny
      </h4>
      <ul className="space-y-3 text-sm text-[#d4a574]">
        {updates.map((update) => (
          <li key={update.id} className="flex items-start gap-2">
            <span className="mt-1 text-[#ffd700]">•</span>
            <span className="leading-snug">
              <span className={`font-semibold ${update.color}`}>{update.prefix}</span> {update.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
