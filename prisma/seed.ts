import { PrismaClient, EnemyIdent } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data (in correct order due to foreign key constraints)
  console.log('🗑️  Clearing existing data...')
  await prisma.enemyLoot.deleteMany()
  await prisma.armorInArmory.deleteMany()
  await prisma.weaponInArmory.deleteMany()
  await prisma.potionInHospital.deleteMany()
  await prisma.enemyInPlace.deleteMany()
  await prisma.quest.deleteMany()
  await prisma.bank.deleteMany()
  await prisma.armory.deleteMany()
  await prisma.hospital.deleteMany()
  await prisma.place.deleteMany()
  await prisma.potion.deleteMany()
  await prisma.weapon.deleteMany()
  await prisma.armor.deleteMany()
  await prisma.enemy.deleteMany()
  await prisma.class.deleteMany()
  await prisma.race.deleteMany()

  // Seed Races
  console.log('👤 Seeding races...')
  await prisma.race.createMany({
    data: [
      { id: 'human', i18n_key: 'race.human', order_index: 1, strength: 10, agility: 10, intelligence: 10 },
      { id: 'dwarf', i18n_key: 'race.dwarf', order_index: 2, strength: 12, agility: 10, intelligence: 8 },
      { id: 'gnome', i18n_key: 'race.gnome', order_index: 3, strength: 8, agility: 10, intelligence: 12 },
    ],
  })

  // Seed Classes
  console.log('⚔️  Seeding classes...')
  await prisma.class.createMany({
    data: [
      { id: 'warrior', i18n_key: 'class.warrior', order_index: 1, strength: 14, agility: 10, intelligence: 6 },
      { id: 'samurai', i18n_key: 'class.samurai', order_index: 2, strength: 10, agility: 14, intelligence: 6 },
      { id: 'mage', i18n_key: 'class.mage', order_index: 3, strength: 8, agility: 6, intelligence: 16 },
    ],
  })

  // Seed Enemies
  console.log('👹 Seeding enemies...')
  const enemies: Array<{
    id: EnemyIdent
    i18n_key: string
    hp_from: number
    hp_to: number
    damage_from: number
    damage_to: number
  }> = [
    // FOREST
    { id: EnemyIdent.GOBLIN, i18n_key: 'enemy.goblin', hp_from: 60, hp_to: 90, damage_from: 6, damage_to: 12 },
    { id: EnemyIdent.WOLF, i18n_key: 'enemy.wolf', hp_from: 80, hp_to: 120, damage_from: 8, damage_to: 16 },
    { id: EnemyIdent.BANDIT, i18n_key: 'enemy.bandit', hp_from: 100, hp_to: 140, damage_from: 10, damage_to: 18 },
    // CEMETERY
    { id: EnemyIdent.ZOMBIE, i18n_key: 'enemy.zombie', hp_from: 120, hp_to: 180, damage_from: 12, damage_to: 20 },
    { id: EnemyIdent.SKELETON, i18n_key: 'enemy.skeleton', hp_from: 90, hp_to: 130, damage_from: 10, damage_to: 16 },
    { id: EnemyIdent.GHOUL, i18n_key: 'enemy.ghoul', hp_from: 160, hp_to: 220, damage_from: 16, damage_to: 26 },
    // DESERT
    { id: EnemyIdent.SCORPION, i18n_key: 'enemy.scorpion', hp_from: 110, hp_to: 160, damage_from: 14, damage_to: 22 },
    { id: EnemyIdent.SAND_WORM, i18n_key: 'enemy.sand_worm', hp_from: 180, hp_to: 250, damage_from: 18, damage_to: 28 },
    {
      id: EnemyIdent.DESERT_BANDIT,
      i18n_key: 'enemy.desert_bandit',
      hp_from: 130,
      hp_to: 180,
      damage_from: 15,
      damage_to: 24,
    },
    // FARM
    { id: EnemyIdent.WILD_BOAR, i18n_key: 'enemy.wild_boar', hp_from: 70, hp_to: 110, damage_from: 8, damage_to: 14 },
    {
      id: EnemyIdent.ANGRY_FARMER,
      i18n_key: 'enemy.angry_farmer',
      hp_from: 90,
      hp_to: 130,
      damage_from: 10,
      damage_to: 16,
    },
    // SUBURB
    { id: EnemyIdent.THIEF, i18n_key: 'enemy.thief', hp_from: 80, hp_to: 120, damage_from: 8, damage_to: 15 },
    { id: EnemyIdent.DRUNKARD, i18n_key: 'enemy.drunkard', hp_from: 60, hp_to: 90, damage_from: 5, damage_to: 10 },
    // HILLS
    {
      id: EnemyIdent.HILL_TROLL,
      i18n_key: 'enemy.hill_troll',
      hp_from: 200,
      hp_to: 260,
      damage_from: 20,
      damage_to: 32,
    },
    {
      id: EnemyIdent.MOUNTAIN_GOAT,
      i18n_key: 'enemy.mountain_goat',
      hp_from: 90,
      hp_to: 130,
      damage_from: 10,
      damage_to: 16,
    },
    // SWAMP
    {
      id: EnemyIdent.SWAMP_LIZARD,
      i18n_key: 'enemy.swamp_lizard',
      hp_from: 120,
      hp_to: 170,
      damage_from: 14,
      damage_to: 22,
    },
    {
      id: EnemyIdent.GIANT_LEECH,
      i18n_key: 'enemy.giant_leech',
      hp_from: 140,
      hp_to: 200,
      damage_from: 16,
      damage_to: 24,
    },
    {
      id: EnemyIdent.SWAMP_GHOST,
      i18n_key: 'enemy.swamp_ghost',
      hp_from: 160,
      hp_to: 220,
      damage_from: 18,
      damage_to: 28,
    },
    // LAKE
    {
      id: EnemyIdent.WATER_SPRITE,
      i18n_key: 'enemy.water_sprite',
      hp_from: 100,
      hp_to: 150,
      damage_from: 12,
      damage_to: 20,
    },
    {
      id: EnemyIdent.GIANT_FROG,
      i18n_key: 'enemy.giant_frog',
      hp_from: 120,
      hp_to: 180,
      damage_from: 14,
      damage_to: 22,
    },
    { id: EnemyIdent.DROWNED, i18n_key: 'enemy.drowned', hp_from: 140, hp_to: 200, damage_from: 16, damage_to: 26 },
  ]

  // Calculate XP and money rewards based on enemy stats
  const maxScore = Math.max(...enemies.map((e) => (e.hp_from + e.hp_to) / 2 + (e.damage_from + e.damage_to) / 2))

  await prisma.enemy.createMany({
    data: enemies.map((e) => {
      const score = (e.hp_from + e.hp_to) / 2 + (e.damage_from + e.damage_to) / 2
      return {
        ...e,
        xp_from: Math.min(Math.round((score / maxScore) * 100 * 0.8), 100),
        xp_to: Math.min(Math.round((score / maxScore) * 100 * 1.2), 100),
        money_from: Math.min(Math.round((score / maxScore) * 100 * 0.25), 100),
        money_to: Math.min(Math.round((score / maxScore) * 100 * 0.5), 100),
      }
    }),
  })

  // Seed Armor
  console.log('🛡️  Seeding armor...')
  await prisma.armor.createMany({
    data: [
      // Head items
      {
        id: 'head_helmet_defender',
        i18n_key: 'armor.head_helmet_defender',
        type: 'HEAD',
        armor: 9,
        strength: 8,
        agility: 3,
        intelligence: 1,
      },
      {
        id: 'head_cap_seer',
        i18n_key: 'armor.head_cap_seer',
        type: 'HEAD',
        armor: 4,
        strength: 2,
        agility: 5,
        intelligence: 10,
      },
      {
        id: 'head_helmet_knight',
        i18n_key: 'armor.head_helmet_knight',
        type: 'HEAD',
        armor: 10,
        strength: 9,
        agility: 2,
        intelligence: 1,
      },
      {
        id: 'head_hood_shadow',
        i18n_key: 'armor.head_hood_shadow',
        type: 'HEAD',
        armor: 6,
        strength: 3,
        agility: 8,
        intelligence: 4,
      },
      {
        id: 'head_crown_archmage',
        i18n_key: 'armor.head_crown_archmage',
        type: 'HEAD',
        armor: 7,
        strength: 1,
        agility: 3,
        intelligence: 10,
      },
      {
        id: 'head_headband_strength',
        i18n_key: 'armor.head_headband_strength',
        type: 'HEAD',
        armor: 5,
        strength: 8,
        agility: 4,
        intelligence: 2,
      },
      {
        id: 'head_mask_mystery',
        i18n_key: 'armor.head_mask_mystery',
        type: 'HEAD',
        armor: 4,
        strength: 2,
        agility: 7,
        intelligence: 8,
      },
      {
        id: 'head_cowl_hunter',
        i18n_key: 'armor.head_cowl_hunter',
        type: 'HEAD',
        armor: 8,
        strength: 5,
        agility: 9,
        intelligence: 3,
      },
      {
        id: 'head_helmet_protector',
        i18n_key: 'armor.head_helmet_protector',
        type: 'HEAD',
        armor: 9,
        strength: 7,
        agility: 3,
        intelligence: 2,
      },
      {
        id: 'head_helmet_gladiator',
        i18n_key: 'armor.head_helmet_gladiator',
        type: 'HEAD',
        armor: 8,
        strength: 10,
        agility: 2,
        intelligence: 1,
      },
      // Shoulder items
      {
        id: 'shoulder_pauldrons_crusher',
        i18n_key: 'armor.shoulder_pauldrons_crusher',
        type: 'SHOULDER',
        armor: 7,
        strength: 9,
        agility: 6,
        intelligence: 1,
      },
      {
        id: 'shoulder_pauldrons_mystic',
        i18n_key: 'armor.shoulder_pauldrons_mystic',
        type: 'SHOULDER',
        armor: 5,
        strength: 2,
        agility: 4,
        intelligence: 9,
      },
      {
        id: 'shoulder_pauldrons_sprinter',
        i18n_key: 'armor.shoulder_pauldrons_sprinter',
        type: 'SHOULDER',
        armor: 6,
        strength: 3,
        agility: 10,
        intelligence: 2,
      },
      {
        id: 'shoulder_pauldrons_stealth',
        i18n_key: 'armor.shoulder_pauldrons_stealth',
        type: 'SHOULDER',
        armor: 4,
        strength: 1,
        agility: 9,
        intelligence: 5,
      },
      {
        id: 'shoulder_pauldrons_wizard',
        i18n_key: 'armor.shoulder_pauldrons_wizard',
        type: 'SHOULDER',
        armor: 8,
        strength: 1,
        agility: 5,
        intelligence: 10,
      },
      {
        id: 'shoulder_epaulets_courage',
        i18n_key: 'armor.shoulder_epaulets_courage',
        type: 'SHOULDER',
        armor: 9,
        strength: 7,
        agility: 3,
        intelligence: 2,
      },
      {
        id: 'shoulder_epaulets_agility',
        i18n_key: 'armor.shoulder_epaulets_agility',
        type: 'SHOULDER',
        armor: 7,
        strength: 3,
        agility: 10,
        intelligence: 1,
      },
      {
        id: 'shoulder_shoulders_fortress',
        i18n_key: 'armor.shoulder_shoulders_fortress',
        type: 'SHOULDER',
        armor: 8,
        strength: 8,
        agility: 2,
        intelligence: 3,
      },
      {
        id: 'shoulder_shoulders_wisdom',
        i18n_key: 'armor.shoulder_shoulders_wisdom',
        type: 'SHOULDER',
        armor: 5,
        strength: 2,
        agility: 4,
        intelligence: 9,
      },
      {
        id: 'shoulder_plate_shoulders_ranger',
        i18n_key: 'armor.shoulder_plate_shoulders_ranger',
        type: 'SHOULDER',
        armor: 6,
        strength: 6,
        agility: 8,
        intelligence: 2,
      },
      // Chest items
      {
        id: 'chest_armor_hero',
        i18n_key: 'armor.chest_armor_hero',
        type: 'CHEST',
        armor: 9,
        strength: 10,
        agility: 3,
        intelligence: 1,
      },
      {
        id: 'chest_cloak_mystery',
        i18n_key: 'armor.chest_cloak_mystery',
        type: 'CHEST',
        armor: 6,
        strength: 2,
        agility: 5,
        intelligence: 10,
      },
      {
        id: 'chest_chainmail_hunter',
        i18n_key: 'armor.chest_chainmail_hunter',
        type: 'CHEST',
        armor: 8,
        strength: 7,
        agility: 10,
        intelligence: 3,
      },
      {
        id: 'chest_leather_armor',
        i18n_key: 'armor.chest_leather_armor',
        type: 'CHEST',
        armor: 7,
        strength: 5,
        agility: 9,
        intelligence: 2,
      },
      {
        id: 'chest_magic_cloak',
        i18n_key: 'armor.chest_magic_cloak',
        type: 'CHEST',
        armor: 10,
        strength: 1,
        agility: 4,
        intelligence: 10,
      },
      {
        id: 'chest_warrior_breastplate',
        i18n_key: 'armor.chest_warrior_breastplate',
        type: 'CHEST',
        armor: 9,
        strength: 9,
        agility: 3,
        intelligence: 1,
      },
      {
        id: 'chest_reinforced_vest',
        i18n_key: 'armor.chest_reinforced_vest',
        type: 'CHEST',
        armor: 5,
        strength: 6,
        agility: 7,
        intelligence: 3,
      },
      {
        id: 'chest_protective_tunic',
        i18n_key: 'armor.chest_protective_tunic',
        type: 'CHEST',
        armor: 8,
        strength: 4,
        agility: 6,
        intelligence: 8,
      },
      {
        id: 'chest_flaming_tunic',
        i18n_key: 'armor.chest_flaming_tunic',
        type: 'CHEST',
        armor: 7,
        strength: 5,
        agility: 8,
        intelligence: 4,
      },
      {
        id: 'chest_dragon_armor',
        i18n_key: 'armor.chest_dragon_armor',
        type: 'CHEST',
        armor: 10,
        strength: 8,
        agility: 4,
        intelligence: 7,
      },
      // Hand items
      {
        id: 'hand_gloves_strength',
        i18n_key: 'armor.hand_gloves_strength',
        type: 'HANDS',
        armor: 4,
        strength: 10,
        agility: 7,
        intelligence: 1,
      },
      {
        id: 'hand_gloves_mystic',
        i18n_key: 'armor.hand_gloves_mystic',
        type: 'HANDS',
        armor: 3,
        strength: 2,
        agility: 5,
        intelligence: 9,
      },
      {
        id: 'hand_gloves_sprinter',
        i18n_key: 'armor.hand_gloves_sprinter',
        type: 'HANDS',
        armor: 5,
        strength: 3,
        agility: 10,
        intelligence: 2,
      },
      {
        id: 'hand_gloves_shadow_master',
        i18n_key: 'armor.hand_gloves_shadow_master',
        type: 'HANDS',
        armor: 2,
        strength: 1,
        agility: 9,
        intelligence: 6,
      },
      {
        id: 'hand_gloves_wizard',
        i18n_key: 'armor.hand_gloves_wizard',
        type: 'HANDS',
        armor: 6,
        strength: 1,
        agility: 4,
        intelligence: 10,
      },
      {
        id: 'hand_bracers_endurance',
        i18n_key: 'armor.hand_bracers_endurance',
        type: 'HANDS',
        armor: 7,
        strength: 8,
        agility: 6,
        intelligence: 3,
      },
      {
        id: 'hand_rings_agility',
        i18n_key: 'armor.hand_rings_agility',
        type: 'HANDS',
        armor: 8,
        strength: 2,
        agility: 10,
        intelligence: 1,
      },
      {
        id: 'hand_armguards_fortress',
        i18n_key: 'armor.hand_armguards_fortress',
        type: 'HANDS',
        armor: 5,
        strength: 7,
        agility: 4,
        intelligence: 6,
      },
      {
        id: 'hand_chainmail_gloves',
        i18n_key: 'armor.hand_chainmail_gloves',
        type: 'HANDS',
        armor: 6,
        strength: 5,
        agility: 3,
        intelligence: 8,
      },
      {
        id: 'hand_leather_gloves',
        i18n_key: 'armor.hand_leather_gloves',
        type: 'HANDS',
        armor: 7,
        strength: 6,
        agility: 4,
        intelligence: 7,
      },
      // Pants items
      {
        id: 'pants_pants_strength',
        i18n_key: 'armor.pants_pants_strength',
        type: 'PANTS',
        armor: 7,
        strength: 10,
        agility: 6,
        intelligence: 2,
      },
      {
        id: 'pants_pants_mystic',
        i18n_key: 'armor.pants_pants_mystic',
        type: 'PANTS',
        armor: 4,
        strength: 2,
        agility: 5,
        intelligence: 9,
      },
      {
        id: 'pants_pants_sprinter',
        i18n_key: 'armor.pants_pants_sprinter',
        type: 'PANTS',
        armor: 6,
        strength: 3,
        agility: 10,
        intelligence: 2,
      },
      {
        id: 'pants_pants_stealth',
        i18n_key: 'armor.pants_pants_stealth',
        type: 'PANTS',
        armor: 5,
        strength: 1,
        agility: 9,
        intelligence: 5,
      },
      {
        id: 'pants_pants_wizard',
        i18n_key: 'armor.pants_pants_wizard',
        type: 'PANTS',
        armor: 8,
        strength: 1,
        agility: 4,
        intelligence: 10,
      },
      {
        id: 'pants_gaiters_courage',
        i18n_key: 'armor.pants_gaiters_courage',
        type: 'PANTS',
        armor: 9,
        strength: 9,
        agility: 6,
        intelligence: 3,
      },
      {
        id: 'pants_trousers_agility',
        i18n_key: 'armor.pants_trousers_agility',
        type: 'PANTS',
        armor: 7,
        strength: 2,
        agility: 10,
        intelligence: 1,
      },
      {
        id: 'pants_trousers_fortress',
        i18n_key: 'armor.pants_trousers_fortress',
        type: 'PANTS',
        armor: 6,
        strength: 8,
        agility: 3,
        intelligence: 4,
      },
      {
        id: 'pants_leather_pants_hunter',
        i18n_key: 'armor.pants_leather_pants_hunter',
        type: 'PANTS',
        armor: 5,
        strength: 6,
        agility: 4,
        intelligence: 7,
      },
      {
        id: 'pants_plate_trousers_warrior',
        i18n_key: 'armor.pants_plate_trousers_warrior',
        type: 'PANTS',
        armor: 8,
        strength: 10,
        agility: 2,
        intelligence: 3,
      },
      // Boots items
      {
        id: 'boots_boots_strength',
        i18n_key: 'armor.boots_boots_strength',
        type: 'BOOTS',
        armor: 3,
        strength: 10,
        agility: 7,
        intelligence: 2,
      },
      {
        id: 'boots_boots_mystic',
        i18n_key: 'armor.boots_boots_mystic',
        type: 'BOOTS',
        armor: 4,
        strength: 2,
        agility: 5,
        intelligence: 10,
      },
      {
        id: 'boots_boots_speed',
        i18n_key: 'armor.boots_boots_speed',
        type: 'BOOTS',
        armor: 5,
        strength: 3,
        agility: 10,
        intelligence: 2,
      },
      {
        id: 'boots_boots_stealth',
        i18n_key: 'armor.boots_boots_stealth',
        type: 'BOOTS',
        armor: 2,
        strength: 1,
        agility: 9,
        intelligence: 6,
      },
      {
        id: 'boots_boots_wizard',
        i18n_key: 'armor.boots_boots_wizard',
        type: 'BOOTS',
        armor: 6,
        strength: 1,
        agility: 4,
        intelligence: 10,
      },
      {
        id: 'boots_shoes_endurance',
        i18n_key: 'armor.boots_shoes_endurance',
        type: 'BOOTS',
        armor: 7,
        strength: 9,
        agility: 6,
        intelligence: 3,
      },
      {
        id: 'boots_sandals_agility',
        i18n_key: 'armor.boots_sandals_agility',
        type: 'BOOTS',
        armor: 8,
        strength: 2,
        agility: 10,
        intelligence: 1,
      },
      {
        id: 'boots_ankle_boots',
        i18n_key: 'armor.boots_ankle_boots',
        type: 'BOOTS',
        armor: 5,
        strength: 7,
        agility: 3,
        intelligence: 4,
      },
      {
        id: 'boots_leather_boots_hunter',
        i18n_key: 'armor.boots_leather_boots_hunter',
        type: 'BOOTS',
        armor: 6,
        strength: 5,
        agility: 4,
        intelligence: 8,
      },
      {
        id: 'boots_plate_boots_protector',
        i18n_key: 'armor.boots_plate_boots_protector',
        type: 'BOOTS',
        armor: 7,
        strength: 8,
        agility: 3,
        intelligence: 5,
      },
      // Special biome armor
      {
        id: 'head_swamp_helm',
        i18n_key: 'armor.head_swamp_helm',
        type: 'HEAD',
        armor: 6,
        strength: 2,
        agility: 6,
        intelligence: 7,
      },
      {
        id: 'chest_swamp_shell',
        i18n_key: 'armor.chest_swamp_shell',
        type: 'CHEST',
        armor: 8,
        strength: 3,
        agility: 5,
        intelligence: 8,
      },
      {
        id: 'boots_swamp_reed',
        i18n_key: 'armor.boots_swamp_reed',
        type: 'BOOTS',
        armor: 4,
        strength: 2,
        agility: 10,
        intelligence: 5,
      },
      {
        id: 'head_lake_sprite',
        i18n_key: 'armor.head_lake_sprite',
        type: 'HEAD',
        armor: 5,
        strength: 1,
        agility: 8,
        intelligence: 9,
      },
      {
        id: 'chest_lake_froth',
        i18n_key: 'armor.chest_lake_froth',
        type: 'CHEST',
        armor: 7,
        strength: 2,
        agility: 7,
        intelligence: 8,
      },
      {
        id: 'boots_lake_lily',
        i18n_key: 'armor.boots_lake_lily',
        type: 'BOOTS',
        armor: 3,
        strength: 1,
        agility: 12,
        intelligence: 6,
      },
      {
        id: 'head_hill_troll',
        i18n_key: 'armor.head_hill_troll',
        type: 'HEAD',
        armor: 10,
        strength: 8,
        agility: 2,
        intelligence: 1,
      },
      {
        id: 'chest_hill_stone',
        i18n_key: 'armor.chest_hill_stone',
        type: 'CHEST',
        armor: 11,
        strength: 7,
        agility: 2,
        intelligence: 2,
      },
      {
        id: 'boots_hill_goat',
        i18n_key: 'armor.boots_hill_goat',
        type: 'BOOTS',
        armor: 5,
        strength: 8,
        agility: 7,
        intelligence: 2,
      },
      {
        id: 'head_desert_turban',
        i18n_key: 'armor.head_desert_turban',
        type: 'HEAD',
        armor: 4,
        strength: 2,
        agility: 7,
        intelligence: 8,
      },
      {
        id: 'chest_desert_shroud',
        i18n_key: 'armor.chest_desert_shroud',
        type: 'CHEST',
        armor: 6,
        strength: 3,
        agility: 10,
        intelligence: 5,
      },
      {
        id: 'boots_desert_snake',
        i18n_key: 'armor.boots_desert_snake',
        type: 'BOOTS',
        armor: 4,
        strength: 2,
        agility: 11,
        intelligence: 3,
      },
      {
        id: 'head_farm_hat',
        i18n_key: 'armor.head_farm_hat',
        type: 'HEAD',
        armor: 3,
        strength: 1,
        agility: 8,
        intelligence: 5,
      },
      {
        id: 'chest_farm_vest',
        i18n_key: 'armor.chest_farm_vest',
        type: 'CHEST',
        armor: 5,
        strength: 2,
        agility: 9,
        intelligence: 3,
      },
      {
        id: 'boots_farm_boots',
        i18n_key: 'armor.boots_farm_boots',
        type: 'BOOTS',
        armor: 4,
        strength: 2,
        agility: 8,
        intelligence: 2,
      },
      {
        id: 'head_suburb_cap',
        i18n_key: 'armor.head_suburb_cap',
        type: 'HEAD',
        armor: 4,
        strength: 2,
        agility: 7,
        intelligence: 6,
      },
      {
        id: 'chest_suburb_vest',
        i18n_key: 'armor.chest_suburb_vest',
        type: 'CHEST',
        armor: 6,
        strength: 2,
        agility: 8,
        intelligence: 4,
      },
      {
        id: 'boots_suburb_shoes',
        i18n_key: 'armor.boots_suburb_shoes',
        type: 'BOOTS',
        armor: 3,
        strength: 1,
        agility: 10,
        intelligence: 3,
      },
    ],
  })

  // Seed Weapons
  console.log('🗡️  Seeding weapons...')
  await prisma.weapon.createMany({
    data: [
      // Light weapons
      { id: 'dagger', i18n_key: 'weapon.dagger', damage_from: 4, damage_to: 10 },
      { id: 'kama', i18n_key: 'weapon.kama', damage_from: 5, damage_to: 12 },
      { id: 'kusatko', i18n_key: 'weapon.kusatko', damage_from: 3, damage_to: 8 },
      { id: 'scissors', i18n_key: 'weapon.scissors', damage_from: 5, damage_to: 11 },
      { id: 'fang', i18n_key: 'weapon.fang', damage_from: 6, damage_to: 12 },
      { id: 'claw', i18n_key: 'weapon.claw', damage_from: 6, damage_to: 13 },
      // Medium weapons
      { id: 'sword', i18n_key: 'weapon.sword', damage_from: 12, damage_to: 22 },
      { id: 'club_2', i18n_key: 'weapon.club_2', damage_from: 12, damage_to: 22 },
      { id: 'rapier', i18n_key: 'weapon.rapier', damage_from: 10, damage_to: 18 },
      { id: 'sabre', i18n_key: 'weapon.sabre', damage_from: 13, damage_to: 24 },
      { id: 'hammer', i18n_key: 'weapon.hammer', damage_from: 14, damage_to: 24 },
      { id: 'axe', i18n_key: 'weapon.axe', damage_from: 15, damage_to: 26 },
      { id: 'tupilka', i18n_key: 'weapon.tupilka', damage_from: 10, damage_to: 18 },
      { id: 'pitchfork', i18n_key: 'weapon.pitchfork', damage_from: 10, damage_to: 18 },
      { id: 'bone_club', i18n_key: 'weapon.bone_club', damage_from: 12, damage_to: 20 },
      // Heavy weapons
      { id: 'club', i18n_key: 'weapon.club', damage_from: 18, damage_to: 32 },
      { id: 'krakolej', i18n_key: 'weapon.krakolej', damage_from: 28, damage_to: 48 },
      { id: 'thrash', i18n_key: 'weapon.thrash', damage_from: 22, damage_to: 40 },
      { id: 'anchor', i18n_key: 'weapon.anchor', damage_from: 20, damage_to: 38 },
      { id: 'mace_weapon', i18n_key: 'weapon.mace_weapon', damage_from: 24, damage_to: 44 },
      // Magical/Special
      { id: 'wand', i18n_key: 'weapon.wand', damage_from: 10, damage_to: 20 },
      { id: 'sodna_lahve', i18n_key: 'weapon.sodna_lahve', damage_from: 8, damage_to: 16 },
      { id: 'bottle', i18n_key: 'weapon.bottle', damage_from: 6, damage_to: 12 },
      // Ranged and other
      { id: 'arrow', i18n_key: 'weapon.arrow', damage_from: 7, damage_to: 15 },
      { id: 'bow', i18n_key: 'weapon.bow', damage_from: 15, damage_to: 25 },
      { id: 'mace', i18n_key: 'weapon.mace', damage_from: 16, damage_to: 28 },
      { id: 'mace_2', i18n_key: 'weapon.mace_2', damage_from: 18, damage_to: 32 },
      { id: 'crossbow', i18n_key: 'weapon.crossbow', damage_from: 18, damage_to: 32 },
      { id: 'katar', i18n_key: 'weapon.katar', damage_from: 7, damage_to: 14 },
      { id: 'axe_2', i18n_key: 'weapon.axe_2', damage_from: 18, damage_to: 32 },
      { id: 'club_3', i18n_key: 'weapon.club_3', damage_from: 16, damage_to: 28 },
      { id: 'mace_3', i18n_key: 'weapon.mace_3', damage_from: 18, damage_to: 32 },
      { id: 'cloth', i18n_key: 'weapon.cloth', damage_from: 4, damage_to: 10 },
      { id: 'fist_weapon', i18n_key: 'weapon.fist_weapon', damage_from: 10, damage_to: 18 },
      { id: 'blade', i18n_key: 'weapon.blade', damage_from: 14, damage_to: 26 },
      { id: 'shingle', i18n_key: 'weapon.shingle', damage_from: 12, damage_to: 22 },
      { id: 'piercing_weapon', i18n_key: 'weapon.piercing_weapon', damage_from: 16, damage_to: 28 },
      { id: 'shooting_weapon', i18n_key: 'weapon.shooting_weapon', damage_from: 14, damage_to: 26 },
      { id: 'attack_weapon', i18n_key: 'weapon.attack_weapon', damage_from: 10, damage_to: 18 },
      { id: 'parat', i18n_key: 'weapon.parat', damage_from: 14, damage_to: 26 },
      { id: 'flajska', i18n_key: 'weapon.flajska', damage_from: 6, damage_to: 12 },
      { id: 'slap', i18n_key: 'weapon.slap', damage_from: 8, damage_to: 16 },
      { id: 'combat_dagger', i18n_key: 'weapon.combat_dagger', damage_from: 12, damage_to: 22 },
      { id: 'combat_sword', i18n_key: 'weapon.combat_sword', damage_from: 18, damage_to: 32 },
      { id: 'trailing', i18n_key: 'weapon.trailing', damage_from: 18, damage_to: 32 },
      { id: 'six', i18n_key: 'weapon.six', damage_from: 12, damage_to: 22 },
      { id: 'fight_weapons', i18n_key: 'weapon.fight_weapons', damage_from: 16, damage_to: 28 },
      { id: 'shooting_weapon_2', i18n_key: 'weapon.shooting_weapon_2', damage_from: 14, damage_to: 26 },
      { id: 'javelin', i18n_key: 'weapon.javelin', damage_from: 12, damage_to: 22 },
      { id: 'caliber', i18n_key: 'weapon.caliber', damage_from: 18, damage_to: 32 },
    ],
  })

  // Seed Potions
  console.log('🧪 Seeding potions...')
  await prisma.potion.createMany({
    data: [
      { id: 'potion_weak', i18n_key: 'potion.potion_weak', hp_gain: 50 },
      { id: 'potion_medium_strength', i18n_key: 'potion.potion_medium_strength', hp_gain: 100 },
      { id: 'potion_strong', i18n_key: 'potion.potion_strong', hp_gain: 200 },
    ],
  })

  // Seed Hospital, Armory, Bank
  console.log('🏥 Seeding hospital...')
  await prisma.hospital.create({
    data: { id: 'main_city_hospital', i18n_key: 'place.main_city_hospital', healing_price: 250 },
  })

  console.log('⚒️  Seeding armory...')
  await prisma.armory.create({
    data: { id: 'main_city_armory', i18n_key: 'place.main_city_armory' },
  })

  console.log('🏦 Seeding bank...')
  await prisma.bank.create({
    data: { id: 'main_city_bank', i18n_key: 'place.main_city_bank' },
  })

  // Seed Places
  console.log('🗺️  Seeding places...')
  await prisma.place.createMany({
    data: [
      {
        id: 'main_city',
        i18n_key: 'place.main_city',
        type: 'SAFEHOUSE',
        x_min: 0,
        x_max: 0,
        y_min: 0,
        y_max: 0,
        hospital_id: 'main_city_hospital',
        armory_id: 'main_city_armory',
        bank_id: 'main_city_bank',
      },
      {
        id: 'forest_clearing',
        i18n_key: 'place.forest_clearing',
        type: 'FOREST',
        x_min: -10,
        x_max: 15,
        y_min: 3,
        y_max: 9,
      },
      { id: 'cemetery', i18n_key: 'place.cemetery', type: 'CEMETERY', x_min: 20, x_max: 25, y_min: 5, y_max: 10 },
      { id: 'desert', i18n_key: 'place.desert', type: 'DESERT', x_min: 40, x_max: 45, y_min: -10, y_max: -5 },
      { id: 'farmstead', i18n_key: 'place.farmstead', type: 'FARM', x_min: -20, x_max: -15, y_min: 10, y_max: 15 },
      {
        id: 'castle_suburb',
        i18n_key: 'place.castle_suburb',
        type: 'SUBURB',
        x_min: 5,
        x_max: 10,
        y_min: 10,
        y_max: 15,
      },
      { id: 'hills', i18n_key: 'place.hills', type: 'HILLS', x_min: -30, x_max: -20, y_min: 20, y_max: 30 },
      { id: 'swamp', i18n_key: 'place.swamp', type: 'SWAMP', x_min: 50, x_max: 60, y_min: -20, y_max: -10 },
      { id: 'lake', i18n_key: 'place.lake', type: 'LAKE', x_min: 15, x_max: 25, y_min: -25, y_max: -15 },
    ],
  })

  // Seed Quests
  console.log('📜 Seeding quests...')
  await prisma.quest.createMany({
    data: [
      { id: 'slain_enemy', ident: 'SLAIN_ENEMY', i18n_key: 'quest.slain_enemy', reward_money: 1000 },
      { id: 'slain_troll', ident: 'SLAIN_TROLL', i18n_key: 'quest.slain_troll', reward_money: 5000 },
    ],
  })

  // Seed EnemyInPlace
  console.log('👹 Seeding enemy spawns in places...')
  await prisma.enemyInPlace.createMany({
    data: [
      // FOREST
      { enemy_id: 'GOBLIN', place_id: 'forest_clearing', spawn_rate: 0.35 },
      { enemy_id: 'WOLF', place_id: 'forest_clearing', spawn_rate: 0.35 },
      { enemy_id: 'BANDIT', place_id: 'forest_clearing', spawn_rate: 0.3 },
      // CEMETERY
      { enemy_id: 'ZOMBIE', place_id: 'cemetery', spawn_rate: 0.4 },
      { enemy_id: 'SKELETON', place_id: 'cemetery', spawn_rate: 0.35 },
      { enemy_id: 'GHOUL', place_id: 'cemetery', spawn_rate: 0.25 },
      // DESERT
      { enemy_id: 'SCORPION', place_id: 'desert', spawn_rate: 0.4 },
      { enemy_id: 'SAND_WORM', place_id: 'desert', spawn_rate: 0.3 },
      { enemy_id: 'DESERT_BANDIT', place_id: 'desert', spawn_rate: 0.3 },
      // FARM
      { enemy_id: 'WILD_BOAR', place_id: 'farmstead', spawn_rate: 0.6 },
      { enemy_id: 'ANGRY_FARMER', place_id: 'farmstead', spawn_rate: 0.4 },
      // SUBURB
      { enemy_id: 'THIEF', place_id: 'castle_suburb', spawn_rate: 0.6 },
      { enemy_id: 'DRUNKARD', place_id: 'castle_suburb', spawn_rate: 0.4 },
      // HILLS
      { enemy_id: 'HILL_TROLL', place_id: 'hills', spawn_rate: 0.4 },
      { enemy_id: 'MOUNTAIN_GOAT', place_id: 'hills', spawn_rate: 0.6 },
      // SWAMP
      { enemy_id: 'SWAMP_LIZARD', place_id: 'swamp', spawn_rate: 0.4 },
      { enemy_id: 'GIANT_LEECH', place_id: 'swamp', spawn_rate: 0.3 },
      { enemy_id: 'SWAMP_GHOST', place_id: 'swamp', spawn_rate: 0.3 },
      // LAKE
      { enemy_id: 'WATER_SPRITE', place_id: 'lake', spawn_rate: 0.4 },
      { enemy_id: 'GIANT_FROG', place_id: 'lake', spawn_rate: 0.35 },
      { enemy_id: 'DROWNED', place_id: 'lake', spawn_rate: 0.25 },
    ],
  })

  // Seed PotionInHospital
  console.log('🧪 Seeding potions in hospital...')
  await prisma.potionInHospital.createMany({
    data: [
      { price: 100, potion_id: 'potion_weak', hospital_id: 'main_city_hospital' },
      { price: 250, potion_id: 'potion_medium_strength', hospital_id: 'main_city_hospital' },
      { price: 500, potion_id: 'potion_strong', hospital_id: 'main_city_hospital' },
    ],
  })

  // Seed WeaponInArmory
  console.log('🗡️  Seeding weapons in armory...')
  await prisma.weaponInArmory.createMany({
    data: [
      { price: 600, weapon_id: 'dagger', armory_id: 'main_city_armory' },
      { price: 800, weapon_id: 'kama', armory_id: 'main_city_armory' },
      { price: 950, weapon_id: 'sword', armory_id: 'main_city_armory' },
      { price: 1200, weapon_id: 'club_2', armory_id: 'main_city_armory' },
      { price: 1400, weapon_id: 'rapier', armory_id: 'main_city_armory' },
      { price: 1600, weapon_id: 'hammer', armory_id: 'main_city_armory' },
      { price: 1800, weapon_id: 'axe', armory_id: 'main_city_armory' },
      { price: 2000, weapon_id: 'mace', armory_id: 'main_city_armory' },
      { price: 2200, weapon_id: 'bow', armory_id: 'main_city_armory' },
      { price: 2500, weapon_id: 'crossbow', armory_id: 'main_city_armory' },
    ],
  })

  // Seed ArmorInArmory
  console.log('🛡️  Seeding armor in armory...')
  await prisma.armorInArmory.createMany({
    data: [
      { price: 900, armor_id: 'head_helmet_defender', armory_id: 'main_city_armory' },
      { price: 950, armor_id: 'head_helmet_knight', armory_id: 'main_city_armory' },
      { price: 800, armor_id: 'shoulder_pauldrons_crusher', armory_id: 'main_city_armory' },
      { price: 850, armor_id: 'shoulder_epaulets_courage', armory_id: 'main_city_armory' },
      { price: 1200, armor_id: 'chest_armor_hero', armory_id: 'main_city_armory' },
      { price: 1300, armor_id: 'chest_leather_armor', armory_id: 'main_city_armory' },
      { price: 700, armor_id: 'hand_gloves_strength', armory_id: 'main_city_armory' },
      { price: 750, armor_id: 'hand_leather_gloves', armory_id: 'main_city_armory' },
      { price: 1000, armor_id: 'pants_pants_strength', armory_id: 'main_city_armory' },
      { price: 1100, armor_id: 'pants_plate_trousers_warrior', armory_id: 'main_city_armory' },
      { price: 600, armor_id: 'boots_boots_strength', armory_id: 'main_city_armory' },
      { price: 650, armor_id: 'boots_plate_boots_protector', armory_id: 'main_city_armory' },
    ],
  })

  // Seed EnemyLoot
  console.log('💰 Seeding enemy loot tables...')
  await prisma.enemyLoot.createMany({
    data: [
      // FOREST - GOBLIN
      { enemy_id: 'GOBLIN', weapon_id: 'dagger', drop_chance: 0.25 },
      { enemy_id: 'GOBLIN', weapon_id: 'cloth', drop_chance: 0.18 },
      { enemy_id: 'GOBLIN', armor_id: 'head_hood_shadow', drop_chance: 0.1 },
      { enemy_id: 'GOBLIN', armor_id: 'hand_gloves_strength', drop_chance: 0.08 },
      // FOREST - WOLF
      { enemy_id: 'WOLF', weapon_id: 'fang', drop_chance: 0.28 },
      { enemy_id: 'WOLF', weapon_id: 'claw', drop_chance: 0.15 },
      { enemy_id: 'WOLF', armor_id: 'boots_leather_boots_hunter', drop_chance: 0.12 },
      { enemy_id: 'WOLF', armor_id: 'shoulder_pauldrons_crusher', drop_chance: 0.08 },
      // FOREST - BANDIT
      { enemy_id: 'BANDIT', weapon_id: 'sword', drop_chance: 0.18 },
      { enemy_id: 'BANDIT', weapon_id: 'dagger', drop_chance: 0.14 },
      { enemy_id: 'BANDIT', armor_id: 'chest_leather_armor', drop_chance: 0.12 },
      { enemy_id: 'BANDIT', armor_id: 'pants_pants_strength', drop_chance: 0.09 },
      // CEMETERY - ZOMBIE
      { enemy_id: 'ZOMBIE', weapon_id: 'club', drop_chance: 0.14 },
      { enemy_id: 'ZOMBIE', weapon_id: 'bottle', drop_chance: 0.1 },
      { enemy_id: 'ZOMBIE', armor_id: 'pants_pants_strength', drop_chance: 0.08 },
      { enemy_id: 'ZOMBIE', armor_id: 'boots_boots_strength', drop_chance: 0.07 },
      // CEMETERY - SKELETON
      { enemy_id: 'SKELETON', weapon_id: 'bone_club', drop_chance: 0.2 },
      { enemy_id: 'SKELETON', weapon_id: 'dagger', drop_chance: 0.1 },
      { enemy_id: 'SKELETON', armor_id: 'head_mask_mystery', drop_chance: 0.1 },
      { enemy_id: 'SKELETON', armor_id: 'hand_chainmail_gloves', drop_chance: 0.07 },
      // CEMETERY - GHOUL
      { enemy_id: 'GHOUL', weapon_id: 'mace', drop_chance: 0.12 },
      { enemy_id: 'GHOUL', weapon_id: 'mace_2', drop_chance: 0.08 },
      { enemy_id: 'GHOUL', armor_id: 'chest_cloak_mystery', drop_chance: 0.1 },
      { enemy_id: 'GHOUL', armor_id: 'shoulder_pauldrons_mystic', drop_chance: 0.07 },
      // DESERT - SCORPION
      { enemy_id: 'SCORPION', weapon_id: 'claw', drop_chance: 0.25 },
      { enemy_id: 'SCORPION', weapon_id: 'fang', drop_chance: 0.15 },
      { enemy_id: 'SCORPION', armor_id: 'boots_desert_snake', drop_chance: 0.1 },
      { enemy_id: 'SCORPION', armor_id: 'hand_gloves_sprinter', drop_chance: 0.08 },
      // DESERT - SAND_WORM
      { enemy_id: 'SAND_WORM', weapon_id: 'fang', drop_chance: 0.16 },
      { enemy_id: 'SAND_WORM', weapon_id: 'kama', drop_chance: 0.1 },
      { enemy_id: 'SAND_WORM', armor_id: 'chest_desert_shroud', drop_chance: 0.1 },
      { enemy_id: 'SAND_WORM', armor_id: 'pants_pants_sprinter', drop_chance: 0.07 },
      // DESERT - DESERT_BANDIT
      { enemy_id: 'DESERT_BANDIT', weapon_id: 'kama', drop_chance: 0.2 },
      { enemy_id: 'DESERT_BANDIT', weapon_id: 'kusatko', drop_chance: 0.12 },
      { enemy_id: 'DESERT_BANDIT', armor_id: 'head_desert_turban', drop_chance: 0.1 },
      { enemy_id: 'DESERT_BANDIT', armor_id: 'shoulder_pauldrons_stealth', drop_chance: 0.08 },
      // FARM - WILD_BOAR
      { enemy_id: 'WILD_BOAR', weapon_id: 'fang', drop_chance: 0.18 },
      { enemy_id: 'WILD_BOAR', weapon_id: 'club', drop_chance: 0.1 },
      { enemy_id: 'WILD_BOAR', armor_id: 'boots_farm_boots', drop_chance: 0.1 },
      { enemy_id: 'WILD_BOAR', armor_id: 'hand_leather_gloves', drop_chance: 0.07 },
      // FARM - ANGRY_FARMER
      { enemy_id: 'ANGRY_FARMER', weapon_id: 'pitchfork', drop_chance: 0.18 },
      { enemy_id: 'ANGRY_FARMER', weapon_id: 'club', drop_chance: 0.12 },
      { enemy_id: 'ANGRY_FARMER', armor_id: 'head_farm_hat', drop_chance: 0.1 },
      { enemy_id: 'ANGRY_FARMER', armor_id: 'chest_farm_vest', drop_chance: 0.08 },
      // SUBURB - THIEF
      { enemy_id: 'THIEF', weapon_id: 'dagger', drop_chance: 0.2 },
      { enemy_id: 'THIEF', weapon_id: 'kama', drop_chance: 0.12 },
      { enemy_id: 'THIEF', armor_id: 'boots_suburb_shoes', drop_chance: 0.1 },
      { enemy_id: 'THIEF', armor_id: 'shoulder_epaulets_agility', drop_chance: 0.08 },
      // SUBURB - DRUNKARD
      { enemy_id: 'DRUNKARD', weapon_id: 'bottle', drop_chance: 0.22 },
      { enemy_id: 'DRUNKARD', weapon_id: 'club', drop_chance: 0.1 },
      { enemy_id: 'DRUNKARD', armor_id: 'head_suburb_cap', drop_chance: 0.1 },
      { enemy_id: 'DRUNKARD', armor_id: 'pants_trousers_agility', drop_chance: 0.07 },
      // HILLS - HILL_TROLL
      { enemy_id: 'HILL_TROLL', weapon_id: 'club_2', drop_chance: 0.1 },
      { enemy_id: 'HILL_TROLL', weapon_id: 'club', drop_chance: 0.08 },
      { enemy_id: 'HILL_TROLL', armor_id: 'head_hill_troll', drop_chance: 0.12 },
      { enemy_id: 'HILL_TROLL', armor_id: 'chest_hill_stone', drop_chance: 0.09 },
      // HILLS - MOUNTAIN_GOAT
      { enemy_id: 'MOUNTAIN_GOAT', weapon_id: 'fang', drop_chance: 0.15 },
      { enemy_id: 'MOUNTAIN_GOAT', weapon_id: 'claw', drop_chance: 0.1 },
      { enemy_id: 'MOUNTAIN_GOAT', armor_id: 'boots_hill_goat', drop_chance: 0.1 },
      { enemy_id: 'MOUNTAIN_GOAT', armor_id: 'pants_plate_trousers_warrior', drop_chance: 0.07 },
      // SWAMP - SWAMP_LIZARD
      { enemy_id: 'SWAMP_LIZARD', weapon_id: 'claw', drop_chance: 0.18 },
      { enemy_id: 'SWAMP_LIZARD', weapon_id: 'fang', drop_chance: 0.12 },
      { enemy_id: 'SWAMP_LIZARD', armor_id: 'boots_swamp_reed', drop_chance: 0.1 },
      { enemy_id: 'SWAMP_LIZARD', armor_id: 'chest_swamp_shell', drop_chance: 0.08 },
      // SWAMP - GIANT_LEECH
      { enemy_id: 'GIANT_LEECH', weapon_id: 'fang', drop_chance: 0.16 },
      { enemy_id: 'GIANT_LEECH', weapon_id: 'bottle', drop_chance: 0.1 },
      { enemy_id: 'GIANT_LEECH', armor_id: 'head_swamp_helm', drop_chance: 0.1 },
      { enemy_id: 'GIANT_LEECH', armor_id: 'hand_gloves_mystic', drop_chance: 0.07 },
      // SWAMP - SWAMP_GHOST
      { enemy_id: 'SWAMP_GHOST', weapon_id: 'wand', drop_chance: 0.14 },
      { enemy_id: 'SWAMP_GHOST', weapon_id: 'cloth', drop_chance: 0.1 },
      { enemy_id: 'SWAMP_GHOST', armor_id: 'chest_swamp_shell', drop_chance: 0.1 },
      { enemy_id: 'SWAMP_GHOST', armor_id: 'shoulder_pauldrons_wizard', drop_chance: 0.08 },
      // LAKE - WATER_SPRITE
      { enemy_id: 'WATER_SPRITE', weapon_id: 'wand', drop_chance: 0.15 },
      { enemy_id: 'WATER_SPRITE', weapon_id: 'bottle', drop_chance: 0.12 },
      { enemy_id: 'WATER_SPRITE', armor_id: 'head_lake_sprite', drop_chance: 0.1 },
      { enemy_id: 'WATER_SPRITE', armor_id: 'boots_lake_lily', drop_chance: 0.08 },
      // LAKE - GIANT_FROG
      { enemy_id: 'GIANT_FROG', weapon_id: 'fang', drop_chance: 0.18 },
      { enemy_id: 'GIANT_FROG', weapon_id: 'claw', drop_chance: 0.12 },
      { enemy_id: 'GIANT_FROG', armor_id: 'boots_lake_lily', drop_chance: 0.1 },
      { enemy_id: 'GIANT_FROG', armor_id: 'pants_pants_mystic', drop_chance: 0.07 },
      // LAKE - DROWNED
      { enemy_id: 'DROWNED', weapon_id: 'club', drop_chance: 0.14 },
      { enemy_id: 'DROWNED', weapon_id: 'dagger', drop_chance: 0.1 },
      { enemy_id: 'DROWNED', armor_id: 'chest_lake_froth', drop_chance: 0.1 },
      { enemy_id: 'DROWNED', armor_id: 'hand_gloves_wizard', drop_chance: 0.08 },
    ],
  })

  console.log('✅ Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
