import type { Meta, StoryObj } from '@storybook/react'

import { MutedText } from '../prefabs/typography/shared'
import { Badge } from './badge'
import { List, ListItem } from './list'
import { Text } from './typography'

const meta: Meta<typeof List> = {
  title: 'UI/Core/List',
  component: List,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof List> = {
  render: () => (
    <List>
      <ListItem icon={<Badge>New</Badge>}>
        <Text>System optimization complete.</Text>
      </ListItem>
      <ListItem icon={<Badge>Update</Badge>}>
        <MutedText>Magic scaling adjusted.</MutedText>
      </ListItem>
      <ListItem icon={<Badge>Fix</Badge>}>
        <Text>Bug #123 resolved.</Text>
      </ListItem>
    </List>
  ),
}
