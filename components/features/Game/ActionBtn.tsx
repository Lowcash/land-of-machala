import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface ActionBtnProps {
  onClick: () => void;
  children: ReactNode;
  icon: LucideIcon;
  className?: string;
}

export function ActionBtn({ onClick, children, icon: Icon, className = '' }: ActionBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 
        text-xs sm:text-sm text-[#d4a574] hover:text-[#ffd700] 
        bg-black/60 hover:bg-black/80 
        px-3 py-2.5 rounded-lg 
        border-2 border-[#8b6f47]/50 hover:border-[#ffd700] 
        transition-all duration-300
        w-full text-left min-h-[44px]
        shadow-md hover:shadow-xl
        hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]
        ${className}
      `}
      style={{ fontFamily: 'var(--font-fantasy)' }}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1 leading-tight">{children}</span>
    </button>
  );
}

interface DirectionBtnProps {
  onClick: () => void;
  children: ReactNode;
  icon: LucideIcon;
  image: string;
}

export function DirectionBtn({ onClick, children, icon: Icon, image }: DirectionBtnProps) {
  return (
    <button
      onClick={onClick}
      className="
        group relative 
        flex items-center gap-2 
        text-xs sm:text-sm text-[#d4a574] hover:text-[#ffd700] 
        bg-black/60 hover:bg-black/80 
        px-3 py-2.5 rounded-lg 
        border-2 border-[#8b6f47]/50 hover:border-[#ffd700] 
        transition-all duration-300
        w-full text-left min-h-[44px] 
        overflow-hidden
        shadow-md hover:shadow-xl
        hover:shadow-[0_0_15px_rgba(255,215,0,0.2)]
      "
      style={{ fontFamily: 'var(--font-fantasy)' }}
    >
      {/* Background image on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      />
      <Icon className="w-4 h-4 shrink-0 relative z-10" />
      <span className="flex-1 leading-tight relative z-10">{children}</span>
    </button>
  );
}