import type { Meta, StoryObj } from '@storybook/react'

import { MutedText } from '../prefabs/typography/shared'
import { Badge } from './badge'
import { Card } from './card'
import { List, ListItem } from './list'
import { Text } from './typography'

const meta: Meta<typeof List> = {
  title: 'Core/List',
  component: List,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof List> = {
  render: () => (
    <List>
      <ListItem>První významná změna v království.</ListItem>
      <ListItem>Oprava chyby s mizejícími zlaťáky.</ListItem>
      <ListItem>Nová lokace: Temný les byla přidána na mapu.</ListItem>
    </List>
  ),
}

export const WithBadges: StoryObj = {
  render: () => (
    <Card gap="md" padding="lg">
      <Card.Header>
        <Card.Title>Status Updates</Card.Title>
      </Card.Header>

      <Card.Content>
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
      </Card.Content>
    </Card>
  ),
}
