import { Scroll, Users } from 'lucide-react'

export function StatsGrid() {
  return (
    <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
      <h3
        className="mb-4 flex items-center gap-2 text-base text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <Users className="h-5 w-5" />
        Statistiky serveru
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
          <div className="mb-1 text-xs text-[#8b7355]">Aktivní hráči</div>
          <div className="text-xl text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            1,247
          </div>
        </div>
        <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
          <div className="mb-1 text-xs text-[#8b7355]">Zabití bossů</div>
          <div className="text-xl text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            89
          </div>
        </div>
        <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
          <div className="mb-1 text-xs text-[#8b7355]">Top level</div>
          <div className="text-xl text-[#6fbf6f]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            87
          </div>
        </div>
        <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
          <div className="mb-1 text-xs text-[#8b7355]">Questy</div>
          <div className="text-xl text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            12k+
          </div>
        </div>
      </div>
    </div>
  )
}

export function UpdatesList() {
  return (
    <ul className="space-y-2 text-sm text-[#d4a574]">
      <li className="flex items-start gap-2">
        <span className="mt-1 text-[#ffd700]">•</span>
        <span>
          <span className="text-[#6fbf6f]">Rozšíření dovedností:</span> 19 skills ve 3 větvích
          (Combat, Defense, Magic)
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-1 text-[#ffd700]">•</span>
        <span>
          <span className="text-[#69ccf0]">WoW-style talent systém:</span> 3-tier progrese s unlock
          požadavky
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-1 text-[#ffd700]">•</span>
        <span>
          <span className="text-[#ff6b6b]">Movement systém:</span> Směrové pohyby (N/S/E/W) +
          náhodné souboje
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-1 text-[#ffd700]">•</span>
        <span>Kompaktní CharacterBox redesign s medieval fantasy stylem</span>
      </li>
    </ul>
  )
}

export function RecentUpdates() {
  return (
    <div className="rounded-lg border border-[#8b6f47] bg-black/80 p-4 shadow-xl backdrop-blur-md">
      <h4
        className="mb-3 flex items-center gap-2 text-base text-[#ffd700]"
        style={{ fontFamily: 'var(--font-fantasy)' }}
      >
        <Scroll className="h-5 w-5" />
        Nejnovější změny
      </h4>
      <UpdatesList />
    </div>
  )
}

export function ServerInfoMobile() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
        <div className="mb-1 text-xs text-[#8b7355]">Aktivní hráči</div>
        <div className="text-lg text-[#ffd700]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          1,247
        </div>
      </div>
      <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
        <div className="mb-1 text-xs text-[#8b7355]">Zabití bossů</div>
        <div className="text-lg text-[#ff6b6b]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          89
        </div>
      </div>
      <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
        <div className="mb-1 text-xs text-[#8b7355]">Top level</div>
        <div className="text-lg text-[#6fbf6f]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          87
        </div>
      </div>
      <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
        <div className="mb-1 text-xs text-[#8b7355]">Questy</div>
        <div className="text-lg text-[#69ccf0]" style={{ fontFamily: 'var(--font-fantasy)' }}>
          12k+
        </div>
      </div>
    </div>
  )
}

export function ServerStats() {
  return (
    <div className="space-y-6">
      <StatsGrid />
      <RecentUpdates />
    </div>
  )
}
