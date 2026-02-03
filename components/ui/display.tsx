'use client'

import * as React from 'react'

import type { LucideIcon } from 'lucide-react'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from './button'
import { Card } from './card'
import { HStack, VStack } from './stack'
import { Caption, H2, Label, P, Span } from './typography'

interface InfoItemProps {
  label: string
  value: string | number | React.ReactNode
  icon?: LucideIcon
  iconColor?: string
  layout?: 'horizontal' | 'vertical'
  fullWidth?: boolean
}

/**
 * A standard label-value pattern with an optional icon.
 * Used for quest givers, locations, and other metadata.
 */
export function InfoItem({
  label,
  value,
  icon: Icon,
  iconColor = 'text-game-copper-muted',
  layout = 'vertical',
  fullWidth = false,
}: InfoItemProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <HStack align={isHorizontal ? 'center' : 'start'} gap="sm" fullWidth={fullWidth}>
      {Icon && <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', iconColor)} />}
      <VStack gap="none">
        <Caption color="muted" uppercase letterSpacing="wider">
          {label}
        </Caption>
        {typeof value === 'string' || typeof value === 'number' ? (
          <P color="copper">{value}</P>
        ) : (
          value
        )}
      </VStack>
    </HStack>
  )
}

interface StatBadgeProps {
  label: string | number
  icon: LucideIcon
  color?: 'gold' | 'danger' | 'cold' | 'magic' | 'nature' | 'info'
  variant?: 'outline' | 'subtle'
}

/**
 * A stylized badge showing a stat or reward (e.g., 500 XP, 100 Gold).
 */
export function StatBadge({
  label,
  icon: Icon,
  color = 'gold',
  variant = 'subtle',
}: StatBadgeProps) {
  return (
    <Card variant="muted" bg={variant === 'subtle' ? 'black-40' : 'none'}>
      <VStack px="md" py="sm">
        <HStack align="center" gap="sm">
          <Icon className={cn('h-4 w-4', `text-game-${color}`)} />
          <Span color={color} bold>
            {label}
          </Span>
        </HStack>
      </VStack>
    </Card>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  color?: 'gold' | 'danger' | 'success' | 'magic' | 'cold'
  icon?: LucideIcon
}

/**
 * A specialized card for "Value over Label" stats (e.g. server stats).
 */
export function StatCard({ label, value, color = 'gold', icon: Icon }: StatCardProps) {
  return (
    <Card variant="muted" fullWidth>
      <Card.Content>
        <VStack gap="none" align="center" fullWidth p="sm">
          {Icon && <Icon className={cn('mb-2 h-4 w-4', `text-game-${color}`)} />}
          <Caption color="muted" uppercase>
            {label}
          </Caption>
          <P color={color} font="fantasy" weight="bold">
            {value}
          </P>
        </VStack>
      </Card.Content>
    </Card>
  )
}

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * A stylized separator for medieval-themed layouts.
 */
export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <VStack
      bg="black-20"
      _internalClassName={cn(
        orientation === 'horizontal' ? 'h-px w-full' : 'mx-2 h-full w-px',
        className
      )}
    />
  )
}

interface LabelledDividerProps {
  label: string
  color?: 'gold' | 'copper' | 'muted'
  gap?: 'sm' | 'md'
  className?: string
}

/**
 * A standardized header with a text label and a decorative line.
 * Replaces manual HStack + divider implementations.
 */
export function LabelledDivider({
  label,
  color = 'muted',
  gap = 'md',
  className,
}: LabelledDividerProps) {
  return (
    <HStack align="center" gap={gap} fullWidth _internalClassName={className}>
      <Label color={color} bold uppercase>
        {label}
      </Label>
      <VStack flex="1" h="px" bg="black-20" border="game-b" opacity="30" />
    </HStack>
  )
}

interface SectionHeaderProps {
  children: React.ReactNode
  color?:
    | 'gold'
    | 'copper'
    | 'danger'
    | 'magic'
    | 'nature'
    | 'cold'
    | 'success'
    | 'info'
    | 'default'
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Standardized section header with medieval font style.
 */
export function SectionHeader({
  children,
  color = 'gold',
  align = 'center',
  size = 'md',
}: SectionHeaderProps) {
  const justifyMap = {
    left: 'start',
    center: 'center',
    right: 'end',
  } as const

  const fontVariant = size === 'sm' ? 'h3' : size === 'lg' ? 'h1' : 'h2'

  return (
    <HStack justify={justifyMap[align]} fullWidth>
      <H2 as={fontVariant as 'h1' | 'h2' | 'h3'} font="medieval" color={color} align={align}>
        {children}
      </H2>
    </HStack>
  )
}

interface StatDisplayProps {
  icon?: LucideIcon
  value: React.ReactNode
  label?: string
  color?: 'gold' | 'copper' | 'danger' | 'cold' | 'success' | 'magic' | 'nature' | 'info'
  size?: 'sm' | 'md'
}

/**
 * Universal stat display (Icon + Value [+ Label]).
 * Replaces ad-hoc HStacks with icons in dashboards.
 */
export function StatDisplay({
  icon: Icon,
  value,
  label,
  color = 'copper',
  size = 'md',
}: StatDisplayProps) {
  const isSmall = size === 'sm'
  const iconSize = isSmall ? 'h-3 w-3' : 'h-4 w-4'
  const textVariant = isSmall ? 'caption' : 'p'

  return (
    <HStack gap="sm" align="center">
      {Icon && (
        <Icon
          className={cn(
            iconSize,
            `text-game-${color === 'copper' ? 'copper-muted' : color === 'cold' ? 'info' : color}`
          )}
        />
      )}
      <HStack gap="xs" align="baseline">
        <Span bold={!isSmall} color={color} variant={textVariant}>
          {value}
        </Span>
        {label && (
          <Span color="muted" variant="caption" uppercase>
            {label}
          </Span>
        )}
      </HStack>
    </HStack>
  )
}

interface GameIconProps {
  icon: LucideIcon
  color?: 'gold' | 'copper' | 'danger' | 'info' | 'success' | 'magic'
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  bgOpacity?: '10' | '20' | '30'
  mt?: 'none' | 'xs' | 'sm'
  indicator?: boolean
  indicatorColor?: 'success' | 'gold' | 'danger' | 'info'
}

/**
 * Standardized icon container for locations and shops.
 */
export function GameIcon({
  icon: Icon,
  color = 'gold',
  size = 'md',
  rounded = 'sm',
  bgOpacity = '10',
  mt,
  indicator,
  indicatorColor = 'success',
}: GameIconProps) {
  const iconSize = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'

  return (
    <VStack
      mt={mt}
      rounded={rounded}
      border={color}
      p="xs"
      bg={color}
      opacity={bgOpacity}
      position="relative"
    >
      <VStack className={`text-game-${color === 'info' ? 'info' : color}`}>
        <Icon className={iconSize} />
      </VStack>
      {indicator && (
        <VStack
          position="absolute"
          top="-1"
          right="-1"
          h="2"
          w="2"
          rounded="full"
          bg={indicatorColor}
        />
      )}
    </VStack>
  )
}

interface ActionRowProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  interactive?: boolean
  p?: 'none' | 'xs' | 'sm' | 'md'
  variant?: 'muted' | 'game' | 'row'
  active?: boolean
}

/**
 * A standard interactive row for lists (Trade, Market, Map Grid).
 * Encapsulates Card + HStack boilerplate.
 */
export function ActionRow({
  children,
  onClick,
  disabled = false,
  interactive = true,
  p = 'sm',
  variant = 'row',
  active = false,
}: ActionRowProps) {
  return (
    <Card
      variant={variant}
      fullWidth
      onClick={!disabled ? onClick : undefined}
      border={active ? 'gold' : undefined}
      bg={active ? 'black-60' : undefined}
      _internalClassName={active ? 'z-10' : ''}
    >
      <Card.Content disablePadding>
        <HStack justify="between" interactive={interactive && !disabled} p={p} fullWidth>
          {children}
        </HStack>
      </Card.Content>
    </Card>
  )
}

interface NpcSpeechBubbleProps {
  name: string
  text: string
  color?: 'gold' | 'copper'
}

/**
 * Standard NPC speech bubble with character thematic styling.
 */
export function NpcSpeechBubble({ name, text, color = 'copper' }: NpcSpeechBubbleProps) {
  return (
    <VStack
      fullWidth
      bg="npc-speech"
      border="game"
      p="sm"
      _internalClassName="rounded-r-lg rounded-bl-lg"
      gap="xs"
    >
      <Label color="gold">{name}</Label>
      <P color={color} italic>
        &quot;{text}&quot;
      </P>
    </VStack>
  )
}

interface GameMarkerProps {
  icon: LucideIcon
  color: 'gold' | 'info' | 'danger' | 'success' | 'muted' | 'player'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  className?: string
}

/**
 * A standardized circular marker for map locations, players, or events.
 * Features customizable colors, sizes, and optional glow effect.
 */
export function GameMarker({ icon: Icon, color, size = 'md', glow, className }: GameMarkerProps) {
  const sizeMap = {
    sm: 'h-4 w-4 p-0.5',
    md: 'h-6 w-6 p-1',
    lg: 'h-8 w-8 p-1.5',
  }

  const colorMap = {
    gold: 'bg-game-gold text-black shadow-[0_0_10px_var(--color-game-gold)]',
    info: 'bg-game-info text-white shadow-[0_0_10px_var(--color-game-info)]',
    danger: 'bg-game-danger text-white shadow-[0_0_10px_var(--color-game-danger)]',
    success: 'bg-game-success text-white shadow-[0_0_10px_var(--color-game-success)]',
    muted: 'bg-slate-800 text-slate-400',
    player: 'bg-game-info text-white border-white shadow-[0_0_15px_var(--color-game-info)]',
  }

  return (
    <VStack
      shrink="0"
      align="center"
      justify="center"
      rounded="full"
      border="game"
      _internalClassName={cn(
        'border-2 border-slate-900',
        sizeMap[size],
        colorMap[color],
        glow && 'animate-pulse',
        className
      )}
    >
      <Icon className="h-full w-full" />
    </VStack>
  )
}
interface GameFeedbackProps {
  type: 'crit' | 'dodge' | string
  active: boolean
}

/**
 * Standardized floating feedback overlay (e.g., "KRIT!", "ÚHYB!").
 * Used in combat views to signal specific event triggers.
 */
export function GameFeedback({ type, active }: GameFeedbackProps) {
  if (!active) return null

  const config = {
    crit: { text: 'KRIT!', color: 'gold' as const },
    dodge: { text: 'ÚHYB!', color: 'info' as const },
  }

  const { text, color } = config[type as keyof typeof config] || {
    text: type.toUpperCase(),
    color: 'default' as const,
  }

  return (
    <VStack
      position="absolute"
      top="-2"
      left="0"
      right="0"
      align="center"
      z="top"
      _internalClassName="pointer-events-none animate-bounce"
      _internalStyle={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
    >
      <Span bold font="fantasy" color={color} _internalClassName="text-2xl tracking-tighter">
        {text}
      </Span>
    </VStack>
  )
}

interface StatGridProps {
  children: React.ReactNode
  columns?: '1' | '2' | '3' | '4'
  p?: 'none' | 'xs' | 'sm' | 'md'
  border?: 'none' | 'game' | 'game-t' | 'game-b'
  bg?: 'none' | 'black-20' | 'black-40' | 'black-60'
  divide?: boolean
}

/**
 * A standardized grid for stat groups.
 * Replaces manual grid layouts in item details and character boxes.
 */
export function StatGrid({
  children,
  columns = '2',
  p = 'none',
  border = 'none',
  bg = 'none',
  divide = false,
}: StatGridProps) {
  return (
    <VStack
      display="grid"
      gridCols={columns}
      gap="sm"
      p={p}
      border={border !== 'none' ? border : undefined}
      bg={bg !== 'none' ? bg : undefined}
      fullWidth
      _internalClassName={cn(divide && 'divide-x divide-game-copper/20')}
    >
      {children}
    </VStack>
  )
}

interface DetailLayoutProps {
  title: string
  subtitle?: React.ReactNode
  onClose?: string | (() => void)
  emptyMessage?: string
  isEmpty?: boolean
  footer?: React.ReactNode
  children: React.ReactNode
}

/**
 * A standardized layout shell for all feature detail panels (Items, Quests, Skills).
 * Handles header with close button, scrollable content, and sticky footer.
 */
export function DetailLayout({
  title,
  subtitle,
  onClose,
  emptyMessage = 'Vyber si položku pro zobrazení detailů...',
  isEmpty = false,
  footer,
  children,
}: DetailLayoutProps) {
  if (isEmpty) {
    return (
      <VStack fullHeight align="center" justify="center" p="xl">
        <P color="muted" italic align="center">
          {emptyMessage}
        </P>
      </VStack>
    )
  }

  const CloseAction =
    typeof onClose === 'string' ? (
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      <Button variant="ghost_game" size="icon-xs" icon={X} href={onClose as any} />
    ) : onClose ? (
      <Button variant="ghost_game" size="icon-xs" icon={X} onClick={onClose} />
    ) : null

  return (
    <VStack fullHeight gap="none">
      <VStack gap="xs" pb="sm" border="game-b">
        <HStack justify="between" align="center">
          <SectionHeader color="gold" align="left">
            {title}
          </SectionHeader>
          {CloseAction}
        </HStack>
        {subtitle && <VStack pt="xs">{subtitle}</VStack>}
      </VStack>

      <VStack flex="1" overflowY="auto" pr="xs" py="md">
        {children}
      </VStack>

      {footer && (
        <VStack pt="md" border="game-t">
          {footer}
        </VStack>
      )}
    </VStack>
  )
}

interface RankIndicatorProps {
  current: number
  max: number
  variant?: 'gold' | 'magic' | 'danger' | 'success' | 'info' | string
}

/**
 * A horizontal progression indicator for ranks or skill levels.
 * Uses semantic theme gradients.
 */
export function RankIndicator({ current, max, variant = 'gold' }: RankIndicatorProps) {
  const gradientMap: Record<string, string> = {
    gold: 'from-game-gold/80 to-game-gold',
    magic: 'from-game-magic/80 to-game-magic',
    danger: 'from-game-danger/80 to-game-danger',
    success: 'from-game-success/80 to-game-success',
    info: 'from-game-info-muted/80 to-game-info',
  }

  const gradient = gradientMap[variant] || gradientMap.gold

  return (
    <HStack gap="xs" fullWidth>
      {Array.from({ length: max }).map((_, i) => (
        <VStack
          key={i}
          h="1.5"
          flex="1"
          rounded="full"
          _internalClassName={cn(
            'transition-colors',
            i < current ? cn('bg-linear-to-r', gradient) : 'bg-black-60'
          )}
        />
      ))}
    </HStack>
  )
}

interface MetricBadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'danger' | 'info' | 'success' | 'magic'
  size?: 'sm' | 'md'
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky' | 'static'
  top?: '-2' | '-1' | '0' | '2' | '4' | '20' | 'full'
  bottom?: '-2' | '-1' | '0' | '2' | '4'
  left?: '-2' | '-1' | '0' | '2' | '4'
  right?: '-2' | '-1' | '0' | '2' | '4'
  className?: string
}

/**
 * Standardized "bubble" for levels, quantities, or simple counters.
 */
export function MetricBadge({
  children,
  variant = 'gold',
  size = 'md',
  position = 'static',
  top,
  bottom,
  left,
  right,
  className,
}: MetricBadgeProps) {
  const shadowColor = `var(--color-game-${variant})`

  return (
    <VStack
      position={position === 'static' ? undefined : position}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      h={size === 'sm' ? '6' : '8'}
      w={size === 'sm' ? '6' : '8'}
      align="center"
      justify="center"
      rounded="full"
      border="game"
      bg={variant}
      _internalClassName={cn(
        'font-bold',
        variant === 'gold' ? 'text-black' : 'text-white',
        className
      )}
      _internalStyle={{
        boxShadow: `0 0 10px ${shadowColor}`,
      }}
    >
      {children}
    </VStack>
  )
}

interface AvatarContainerProps {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  border?: 'gold' | 'game' | 'none'
  placeholder?: boolean
  className?: string
}

/**
 * Standardized circular container for character or NPC avatars.
 */
export function AvatarContainer({
  children,
  size = 'md',
  border = 'game',
  placeholder = false,
  className,
}: AvatarContainerProps) {
  const sizeMap = {
    sm: 'h-10 w-10',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
    xl: 'h-32 w-32',
  }

  return (
    <VStack
      rounded="full"
      border={border !== 'none' ? border : undefined}
      bg="black-60"
      align="center"
      justify="center"
      overflow="hidden"
      shrink="0"
      _internalClassName={cn(sizeMap[size], className)}
    >
      {placeholder ? <VStack fullHeight fullWidth bg="black-40" opacity="50" /> : children}
    </VStack>
  )
}

interface FloatingTagProps {
  children: React.ReactNode
  variant?: 'black-80' | 'black-60' | 'none'
  border?: 'game' | 'gold' | 'none'
  backdrop?: boolean
  className?: string
}

/**
 * Compact labeled container for map markers, tooltips, or coordinates.
 */
export function FloatingTag({
  children,
  variant = 'black-80',
  border = 'game',
  backdrop = true,
  className,
}: FloatingTagProps) {
  return (
    <HStack
      bg={variant !== 'none' ? variant : undefined}
      backdrop={backdrop}
      px="xs"
      py="none"
      rounded="sm"
      border={border !== 'none' ? border : undefined}
      _internalClassName={cn('whitespace-nowrap', className)}
    >
      {children}
    </HStack>
  )
}

interface DecorativeGridProps {
  opacity?: number
  size?: string
  className?: string
}

/**
 * Abstracted grid overlay for game backgrounds and maps.
 */
export function DecorativeGrid({ opacity = 0.1, size = '50px', className }: DecorativeGridProps) {
  return (
    <VStack
      position="absolute"
      inset="0"
      interactive={false}
      _internalClassName={className}
      _internalStyle={{
        opacity,
        backgroundImage:
          'linear-gradient(var(--color-game-copper-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-game-copper-muted) 1px, transparent 1px)',
        backgroundSize: `${size} ${size}`,
      }}
    />
  )
}

interface DetailRowProps {
  label: React.ReactNode
  value: React.ReactNode
  icon?: LucideIcon
  iconColor?: string
  labelVariant?: 'caption' | 'p' | 'span'
  border?: 'none' | 'game-b' | 'game-t'
  px?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  py?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

/**
 * Standardized key-value row for stats and metadata.
 */
export function DetailRow({
  label,
  value,
  icon: Icon,
  iconColor = 'text-game-copper-muted',
  labelVariant = 'caption',
  border = 'none',
  px = 'none',
  py = 'xs',
  className,
}: DetailRowProps) {
  return (
    <HStack
      justify="between"
      align="center"
      fullWidth
      border={border !== 'none' ? border : undefined}
      px={px}
      py={py}
      _internalClassName={className}
    >
      <HStack align="center" gap="sm">
        {Icon && <Icon className={cn('h-4 w-4 shrink-0', iconColor)} />}
        {labelVariant === 'caption' ? (
          <Caption color="muted" uppercase letterSpacing="wider">
            {label}
          </Caption>
        ) : labelVariant === 'p' ? (
          <P color="copper">{label}</P>
        ) : (
          <Span color="muted">{label}</Span>
        )}
      </HStack>
      {typeof value === 'string' || typeof value === 'number' ? (
        <Span color="copper" bold>
          {value}
        </Span>
      ) : (
        value
      )}
    </HStack>
  )
}

interface ProfileHeaderProps {
  avatar: React.ReactNode
  title: React.ReactNode
  subtitle?: React.ReactNode
  className?: string
}

/**
 * Standardized header for character sections and interactions.
 */
export function ProfileHeader({ avatar, title, subtitle, className }: ProfileHeaderProps) {
  return (
    <HStack align="center" gap="md" fullWidth _internalClassName={className}>
      {avatar}
      <VStack gap="none">
        {typeof title === 'string' ? (
          <H2 color="gold" font="medieval">
            {title}
          </H2>
        ) : (
          title
        )}
        {subtitle && (
          <Caption color="muted" uppercase letterSpacing="wider">
            {subtitle}
          </Caption>
        )}
      </VStack>
    </HStack>
  )
}

interface StandardFormProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Standardized form container with optimized spacing.
 */
export function StandardForm({ children, onSubmit, gap = 'md', className }: StandardFormProps) {
  return (
    <form onSubmit={onSubmit} className={cn('w-full', className)}>
      <VStack gap={gap} fullWidth>
        {children}
      </VStack>
    </form>
  )
}

interface ActivityItemProps {
  message: React.ReactNode
  timestamp?: string | number | Date
  variant?: string
  isCrit?: boolean
  isDodge?: boolean
  isVictory?: boolean
  className?: string
}

/**
 * Standardized activity log row.
 */
export function ActivityItem({
  message,
  timestamp,
  variant = 'info',
  isCrit,
  isDodge,
  isVictory,
  className,
}: ActivityItemProps) {
  const semanticColors: Record<string, { text: string; border: string; bg?: string }> = {
    playerAttack: { text: 'text-game-gold', border: 'border-l-game-gold' },
    enemyAttack: { text: 'text-game-danger', border: 'border-l-game-danger' },
    defend: { text: 'text-game-info', border: 'border-l-game-info' },
    heal: { text: 'text-game-success', border: 'border-l-game-success' },
    mana: { text: 'text-game-magic', border: 'border-l-game-magic' },
    info: { text: 'text-game-copper-muted', border: 'border-l-game-copper-muted' },
    travel: { text: 'text-game-gold-muted', border: 'border-l-game-gold-muted' },
    discovery: { text: 'text-game-magic', border: 'border-l-game-magic' },
    quest: { text: 'text-game-gold', border: 'border-l-game-gold' },
    loot: { text: 'text-game-success', border: 'border-l-game-success' },
    death: { text: 'text-game-danger', border: 'border-l-game-danger' },
  }

  const fallback = semanticColors.info!
  const config = (variant && semanticColors[variant]) || fallback

  let dynamicClasses = cn(config.text, config.border, config.bg)

  if (isCrit) {
    dynamicClasses = 'text-amber-400 font-bold border-l-amber-500 bg-amber-900/20'
  } else if (isDodge) {
    dynamicClasses = 'text-gray-400 italic border-l-gray-500 opacity-90'
  } else if (isVictory) {
    dynamicClasses = 'text-green-400 font-bold border-l-green-500 bg-green-900/20'
  }

  return (
    <VStack
      rounded="lg"
      px="md"
      py="xs"
      backdrop
      _internalClassName={cn(dynamicClasses, className)}
      _internalStyle={{ borderLeftWidth: '2px' }}
    >
      <HStack align="baseline" gap="sm">
        {timestamp && (
          <VStack opacity="50">
            <Caption color="muted" weight="medium">
              {new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </Caption>
          </VStack>
        )}
        <VStack flex="1" _internalClassName="text-xs sm:text-sm">
          <Span font="fantasy">{message}</Span>
        </VStack>
      </HStack>
    </VStack>
  )
}

interface SelectableCardProps {
  isSelected: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
  fullWidth?: boolean
  fullHeight?: boolean
}

/**
 * Enhanced Selection Card with standardized animations and feedback.
 */
export function SelectableCard({
  isSelected,
  onClick,
  children,
  className,
  fullWidth = true,
  fullHeight = true,
}: SelectableCardProps) {
  return (
    <Card
      variant={isSelected ? 'game' : 'muted'}
      onClick={onClick}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
      className={cn(
        'cursor-pointer transition-all',
        isSelected ? 'z-10 scale-105' : 'hover:border-game-gold/50 bg-black/40 hover:scale-102',
        className
      )}
    >
      {children}
    </Card>
  )
}

interface GameDieProps {
  value: number
  isRolling?: boolean
  className?: string
}

/**
 * Standardized die component for tavern games.
 * Features medieval background and rolling animation support.
 */
export function GameDie({ value, isRolling, className }: GameDieProps) {
  return (
    <VStack
      h="10"
      w="10"
      align="center"
      justify="center"
      rounded="sm"
      border="copper"
      bg="noise"
      _internalClassName={cn(
        'bg-[#f5e6d3] text-2xl font-bold text-black shadow-lg',
        isRolling && 'animate-spin',
        className
      )}
    >
      <Span color="default">{isRolling ? '?' : value}</Span>
    </VStack>
  )
}

interface BadgeGroupProps {
  children: React.ReactNode
  gap?: 'xs' | 'sm' | 'md'
  className?: string
}

/**
 * Standardized container for a collection of badges or small tags.
 * Handles horizontal wrapping and consistent spacing.
 */
export function BadgeGroup({ children, gap = 'sm', className }: BadgeGroupProps) {
  return (
    <HStack gap={gap} flexWrap _internalClassName={className}>
      {children}
    </HStack>
  )
}
