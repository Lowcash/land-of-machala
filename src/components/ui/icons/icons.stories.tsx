import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '@/components/ui/core/card'
import { HStack, Stack, VStack } from '@/components/ui/core/stack'
import { MutedText } from '@/components/ui/prefabs/typography/shared'

import {
  DicesIcon,
  FlameIcon,
  LockIcon,
  LogoIcon,
  MailIcon,
  RefreshIcon,
  ScrollIcon,
  ShieldIcon,
  SparklesIcon,
  SwordsIcon,
  UserIcon,
  UsersIcon,
  ZapIcon,
} from './index'

const meta: Meta = {
  title: 'UI/Core/Icons',
}

export default meta
type Story = StoryObj

export const Gallery: Story = {
  render: () => (
    <Card p="lg" maxWidth="3xl">
      <Stack display="grid" cols="4" gap="xl">
        <IconItem label="User" icon={<UserIcon />} />
        <IconItem label="Users" icon={<UsersIcon />} />
        <IconItem label="Scroll" icon={<ScrollIcon />} />
        <IconItem label="Sparkles" icon={<SparklesIcon />} />
        <IconItem label="Swords" icon={<SwordsIcon />} />
        <IconItem label="Shield" icon={<ShieldIcon />} />
        <IconItem label="Zap" icon={<ZapIcon />} />
        <IconItem label="Flame" icon={<FlameIcon />} />
        <IconItem label="Dices" icon={<DicesIcon />} />
        <IconItem label="Lock" icon={<LockIcon />} />
        <IconItem label="Mail" icon={<MailIcon />} />
        <IconItem label="Refresh" icon={<RefreshIcon />} />
      </Stack>
    </Card>
  ),
}

export const Colors: Story = {
  render: () => (
    <VStack gap="lg">
      <HStack gap="md">
        <UserIcon color="primary" />
        <UserIcon color="gold" />
        <UserIcon color="secondary" />
        <UserIcon color="ivory" />
      </HStack>
      <HStack gap="md">
        <ShieldIcon color="hp" />
        <FlameIcon color="mana" />
        <ZapIcon color="strength" />
        <DicesIcon color="agility" />
      </HStack>
    </VStack>
  ),
}

export const Sizes: Story = {
  render: () => (
    <HStack gap="xl" align="center">
      <ScrollIcon size="xs" />
      <ScrollIcon size="sm" />
      <ScrollIcon size="md" />
      <ScrollIcon size="lg" />
      <ScrollIcon size="xl" />
    </HStack>
  ),
}

export const Logo: Story = {
  render: () => (
    <HStack gap="xl" align="center">
      <LogoIcon size="lg" />
      <LogoIcon size="xl" />
      <LogoIcon size="xxl" />
    </HStack>
  ),
}

function IconItem({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <VStack align="center" gap="sm">
      <Stack
        align="center"
        justify="center"
        width="avatar-xs"
        height="avatar-xs"
        rounded="md"
        bgColor="black"
        opacity="20"
      >
        {icon}
      </Stack>
      <MutedText variant="tiny">{label}</MutedText>
    </VStack>
  )
}
