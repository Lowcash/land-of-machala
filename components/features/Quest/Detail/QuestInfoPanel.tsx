import { MapPin, User } from 'lucide-react'

interface QuestInfoPanelProps {
  giver?: string | null
  location?: string | null
  story?: string | null
}

export function QuestInfoPanel({ giver, location, story }: QuestInfoPanelProps) {
  return (
    <div className="space-y-4">
      <div className="rounded border border-[#8b6f47] bg-black/60 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#d4a574]" />
            <div>
              <p className="text-[10px] text-[#8b7355]">Quest Giver</p>
              <p className="text-sm text-[#f5e6d3]">{giver || 'Neznámý'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#d4a574]" />
            <div>
              <p className="text-[10px] text-[#8b7355]">Lokace</p>
              <p className="text-sm text-[#f5e6d3]">{location || 'Neznámá'}</p>
            </div>
          </div>
        </div>
      </div>

      {story && (
        <div className="rounded border border-[#8b6f47] bg-black/60 p-4">
          <h3 className="mb-2 text-sm text-[#d4a574]" style={{ fontFamily: 'var(--font-fantasy)' }}>
            Příběh:
          </h3>
          <p className="text-sm leading-relaxed text-[#f5e6d3] italic">{story}</p>
        </div>
      )}
    </div>
  )
}
