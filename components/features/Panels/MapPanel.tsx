'use client'

import { X } from 'lucide-react'

interface MapPanelProps {
  onClose: () => void
  currentLocation?: string
}

export function MapPanel({ onClose, currentLocation }: MapPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-lg border-2 border-[#d4a574] bg-gradient-to-br from-black/90 to-black/70 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-[#ffd700]" style={{ fontFamily: 'var(--font-medieval)' }}>
            Mapa ({currentLocation || 'Unknown'})
          </h2>
          <button
            onClick={onClose}
            className="text-[#d4a574] transition-colors hover:text-[#ffd700]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4 text-[#d4a574]">
          <p>Map panel - Coming soon</p>
        </div>
      </div>
    </div>
  )
}
