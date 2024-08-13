import {
  ArmorInBank,
  ArmorInInventory,
  PotionInBank,
  PotionInInventory,
  WeaponInBank,
  WeaponInInventory,
} from '@prisma/client'

export function isWeaponInInventory(arg: any): arg is WeaponInInventory {
  return arg.weapon_id !== undefined
}

export function isArmorInInventory(arg: any): arg is ArmorInInventory {
  return arg.armor_id !== undefined
}

export function isPotionInInventory(arg: any): arg is PotionInInventory {
  return arg.potion_id !== undefined
}

export function isWeaponInBank(arg: any): arg is WeaponInBank {
  return arg.weapon_id !== undefined
}

export function isArmorInBank(arg: any): arg is ArmorInBank {
  return arg.armor_id !== undefined
}

export function isPotionInBank(arg: any): arg is PotionInBank {
  return arg.potion_id !== undefined
}
