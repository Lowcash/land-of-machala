import Image from 'next/image'

import { User } from 'lucide-react'

interface CharacterAvatarProps {
  name: string
  level: number
  isEnemy: boolean
  image?: string
}

export function CharacterAvatar({ name, level, isEnemy, image }: CharacterAvatarProps) {
  return (
    <div className="relative mr-4 shrink-0">
      <div
        className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border-2 shadow-inner ${
          isEnemy ? 'border-red-900 bg-red-950' : 'border-[#8b6f47] bg-black'
        }`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
        ) : (
          <User className={`h-10 w-10 ${isEnemy ? 'text-red-500/70' : 'text-[#d4a574]/70'}`} />
        )}
      </div>
      {/* Level Bubble */}
      <div
        className={`absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 ${
          isEnemy
            ? 'border-red-800 bg-red-950 text-red-200 shadow-[0_0_10px_rgba(220,38,38,0.5)]'
            : 'border-[#ffd700] bg-linear-to-br from-[#8b6f47] to-[#5a4a2e] text-[#ffd700] shadow-[0_0_10px_rgba(255,215,0,0.4)]'
        } text-sm font-bold`}
      >
        {level}
      </div>
    </div>
  )
}
