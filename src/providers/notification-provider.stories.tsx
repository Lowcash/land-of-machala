import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/core/button'
import { HStack, VStack } from '@/components/ui/core/stack'

import { NotificationProvider, useNotification } from './notification-provider'

const meta: Meta<typeof NotificationProvider> = {
  title: 'Providers/NotificationProvider',
  component: NotificationProvider,
  parameters: {
    layout: 'centered',
  },
}

export default meta

const NotificationDemo = () => {
  const { success, error, warn, info, notify } = useNotification()

  return (
    <VStack gap="md" p="xl" minWidth="full" maxWidth="md">
      <h3 className="font-fantasy text-xl font-bold">Heraldic Proclamations</h3>
      <HStack gap="sm" wrap>
        <Button
          variant="choice"
          fullWidth={false}
          onClick={() => success('You have successfully cleared the dungeon floor!', 'Success')}
        >
          Quest Success
        </Button>
        <Button
          variant="secondary"
          fullWidth={false}
          onClick={() => error('Your armor has been shattered by the giant!', 'Danger')}
        >
          Battle Wound
        </Button>
        <Button
          variant="secondary"
          fullWidth={false}
          onClick={() => warn('The bridge behind you is collapsing!', 'Warning')}
        >
          Env Warning
        </Button>
        <Button
          variant="secondary"
          fullWidth={false}
          onClick={() => info('A new entry has been added to the bestiary.', 'Lore Unlock')}
        >
          Knowledge Gained
        </Button>
      </HStack>

      <Button
        variant="primary"
        onClick={() =>
          notify({
            title: 'Special Announcement',
            message: 'A legendary dragon has been sighted near the volcano!',
            variant: 'ornamental',
            duration: 10000,
          })
        }
      >
        Royal Decree (Ornamental)
      </Button>

      <Button
        variant="secondary"
        onClick={() =>
          notify({
            title: 'Persistent Message',
            message: 'This message will not disappear until you click it.',
            duration: 0,
          })
        }
      >
        Sticky Scroll
      </Button>
    </VStack>
  )
}

export const Default: StoryObj = {
  render: () => (
    <NotificationProvider>
      <NotificationDemo />
    </NotificationProvider>
  ),
}
