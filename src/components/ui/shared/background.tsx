import Image from 'next/image'

interface BackgroundProps {
  src: string
}

/**
 * Universal Background component.
 * Displays a fixed, full-screen background image with a readable overlay.
 * Optimized DOM with zero client-side logic.
 */
export function Background({ src }: BackgroundProps) {
  if (!src) return null

  return (
    <div className="fixed inset-0 -z-50 bg-(--color-background)" aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        priority
        className="object-cover transition-opacity duration-700"
        sizes="100vw"
        quality={75}
      />
      {/* Linear gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-black/75 to-black/90" />
    </div>
  )
}
