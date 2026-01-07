/**
 * Character page - Left sidebar sections (Stats, Equipment, Achievements)
 * Used as the main content in SplitView pattern
 */

'use client'

import { Sparkles, Swords, Trophy } from 'lucide-react'

type SectionType = 'stats' | 'equipment' | 'achievements'

interface CharacterSectionsProps {
  equipped: any[]
  selectedSection: SectionType | null
  setSelectedSection: (section: SectionType | null) => void
}

export function CharacterSections({
  equipped,
  selectedSection,
  setSelectedSection,
}: CharacterSectionsProps) {
  // Mock achievements
  const achievements = [
    {
      id: 1,
      name: 'První kroky',
      description: 'Vstoupil jsi do světa Machala',
      icon: Trophy,
      unlocked: true,
    },
    {
      id: 2,
      name: 'Začátečník',
      description: 'Dosáhl jsi level 5',
      icon: Trophy,
      unlocked: false,
    },
    {
      id: 3,
      name: 'Bojovník',
      description: 'Poraz 10 nepřátel',
      icon: Swords,
      unlocked: false,
    },
  ]

  const sections = [
    {
      id: 'stats' as SectionType,
      title: 'Statistiky',
      icon: Sparkles,
      count: null,
    },
    {
      id: 'equipment' as SectionType,
      title: 'Výbava',
      icon: Swords,
      count: equipped.length,
    },
    {
      id: 'achievements' as SectionType,
      title: 'Úspěchy',
      icon: Trophy,
      count: `${achievements.filter((a) => a.unlocked).length}/${achievements.length}`,
    },
  ]

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="scrollbar-custom flex-1 overflow-y-auto">
        <div className="space-y-2 p-3">
          {sections.map((section) => {
            const Icon = section.icon
            const isSelected = selectedSection === section.id
            return (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section.id)}
                className={`group flex w-full items-center justify-between rounded border-2 bg-gradient-to-r from-black/80 to-black/60 p-3 text-left transition-all ${
                  isSelected
                    ? 'border-[#ffd700] bg-[#ffd700]/10 shadow-[0_0_15px_rgba(255,215,0,0.15)]'
                    : 'border-[#8b6f47] hover:border-[#d4a574] hover:bg-black/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                      isSelected
                        ? 'border-[#ffd700] bg-[#ffd700]/20'
                        : 'border-[#8b6f47] bg-black/60 group-hover:border-[#d4a574]'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${isSelected ? 'text-[#ffd700]' : 'text-[#d4a574] group-hover:text-[#ffd700]'}`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`text-sm ${isSelected ? 'text-[#ffd700]' : 'text-[#d4a574]'}`}
                      style={{ fontFamily: 'var(--font-fantasy)' }}
                    >
                      {section.title}
                    </h3>
                    {section.count !== null && (
                      <p className="text-xs text-[#8b7355]">{section.count}</p>
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
