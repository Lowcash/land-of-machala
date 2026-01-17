'use client'

import { ScrollIndicator } from '@/components/ui/ScrollIndicator'
import { Eye, MessageSquare, Music, RotateCcw, Save, Volume2, VolumeX, X, Zap } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Load settings from localStorage
  const [sound, setSound] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_sound')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  const [music, setMusic] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_music')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  const [animationSpeed, setAnimationSpeed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_animation_speed')
      return saved !== null ? parseInt(saved) : 1
    }
    return 1
  })

  const [textSpeed, setTextSpeed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_text_speed')
      return saved !== null ? parseInt(saved) : 2
    }
    return 2
  })

  const [autoSave, setAutoSave] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_auto_save')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  const [combatAnimations, setCombatAnimations] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_combat_animations')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  const [showTutorial, setShowTutorial] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('game_show_tutorial')
      return saved !== null ? saved === 'true' : true
    }
    return true
  })

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('game_sound', sound.toString())
      localStorage.setItem('game_music', music.toString())
      localStorage.setItem('game_animation_speed', animationSpeed.toString())
      localStorage.setItem('game_text_speed', textSpeed.toString())
      localStorage.setItem('game_auto_save', autoSave.toString())
      localStorage.setItem('game_combat_animations', combatAnimations.toString())
      localStorage.setItem('game_show_tutorial', showTutorial.toString())
    }
  }, [sound, music, animationSpeed, textSpeed, autoSave, combatAnimations, showTutorial])

  // Keyboard navigation: close with Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const resetToDefaults = () => {
    setSound(true)
    setMusic(true)
    setAnimationSpeed(1)
    setTextSpeed(2)
    setAutoSave(true)
    setCombatAnimations(true)
    setShowTutorial(true)
  }

  interface ToggleSettingProps {
    label: string
    value: boolean
    onChange: (val: boolean) => void
    icon: typeof Volume2
  }

  const ToggleSetting = ({ label, value, onChange, icon: Icon }: ToggleSettingProps) => (
    <div className="flex items-center justify-between rounded border border-[#8b6f47]/30 bg-black/40 p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#d4a574]" />
        <span className="text-sm text-[#f5e6d3]">{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          value ? 'bg-[#6fbf6f]' : 'bg-[#8b6f47]'
        }`}
        aria-label={`${label}: ${value ? 'zapnuto' : 'vypnuto'}`}
      >
        <div
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )

  interface SliderSettingProps {
    label: string
    value: number
    onChange: (val: number) => void
    min: number
    max: number
    icon: typeof Zap
    labels: string[]
  }

  const SliderSetting = ({
    label,
    value,
    onChange,
    min,
    max,
    icon: Icon,
    labels,
  }: SliderSettingProps) => (
    <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#d4a574]" />
        <span className="text-sm text-[#f5e6d3]">{label}</span>
      </div>
      <div className="space-y-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#8b6f47]/30 accent-[#ffd700]"
        />
        <div className="flex justify-between text-[10px] text-[#8b7355]">
          {labels.map((lbl, idx) => (
            <span key={idx} className={value === idx ? 'text-[#ffd700]' : ''}>
              {lbl}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div className="relative max-h-[80vh] w-full max-w-2xl">
        <ScrollIndicator targetRef={scrollRef} position="both" />
        <div
          ref={scrollRef}
          className="max-h-[80vh] overflow-y-auto rounded-lg border-2 border-[#d4a574] bg-linear-to-br from-black/90 to-black/70 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="settings-title"
              className="text-2xl text-[#ffd700]"
              style={{ fontFamily: 'var(--font-medieval)' }}
            >
              Nastavení
            </h2>
            <button
              onClick={onClose}
              aria-label="Zavřít nastavení"
              className="text-[#d4a574] transition-colors hover:text-[#ffd700] focus-visible:ring-2 focus-visible:ring-[#ffd700] focus-visible:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Audio Settings */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#ffd700]">Zvuk</h3>
              <div className="space-y-2">
                <ToggleSetting
                  label="Zvukové efekty"
                  value={sound}
                  onChange={setSound}
                  icon={sound ? Volume2 : VolumeX}
                />
                <ToggleSetting
                  label="Hudba na pozadí"
                  value={music}
                  onChange={setMusic}
                  icon={Music}
                />
              </div>
            </div>

            {/* Visual Settings */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#ffd700]">Vizuální efekty</h3>
              <div className="space-y-2">
                <SliderSetting
                  label="Rychlost animací"
                  value={animationSpeed}
                  onChange={setAnimationSpeed}
                  min={0}
                  max={2}
                  icon={Zap}
                  labels={['Pomalé', 'Normální', 'Rychlé']}
                />
                <ToggleSetting
                  label="Animace v souboji"
                  value={combatAnimations}
                  onChange={setCombatAnimations}
                  icon={Eye}
                />
              </div>
            </div>

            {/* Text Settings */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#ffd700]">Text a dialog</h3>
              <div className="space-y-2">
                <SliderSetting
                  label="Rychlost textu"
                  value={textSpeed}
                  onChange={setTextSpeed}
                  min={0}
                  max={3}
                  icon={MessageSquare}
                  labels={['Velmi pomalé', 'Pomalé', 'Normální', 'Rychlé']}
                />
              </div>
            </div>

            {/* Game Settings */}
            <div>
              <h3 className="mb-2 text-sm font-semibold text-[#ffd700]">Herní nastavení</h3>
              <div className="space-y-2">
                <ToggleSetting
                  label="Automatické ukládání"
                  value={autoSave}
                  onChange={setAutoSave}
                  icon={Save}
                />
                <ToggleSetting
                  label="Zobrazit tutoriál"
                  value={showTutorial}
                  onChange={setShowTutorial}
                  icon={Eye}
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="border-t border-[#8b6f47]/30 pt-4">
              <button
                onClick={resetToDefaults}
                className="flex w-full items-center justify-center gap-2 rounded border border-[#8b6f47] bg-black/60 px-4 py-2 text-sm text-[#d4a574] transition-colors hover:border-[#ffd700] hover:text-[#ffd700]"
              >
                <RotateCcw className="h-4 w-4" />
                Obnovit výchozí nastavení
              </button>
            </div>

            {/* Info */}
            <div className="rounded border border-[#8b6f47]/30 bg-black/40 p-3 text-xs text-[#8b7355] italic">
              Nastavení se automaticky ukládají do paměti prohlížeče.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
