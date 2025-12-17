import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

const XP_PER_LEVEL = 100
const STARTING_GOLD = 50

async function main() {
  console.log('🌱 Seeding database...')

  // Create test user
  const email = 'test@example.com'
  const passwordHash = await hash('password123', 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash,
      username: 'testuser',
    },
  })

  console.log(`✅ Created test user: ${user.email}`)

  // Create sample items
  const items = await Promise.all([
    // Weapons
    prisma.item.create({
      data: {
        name: 'Iron Sword',
        description: 'A sturdy iron sword forged from pure iron',
        type: 'WEAPON',
        rarity: 'COMMON',
        value: 50,
        slot: 'WEAPON',
        iconName: 'sword',
        strength: 5,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Steel Sword',
        description: 'A sharp steel sword with a keen edge',
        type: 'WEAPON',
        rarity: 'UNCOMMON',
        value: 150,
        slot: 'WEAPON',
        iconName: 'sword',
        strength: 12,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Magic Staff',
        description: 'A wooden staff imbued with arcane magic',
        type: 'WEAPON',
        rarity: 'UNCOMMON',
        value: 120,
        slot: 'WEAPON',
        iconName: 'staff',
        strength: 3,
        intelligence: 10,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Dagger',
        description: 'A quick and deadly dagger for swift strikes',
        type: 'WEAPON',
        rarity: 'COMMON',
        value: 40,
        slot: 'WEAPON',
        iconName: 'dagger',
        strength: 4,
        agility: 3,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Longbow',
        description: 'A fine yew longbow with excellent range',
        type: 'WEAPON',
        rarity: 'COMMON',
        value: 60,
        slot: 'WEAPON',
        iconName: 'bow',
        strength: 6,
        agility: 4,
      },
    }),

    // Armor
    prisma.item.create({
      data: {
        name: 'Leather Helmet',
        description: 'Basic leather helmet offering light protection',
        type: 'ARMOR',
        rarity: 'COMMON',
        value: 20,
        slot: 'HEAD',
        iconName: 'helmet',
        stamina: 2,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Chainmail',
        description: 'Heavy chainmail armor for maximum protection',
        type: 'ARMOR',
        rarity: 'UNCOMMON',
        value: 100,
        slot: 'CHEST',
        iconName: 'armor',
        stamina: 8,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Mage Robes',
        description: 'Robes woven with magical threads',
        type: 'ARMOR',
        rarity: 'UNCOMMON',
        value: 80,
        slot: 'CHEST',
        iconName: 'robe',
        intelligence: 6,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Leather Boots',
        description: 'Comfortable leather boots for traveling',
        type: 'ARMOR',
        rarity: 'COMMON',
        value: 15,
        slot: 'FEET',
        iconName: 'boots',
        agility: 2,
      },
    }),

    // Consumables
    prisma.item.create({
      data: {
        name: 'Health Potion',
        description: 'Restores 50 HP when consumed',
        type: 'CONSUMABLE',
        rarity: 'COMMON',
        value: 20,
        iconName: 'potion-red',
        healing: 50,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Mana Potion',
        description: 'Restores 50 Mana when consumed',
        type: 'CONSUMABLE',
        rarity: 'COMMON',
        value: 25,
        iconName: 'potion-blue',
        manaRestore: 50,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Greater Health Potion',
        description: 'Restores 150 HP when consumed',
        type: 'CONSUMABLE',
        rarity: 'RARE',
        value: 60,
        iconName: 'potion-red',
        healing: 150,
      },
    }),

    // Materials
    prisma.item.create({
      data: {
        name: 'Iron Ore',
        description: 'Raw iron ore, useful for crafting',
        type: 'MATERIAL',
        rarity: 'COMMON',
        value: 5,
        iconName: 'ore',
      },
    }),
    prisma.item.create({
      data: {
        name: 'Magic Crystal',
        description: 'A glowing crystal with magical properties',
        type: 'MATERIAL',
        rarity: 'RARE',
        value: 50,
        iconName: 'crystal',
      },
    }),
  ])

  console.log(`✅ Created ${items.length} items`)

  // Create sample quests with objectives
  await prisma.quest.create({
    data: {
      title: 'Welcome to Machala',
      description: 'Begin your adventure by exploring the starting town and meeting the locals.',
      category: 'MAIN',
      level: 1,
      giver: 'Village Elder',
      location: 'Starting Town',
      story: 'You have arrived in the mystical Land of Machala. Adventure awaits!',
      rewardGold: STARTING_GOLD,
      rewardXp: XP_PER_LEVEL / 2,
      objectives: {
        create: [
          { description: 'Talk to the blacksmith', target: 1, order: 0 },
          { description: 'Visit the tavern', target: 1, order: 1 },
          { description: 'Explore the market', target: 1, order: 2 },
        ],
      },
    },
  })

  await prisma.quest.create({
    data: {
      title: 'Rat Problem',
      description: 'The tavern cellar is infested with giant rats. Clear them out!',
      category: 'SIDE',
      level: 1,
      giver: 'Tavern Keeper',
      location: 'Tavern Cellar',
      rewardGold: 30,
      rewardXp: 50,
      objectives: {
        create: [{ description: 'Defeat 5 rats', target: 5, order: 0 }],
      },
    },
  })

  await prisma.quest.create({
    data: {
      title: 'Lost Amulet',
      description: 'Find the lost amulet hidden somewhere in the nearby ruins.',
      category: 'SIDE',
      level: 2,
      giver: 'Mysterious Stranger',
      location: 'Ancient Ruins',
      rewardGold: 100,
      rewardXp: 150,
      objectives: {
        create: [
          { description: 'Search the ruins', target: 1, order: 0 },
          { description: 'Find the amulet', target: 1, order: 1 },
        ],
      },
    },
  })

  await prisma.quest.create({
    data: {
      title: 'Defeat the Goblin King',
      description: 'The goblin king terrorizes the nearby forest. Defeat him and bring peace!',
      category: 'MAIN',
      level: 3,
      giver: 'Captain of the Guard',
      location: 'Goblin Camp',
      story: 'Goblins have been raiding our supply caravans. Their king must be stopped.',
      rewardGold: 200,
      rewardXp: XP_PER_LEVEL * 2,
      objectives: {
        create: [
          { description: 'Defeat goblin warriors', target: 10, order: 0 },
          { description: 'Defeat the Goblin King', target: 1, order: 1 },
        ],
      },
    },
  })

  await prisma.quest.create({
    data: {
      title: 'Bandit Camp',
      description: 'A group of bandits has set up camp near the trade route. Eliminate them.',
      category: 'DAILY',
      level: 4,
      giver: 'Merchant Guild',
      location: 'Trade Route',
      rewardGold: 250,
      rewardXp: 300,
      objectives: {
        create: [
          { description: 'Clear the bandit camp', target: 8, order: 0 },
          { description: 'Recover stolen goods', target: 1, order: 1 },
        ],
      },
    },
  })

  console.log(`✅ Created 5 quests with objectives`)

  // Create skills (Combat tree)
  const skills = await Promise.all([
    // Combat tree (Tier 1)
    prisma.skill.create({
      data: {
        name: 'Power Strike',
        description: 'Deal 150% weapon damage with your next attack',
        tree: 'COMBAT',
        tier: 1,
        maxRank: 3,
        iconName: 'power-strike',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Dual Wield',
        description: 'Equip two one-handed weapons for increased damage',
        tree: 'COMBAT',
        tier: 1,
        maxRank: 1,
        iconName: 'dual-wield',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Combat tree (Tier 2)
    prisma.skill.create({
      data: {
        name: 'Cleave',
        description: 'Attack hits multiple enemies in front of you',
        tree: 'COMBAT',
        tier: 2,
        maxRank: 3,
        iconName: 'cleave',
        requiredLevel: 3,
        requiredTreePoints: 2,
        positionX: 0,
        positionY: 1,
      },
    }),

    // Defense tree (Tier 1)
    prisma.skill.create({
      data: {
        name: 'Shield Block',
        description: 'Passively reduce incoming damage by 10%',
        tree: 'DEFENSE',
        tier: 1,
        maxRank: 5,
        iconName: 'shield',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Iron Skin',
        description: 'Increase maximum HP by 15',
        tree: 'DEFENSE',
        tier: 1,
        maxRank: 3,
        iconName: 'iron-skin',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Magic tree (Tier 1)
    prisma.skill.create({
      data: {
        name: 'Fireball',
        description: 'Cast a fireball dealing magic damage',
        tree: 'MAGIC',
        tier: 1,
        maxRank: 5,
        iconName: 'fireball',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Mana Shield',
        description: 'Absorb damage using mana instead of HP',
        tree: 'MAGIC',
        tier: 1,
        maxRank: 1,
        iconName: 'mana-shield',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Magic tree (Tier 2)
    prisma.skill.create({
      data: {
        name: 'Chain Lightning',
        description: 'Lightning that bounces between enemies',
        tree: 'MAGIC',
        tier: 2,
        maxRank: 3,
        iconName: 'lightning',
        requiredLevel: 3,
        requiredTreePoints: 2,
        positionX: 0,
        positionY: 1,
      },
    }),
  ])

  console.log(`✅ Created ${skills.length} skills`)

  // Create enemies
  const enemies = await Promise.all([
    prisma.enemy.create({
      data: {
        name: 'Giant Rat',
        level: 1,
        maxHp: 30,
        attack: 5,
        defense: 2,
        magic: 0,
        behavior: 'AGGRESSIVE',
        goldReward: 5,
        experienceReward: 10,
        iconName: 'rat',
      },
    }),
    prisma.enemy.create({
      data: {
        name: 'Goblin Scout',
        level: 2,
        maxHp: 50,
        attack: 8,
        defense: 3,
        magic: 0,
        behavior: 'BALANCED',
        goldReward: 10,
        experienceReward: 20,
        iconName: 'goblin',
      },
    }),
    prisma.enemy.create({
      data: {
        name: 'Goblin Warrior',
        level: 3,
        maxHp: 80,
        attack: 12,
        defense: 5,
        magic: 0,
        behavior: 'AGGRESSIVE',
        goldReward: 15,
        experienceReward: 30,
        iconName: 'goblin-warrior',
      },
    }),
    prisma.enemy.create({
      data: {
        name: 'Goblin King',
        level: 5,
        maxHp: 200,
        attack: 20,
        defense: 10,
        magic: 5,
        behavior: 'BALANCED',
        goldReward: 100,
        experienceReward: 150,
        iconName: 'goblin-king',
      },
    }),
    prisma.enemy.create({
      data: {
        name: 'Bandit',
        level: 4,
        maxHp: 100,
        attack: 15,
        defense: 6,
        magic: 0,
        behavior: 'AGGRESSIVE',
        goldReward: 20,
        experienceReward: 40,
        iconName: 'bandit',
      },
    }),
    prisma.enemy.create({
      data: {
        name: 'Dark Mage',
        level: 6,
        maxHp: 120,
        attack: 10,
        defense: 4,
        magic: 25,
        behavior: 'DEFENSIVE',
        goldReward: 50,
        experienceReward: 80,
        iconName: 'dark-mage',
      },
    }),
  ])

  console.log(`✅ Created ${enemies.length} enemies`)

  // Create achievements
  const achievements = await Promise.all([
    // Combat achievements
    prisma.achievement.create({
      data: {
        title: 'First Blood',
        description: 'Defeat your first enemy',
        category: 'COMBAT',
        rarity: 'COMMON',
        maxProgress: 1,
        iconName: 'sword-badge',
        rewardGold: 10,
        rewardXp: 25,
      },
    }),
    prisma.achievement.create({
      data: {
        title: 'Slayer',
        description: 'Defeat 100 enemies',
        category: 'COMBAT',
        rarity: 'RARE',
        maxProgress: 100,
        iconName: 'slayer',
        rewardGold: 500,
        rewardXp: 1000,
      },
    }),

    // Quest achievements
    prisma.achievement.create({
      data: {
        title: 'Quest Beginner',
        description: 'Complete your first quest',
        category: 'QUESTS',
        rarity: 'COMMON',
        maxProgress: 1,
        iconName: 'quest-badge',
        rewardGold: 25,
        rewardXp: 50,
      },
    }),
    prisma.achievement.create({
      data: {
        title: 'Quest Master',
        description: 'Complete 50 quests',
        category: 'QUESTS',
        rarity: 'EPIC',
        maxProgress: 50,
        iconName: 'quest-master',
        rewardGold: 1000,
        rewardXp: 2000,
        rewardTitle: 'Quest Master',
      },
    }),

    // Exploration achievements
    prisma.achievement.create({
      data: {
        title: 'Explorer',
        description: 'Discover 10 locations',
        category: 'EXPLORATION',
        rarity: 'RARE',
        maxProgress: 10,
        iconName: 'compass',
        rewardGold: 100,
        rewardXp: 200,
      },
    }),

    // Collection achievements
    prisma.achievement.create({
      data: {
        title: 'Hoarder',
        description: 'Collect 100 items',
        category: 'COLLECTION',
        rarity: 'RARE',
        maxProgress: 100,
        iconName: 'chest',
        rewardGold: 250,
        rewardXp: 500,
      },
    }),

    // Progression achievements
    prisma.achievement.create({
      data: {
        title: 'Level 10',
        description: 'Reach character level 10',
        category: 'PROGRESSION',
        rarity: 'RARE',
        maxProgress: 1,
        iconName: 'level-up',
        rewardGold: 200,
        rewardXp: 0,
      },
    }),
    prisma.achievement.create({
      data: {
        title: 'Legendary Hero',
        description: 'Reach character level 50',
        category: 'PROGRESSION',
        rarity: 'LEGENDARY',
        maxProgress: 1,
        iconName: 'legendary',
        rewardGold: 5000,
        rewardXp: 0,
        rewardTitle: 'Legendary Hero',
        hidden: true,
      },
    }),
  ])

  console.log(`✅ Created ${achievements.length} achievements`)

  // Create locations
  const locations = await Promise.all([
    prisma.location.create({
      data: {
        name: 'Starting Town',
        type: 'TOWN',
        description: 'A peaceful town where your adventure begins',
        level: 1,
        positionX: 100,
        positionY: 100,
      },
    }),
    prisma.location.create({
      data: {
        name: 'Dark Forest',
        type: 'WILDERNESS',
        description: 'A dense forest filled with dangerous creatures',
        level: 2,
        positionX: 150,
        positionY: 120,
      },
    }),
    prisma.location.create({
      data: {
        name: 'Ancient Ruins',
        type: 'DUNGEON',
        description: 'Mysterious ruins from a forgotten age',
        level: 3,
        positionX: 180,
        positionY: 90,
      },
    }),
    prisma.location.create({
      data: {
        name: 'Goblin Camp',
        type: 'DUNGEON',
        description: 'The stronghold of the goblin king',
        level: 5,
        positionX: 200,
        positionY: 150,
      },
    }),
    prisma.location.create({
      data: {
        name: 'Mountain Peak',
        type: 'LANDMARK',
        description: 'The highest point in all of Machala',
        level: 10,
        positionX: 250,
        positionY: 50,
      },
    }),
    prisma.location.create({
      data: {
        name: 'Merchant City',
        type: 'TOWN',
        description: 'A bustling city of trade and commerce',
        level: 6,
        positionX: 120,
        positionY: 180,
      },
    }),
  ])

  console.log(`✅ Created ${locations.length} locations`)

  console.log('🌱 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
