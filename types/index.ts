import { LOCATION, ROUTE } from '@/config'

export type Route = keyof typeof ROUTE

export type Location = Array<keyof typeof LOCATION>[number]

// Branded types for database IDs - prevent mixing different entity IDs
declare const __brand: unique symbol
type Brand<T, TBrand extends string> = T & { readonly [__brand]: TBrand }

export type UserId = Brand<string, 'UserId'>
export type PlayerId = UserId // Player is User in our schema
export type EnemyId = Brand<string, 'EnemyId'>
export type EnemyInstanceId = Brand<string, 'EnemyInstanceId'>
export type QuestId = Brand<string, 'QuestId'>
export type PlaceId = Brand<string, 'PlaceId'>
export type BankId = Brand<string, 'BankId'>
export type BankAccountId = Brand<string, 'BankAccountId'>
export type ArmoryId = Brand<string, 'ArmoryId'>
export type HospitalId = Brand<string, 'HospitalId'>
export type InventoryId = Brand<string, 'InventoryId'>
export type LootId = Brand<string, 'LootId'>
export type WeaponId = Brand<string, 'WeaponId'>
export type ArmorId = Brand<string, 'ArmorId'>
export type PotionId = Brand<string, 'PotionId'>

// Helper to create branded IDs safely
export function brandId<T extends string>(id: string): Brand<string, T> {
  return id as Brand<string, T>
}
