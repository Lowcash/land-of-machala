'use client'

/**
 * Sound Manager - Web Audio API based sound effects
 * Ported from design project GamePage.tsx
 */

type SoundType = 'click' | 'attack' | 'damage' | 'gold'

let audioContext: AudioContext | null = null

// Initialize AudioContext on first user interaction (needed for browser autoplay policy)
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null

  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioContext = new AudioContextClass()

      // Resume context on first interaction if suspended (autoplay policy)
      if (audioContext.state === 'suspended') {
        const resume = () => {
          audioContext?.resume()
          // Remove listener after first interaction
          document.removeEventListener('click', resume)
          document.removeEventListener('touchstart', resume)
          document.removeEventListener('keydown', resume)
        }
        document.addEventListener('click', resume, { once: true })
        document.addEventListener('touchstart', resume, { once: true })
        document.addEventListener('keydown', resume, { once: true })
      }
    }
  }

  return audioContext
}

/**
 * Play sound effect using Web Audio API synthesizer
 * @param type - Type of sound to play
 */
export function playSFX(type: SoundType): void {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime

    switch (type) {
      case 'click':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, now)
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
        break

      case 'attack':
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(100, now)
        osc.frequency.linearRampToValueAtTime(300, now + 0.1)
        gain.gain.setValueAtTime(0.2, now)
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.15)
        break

      case 'damage':
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(100, now)
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3)
        gain.gain.setValueAtTime(0.2, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
        osc.start(now)
        osc.stop(now + 0.3)
        break

      case 'gold':
        osc.type = 'sine'
        osc.frequency.setValueAtTime(1200, now)
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.1)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.2)
        break
    }
  } catch (e) {
    console.error('Audio error', e)
  }
}

/**
 * React hook for sound effects
 */
export function useSound() {
  return { playSFX }
}
