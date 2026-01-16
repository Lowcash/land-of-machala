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

    // Additional Weapons
    prisma.item.create({
      data: {
        name: 'Enchanted Battleaxe',
        description: 'A massive battleaxe crackling with lightning',
        type: 'WEAPON',
        rarity: 'EPIC',
        value: 450,
        slot: 'WEAPON',
        iconName: 'axe',
        strength: 22,
        intelligence: 5,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Arcane Wand',
        description: 'A wand pulsing with pure magical energy',
        type: 'WEAPON',
        rarity: 'RARE',
        value: 320,
        slot: 'WEAPON',
        iconName: 'wand',
        intelligence: 18,
        agility: 3,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Crossbow of Precision',
        description: 'Never misses its target',
        type: 'WEAPON',
        rarity: 'RARE',
        value: 280,
        slot: 'WEAPON',
        iconName: 'crossbow',
        strength: 10,
        agility: 12,
      },
    }),

    // Additional Armor
    prisma.item.create({
      data: {
        name: 'Dragon Scale Armor',
        description: 'Forged from the scales of an ancient dragon',
        type: 'ARMOR',
        rarity: 'LEGENDARY',
        value: 1200,
        slot: 'CHEST',
        iconName: 'armor',
        stamina: 25,
        strength: 10,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Shadow Cloak',
        description: 'Grants the wearer enhanced stealth',
        type: 'ARMOR',
        rarity: 'EPIC',
        value: 650,
        slot: 'CHEST',
        iconName: 'cloak',
        agility: 15,
        intelligence: 8,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Steel Gauntlets',
        description: 'Heavy gauntlets that enhance grip strength',
        type: 'ARMOR',
        rarity: 'UNCOMMON',
        value: 85,
        slot: 'HANDS',
        iconName: 'gloves',
        strength: 5,
        stamina: 3,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Boots of Swiftness',
        description: 'Light as air, swift as wind',
        type: 'ARMOR',
        rarity: 'RARE',
        value: 180,
        slot: 'FEET',
        iconName: 'boots',
        agility: 10,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Crown of Wisdom',
        description: "Enhances the wearer's mental clarity",
        type: 'ARMOR',
        rarity: 'EPIC',
        value: 720,
        slot: 'HEAD',
        iconName: 'crown',
        intelligence: 18,
        stamina: 5,
      },
    }),

    // More Consumables
    prisma.item.create({
      data: {
        name: 'Elixir of Strength',
        description: 'Temporarily increases strength by 20%',
        type: 'CONSUMABLE',
        rarity: 'UNCOMMON',
        value: 45,
        iconName: 'elixir',
        strength: 10,
      },
    }),
    prisma.item.create({
      data: {
        name: 'Scroll of Teleportation',
        description: 'Instantly teleports you to a safe location',
        type: 'CONSUMABLE',
        rarity: 'RARE',
        value: 150,
        iconName: 'scroll',
      },
    }),
    prisma.item.create({
      data: {
        name: 'Phoenix Feather',
        description: 'Revives the user upon death',
        type: 'CONSUMABLE',
        rarity: 'LEGENDARY',
        value: 1000,
        iconName: 'feather',
        healing: 999,
      },
    }),
  ])

  console.log(`✅ Created ${items.length} items`)

  // Create sample quests with objectives and rewards
  await prisma.quest.create({
    data: {
      title: 'Vítej v Machale',
      description: 'Začni své dobrodružství prozkoumáním města a setkáním s místními.',
      category: 'MAIN',
      level: 1,
      giver: 'Starosta města',
      location: 'Hlavní náměstí',
      story:
        'Přišel jsi do mystické Země Machaly. Starosta tě vítá a prosí, abys se seznámil s městem a jeho obyvateli. Tvá cesta začíná zde, dobrodruhu!',
      rewardGold: STARTING_GOLD,
      rewardXp: XP_PER_LEVEL / 2,
      objectives: {
        create: [
          { description: 'Promluv se zbrojířem', target: 1, order: 0 },
          { description: 'Navštiv tavernu', target: 1, order: 1 },
          { description: 'Prozkoumej trh', target: 1, order: 2 },
        ],
      },
      rewards: {
        create: [{ itemId: items[0].id, quantity: 1 }],
      },
    },
  })

  const _quest2 = await prisma.quest.create({
    data: {
      title: 'Problém s krysami',
      description: 'Sklepení taverny je zamořené obřími krysami. Zlikviduj je!',
      category: 'SIDE',
      level: 1,
      giver: 'Majitel taverny',
      location: 'Sklepení taverny',
      story:
        '"Ty bestie mi požírají všechny zásoby! Potřebuji někoho statečného, kdo by je vyhnal. Slyšel jsem, že jsi nový v městě - máš zájem si na nich vyzkoušet svoje schopnosti?"',
      rewardGold: 30,
      rewardXp: 50,
      objectives: {
        create: [{ description: 'Poraz 5 krys', target: 5, order: 0 }],
      },
      rewards: {
        create: [
          { itemId: items[8].id, quantity: 2 }, // Health potions
        ],
      },
    },
  })

  const _quest3 = await prisma.quest.create({
    data: {
      title: 'Ztracený amulet',
      description: 'Najdi ztracený amulet ukrytý někde v nedalekých ruinách.',
      category: 'SIDE',
      level: 2,
      giver: 'Záhadný cizinec',
      location: 'Starobylé ruiny',
      story:
        '"Před mnoha lety jsem ztratil cenný amulet v těchto ruinách. Má nesmírnou sentimentální hodnotu - patřil mé babičce. Pokud mi jej najdeš, štědře tě odměním."',
      rewardGold: 100,
      rewardXp: 150,
      objectives: {
        create: [
          { description: 'Prozkoumej ruiny', target: 1, order: 0 },
          { description: 'Najdi amulet', target: 1, order: 1 },
        ],
      },
      rewards: {
        create: [{ itemId: items[2].id, quantity: 1 }],
      },
    },
  })

  const _quest4 = await prisma.quest.create({
    data: {
      title: 'Poraz krále goblinů',
      description: 'Král goblinů terorizuje nedaleký les. Poraz ho a přines mír!',
      category: 'MAIN',
      level: 3,
      giver: 'Kapitán stráže',
      location: 'Gobliní tábor',
      story:
        '"Goblini přepadávají naše zásobovací karavany. Jejich král je krutý a mocný. Potřebujeme někoho dostatečně statečného, aby ho porazil. Jsi ten pravý, dobrodruhu?"',
      rewardGold: 200,
      rewardXp: XP_PER_LEVEL * 2,
      objectives: {
        create: [
          { description: 'Poraz gobliní válečníky', target: 10, order: 0 },
          { description: 'Poraz krále goblinů', target: 1, order: 1 },
        ],
      },
      rewards: {
        create: [
          { itemId: items[1].id, quantity: 1 }, // Steel Sword
          { itemId: items[9].id, quantity: 3 }, // Mana potions
        ],
      },
    },
  })

  const _quest5 = await prisma.quest.create({
    data: {
      title: 'Tábor banditů',
      description: 'Skupina banditů si postavila tábor poblíž obchodní cesty. Eliminuj je.',
      category: 'DAILY',
      level: 4,
      giver: 'Kupecká guilda',
      location: 'Obchodní cesta',
      story:
        '"Tito banditi ohrožují naše obchodní cesty už příliš dlouho. Musíme je zastavit dřív, než způsobí ještě větší škody. Vyčisti jejich tábor a získej zpět ukradené zboží."',
      rewardGold: 250,
      rewardXp: 300,
      objectives: {
        create: [
          { description: 'Vyčisti tábor banditů', target: 8, order: 0 },
          { description: 'Získej zpět ukradené zboží', target: 1, order: 1 },
        ],
      },
      rewards: {
        create: [
          { itemId: items[3].id, quantity: 1 }, // Chainmail Armor
          { itemId: items[8].id, quantity: 5 }, // Health potions
        ],
      },
    },
  })

  console.log(`✅ Created 5 quests with objectives`)

  // Create skills (Complete WoW-style talent trees)
  const skills = await Promise.all([
    // ==================== COMBAT TREE ==================== (11 skills total)

    // Tier 1 (Level 1) - Basic attacks
    prisma.skill.create({
      data: {
        name: 'Silný úder',
        description: 'Zvyšuje poškození běžného útoku o 10% za level.',
        tree: 'COMBAT',
        tier: 1,
        maxRank: 5,
        iconName: 'swords',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Kritický zásah',
        description: 'Zvyšuje šanci na kritický zásah o 5% za level.',
        tree: 'COMBAT',
        tier: 1,
        maxRank: 5,
        iconName: 'target',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Tier 2 (Level 3) - Advanced combat
    prisma.skill.create({
      data: {
        name: 'Dvojitý úder',
        description: 'Šance 20% zaútočit dvakrát. Vyžaduje Silný úder level 3.',
        tree: 'COMBAT',
        tier: 2,
        maxRank: 3,
        iconName: 'swords',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 0,
        positionY: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Přesný úder',
        description: 'Ignoruje 15% obrany nepřítele za level.',
        tree: 'COMBAT',
        tier: 2,
        maxRank: 3,
        iconName: 'target',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 1,
        positionY: 1,
      },
    }),

    // Tier 3 (Level 5) - Elite combat
    prisma.skill.create({
      data: {
        name: 'Vířivý úder',
        description: 'Útok zasahující všechny nepřátele. Vyžaduje Kritický zásah level 2.',
        tree: 'COMBAT',
        tier: 3,
        maxRank: 1,
        iconName: 'swords',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 0,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Berserker',
        description: 'Když máš méně než 30% HP, útok +50%.',
        tree: 'COMBAT',
        tier: 3,
        maxRank: 1,
        iconName: 'swords',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 1,
        positionY: 2,
      },
    }),

    // ==================== DEFENSE TREE ==================== (10 skills total)

    // Tier 1 (Level 1) - Basic defense
    prisma.skill.create({
      data: {
        name: 'Železná kůže',
        description: 'Zvyšuje obranu o 5 za level.',
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
        name: 'Úder štítem',
        description: 'Útok který omráčí nepřítele. Vyžaduje štít.',
        tree: 'DEFENSE',
        tier: 1,
        maxRank: 3,
        iconName: 'shield',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Tier 2 (Level 3) - Advanced defense
    prisma.skill.create({
      data: {
        name: 'Protiútok',
        description: 'Šance 15% na protiútok při zablokování útoku.',
        tree: 'DEFENSE',
        tier: 2,
        maxRank: 3,
        iconName: 'shield',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 0,
        positionY: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Tvrdá hlava',
        description: 'Šance 10% odrazit magické útoky zpět na útočníka.',
        tree: 'DEFENSE',
        tier: 2,
        maxRank: 3,
        iconName: 'shield',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 1,
        positionY: 1,
      },
    }),

    // Tier 3 (Level 5) - Master defense
    prisma.skill.create({
      data: {
        name: 'Pevnost',
        description: 'Snižuje veškeré poškození o 20%. Vyžaduje Železnou kůži level 3.',
        tree: 'DEFENSE',
        tier: 3,
        maxRank: 1,
        iconName: 'shield',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 0,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Poslední vzdor',
        description: 'Když ti zbývá méně než 20% HP, obrana +100%.',
        tree: 'DEFENSE',
        tier: 3,
        maxRank: 1,
        iconName: 'shield',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 1,
        positionY: 2,
      },
    }),

    // ==================== MAGIC TREE ==================== (12 skills total)

    // Tier 1 (Level 1) - Basic magic
    prisma.skill.create({
      data: {
        name: 'Mana pool',
        description: 'Zvyšuje maximální manu o 10 za level.',
        tree: 'MAGIC',
        tier: 1,
        maxRank: 5,
        iconName: 'sparkles',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Ohnivá koule',
        description: 'Magický útok způsobující vysoké poškození.',
        tree: 'MAGIC',
        tier: 1,
        maxRank: 3,
        iconName: 'sparkles',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Magický štít',
        description: 'Absorbuje poškození za použití many.',
        tree: 'MAGIC',
        tier: 1,
        maxRank: 3,
        iconName: 'sparkles',
        requiredLevel: 1,
        positionX: 2,
        positionY: 0,
      },
    }),

    // Tier 2 (Level 3) - Advanced magic
    prisma.skill.create({
      data: {
        name: 'Arkánní síla',
        description: 'Všechny kouzla způsobují o 50% více poškození.',
        tree: 'MAGIC',
        tier: 2,
        maxRank: 1,
        iconName: 'sparkles',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 0,
        positionY: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Časové zkreslení',
        description: 'Šance 10% zpomalit nepřítele na 2 kola.',
        tree: 'MAGIC',
        tier: 2,
        maxRank: 3,
        iconName: 'sparkles',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 1,
        positionY: 1,
      },
    }),

    // Tier 3 (Level 5) - Master magic
    prisma.skill.create({
      data: {
        name: 'Teleportace',
        description: 'Okamžitě se teleportuj na bezpečné místo v boji.',
        tree: 'MAGIC',
        tier: 3,
        maxRank: 1,
        iconName: 'sparkles',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 0,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Meteor',
        description: 'Zavolej meteor způsobující obrovské poškození všem nepřátelům.',
        tree: 'MAGIC',
        tier: 3,
        maxRank: 1,
        iconName: 'sparkles',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 1,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Mrazivý opar',
        description: 'Zmrazí nepřítele na 1 kolo.',
        tree: 'MAGIC',
        tier: 2,
        maxRank: 1,
        iconName: 'sparkles',
        requiredLevel: 3,
        requiredTreePoints: 4,
        positionX: 2,
        positionY: 1,
      },
    }),

    // ==================== STEALTH TREE ==================== (New)

    // Tier 1 (Level 1) - Basic stealth
    prisma.skill.create({
      data: {
        name: 'Plížení',
        description: 'Zvyšuje šanci vyhnout se útoku o 5% za level.',
        tree: 'STEALTH',
        tier: 1,
        maxRank: 5,
        iconName: 'eye-off',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Kapsářství',
        description: 'Šance 10% ukrást zlato od nepřítele po boji.',
        tree: 'STEALTH',
        tier: 1,
        maxRank: 3,
        iconName: 'coins',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Tier 2 (Level 3) - Advanced stealth
    prisma.skill.create({
      data: {
        name: 'Jedový dýka',
        description: 'Útok dýkou způsobující poškození jedm po dobu 3 kol.',
        tree: 'STEALTH',
        tier: 2,
        maxRank: 3,
        iconName: 'skull',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 0,
        positionY: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Zadní vchod',
        description: 'První útok v boji má 100% šanci na kritický zásah.',
        tree: 'STEALTH',
        tier: 2,
        maxRank: 1,
        iconName: 'target',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 1,
        positionY: 1,
      },
    }),

    // Tier 3 (Level 5) - Master stealth
    prisma.skill.create({
      data: {
        name: 'Zmizení',
        description: 'Staneš se neviditelným na 2 kola. Nepřítel tě nemůže zasáhnout.',
        tree: 'STEALTH',
        tier: 3,
        maxRank: 1,
        iconName: 'eye-off',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 0,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Brutální útok',
        description: 'Útok ze zálohy způsobující 300% poškození.',
        tree: 'STEALTH',
        tier: 3,
        maxRank: 1,
        iconName: 'skull',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 1,
        positionY: 2,
      },
    }),

    // ==================== CRAFTING TREE ==================== (New)

    // Tier 1 (Level 1) - Basic crafting
    prisma.skill.create({
      data: {
        name: 'Kovářství',
        description: 'Umožňuje vylepšovat zbraně a zbroj.',
        tree: 'CRAFTING',
        tier: 1,
        maxRank: 5,
        iconName: 'hammer',
        requiredLevel: 1,
        positionX: 0,
        positionY: 0,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Alchymie',
        description: 'Zvyšuje efekt lektvarů o 10% za level.',
        tree: 'CRAFTING',
        tier: 1,
        maxRank: 5,
        iconName: 'flask',
        requiredLevel: 1,
        positionX: 1,
        positionY: 0,
      },
    }),

    // Tier 2 (Level 3) - Advanced crafting
    prisma.skill.create({
      data: {
        name: 'Runické enchantování',
        description: 'Přidej magické vlastnosti předmětům.',
        tree: 'CRAFTING',
        tier: 2,
        maxRank: 3,
        iconName: 'sparkles',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 0,
        positionY: 1,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Mistrovská výroba',
        description: 'Šance 15% vytvořit předmět vyšší kvality.',
        tree: 'CRAFTING',
        tier: 2,
        maxRank: 3,
        iconName: 'star',
        requiredLevel: 3,
        requiredTreePoints: 3,
        positionX: 1,
        positionY: 1,
      },
    }),

    // Tier 3 (Level 5) - Master crafting
    prisma.skill.create({
      data: {
        name: 'Legendární kovář',
        description: 'Můžeš vytvořit legendární zbraň nebo zbroj.',
        tree: 'CRAFTING',
        tier: 3,
        maxRank: 1,
        iconName: 'crown',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 0,
        positionY: 2,
      },
    }),
    prisma.skill.create({
      data: {
        name: 'Elixír nesmrtelnosti',
        description: 'Vytvoř lektvar který tě jednou zachrání před smrtí.',
        tree: 'CRAFTING',
        tier: 3,
        maxRank: 1,
        iconName: 'heart',
        requiredLevel: 5,
        requiredTreePoints: 6,
        positionX: 1,
        positionY: 2,
      },
    }),
  ])

  console.log(
    `✅ Created ${skills.length} skills (Combat: 6, Defense: 6, Magic: 8, Stealth: 6, Crafting: 6)`
  )

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
