import type { Meta } from '@storybook/react'
import { List, ListItem } from './list'
import { Text } from './typography'
import * as React from 'react'

const meta: Meta = {
  title: 'Core/List',
  component: List,
  tags: ['autodocs'],
}

export default meta

export const Default = {
  render: () => (
    <div className="max-w-md">
      <List>
        <ListItem>První významná změna v království.</ListItem>
        <ListItem>Oprava chyby s mizejícími zlaťáky.</ListItem>
        <ListItem>Nová lokace: Temný les byla přidána na mapu.</ListItem>
      </List>
    </div>
  ),
}

export const WithTypography = {
  render: () => (
    <div className="max-w-md p-6 border-2 border-(--color-secondary)/40 bg-black/60 rounded-lg">
      <Text variant="large" className="mb-4 text-(--color-primary)">Nejnovější změny</Text>
      <List>
        <ListItem>
          <Text variant="default" className="inline">Optimalizace zbrojíře pro rychlejší nákup.</Text>
        </ListItem>
        <ListItem>
          <Text variant="small" className="inline text-(--color-secondary)">Vylepšená navigace v dungeonu.</Text>
        </ListItem>
        <ListItem>
          <Text variant="default" className="inline">Přidány nové úkoly pro začínající hrdiny.</Text>
        </ListItem>
      </List>
    </div>
  ),
}
