export function getSlotName(slot: string): string {
  const names: Record<string, string> = {
    left_hand: 'Levá ruka',
    right_hand: 'Pravá ruka',
    chest: 'Hruď',
    hands: 'Ruce',
    feet: 'Nohy',
    head: 'Hlava',
    legs: 'Nohy',
  }
  return names[slot] || slot
}
