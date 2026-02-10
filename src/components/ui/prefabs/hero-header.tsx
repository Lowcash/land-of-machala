import { Heading, Text } from '@/components/ui/core/typography'
import { VStack, HStack } from '@/components/ui/core/stack'
import { SparklesIcon, LogoIcon } from '@/components/ui/icons'

interface HeroHeaderProps {
  title: string
  subtitle: string
  description?: string
  showLogo?: boolean
}

/**
 * Epic Hero Header prefab.
 * Used for atmospheric section headers, landing pages, and auth screens.
 */
export function HeroHeader({ 
  title, 
  subtitle, 
  description, 
  showLogo = true 
}: HeroHeaderProps) {
  return (
    <VStack align="center" gap="sm">
      {showLogo && <LogoIcon />}
      
      <VStack align="center" gap="xs">
        <Heading
          level="h1"
          font="medieval"
          color="gold"
          className="text-3xl whitespace-nowrap sm:text-4xl lg:text-5xl"
          style={{
            textShadow: '3px 3px 8px rgba(0,0,0,0.9)',
          }}
        >
          {title}
        </Heading>

        <HStack align="center" justify="center" gap="xs">
          <SparklesIcon />
          <Text color="secondary" className="text-sm sm:text-base">
            {subtitle}
          </Text>
          <SparklesIcon />
        </HStack>

        {description && (
          <Text 
            variant="muted" 
            className="text-xs italic sm:text-sm text-[#8b7355]"
          >
            {description}
          </Text>
        )}
      </VStack>
    </VStack>
  )
}
