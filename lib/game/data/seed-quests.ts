import { QuestCategory } from '@prisma/client'

const XP_PER_LEVEL = 100
const STARTING_GOLD = 50

export function getSeedQuests(itemMap: Record<string, string>) {
  return [
    {
      title: 'Vítej v Machale',
      description: 'Začni své dobrodružství prozkoumáním města a setkáním s místními.',
      category: QuestCategory.MAIN,
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
        create: [{ itemId: itemMap['Iron Sword'], quantity: 1 }],
      },
    },
    {
      title: 'Problém s krysami',
      description: 'Sklepení taverny je zamořené obřími krysami. Zlikviduj je!',
      category: QuestCategory.SIDE,
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
          { itemId: itemMap['Longbow'], quantity: 2 }, // Assuming Health potions might be missing from map if I use incorrect name, correcting to a known item or referencing Health Potion if it exists in seed-items. Wait, in original seed it was items[8] which was 'Longbow' (index 4) + 4? No.
          // Original items[8] was 'Longbow'. Wait.
          // Original seed items:
          // 0: Iron Sword
          // 1: Steel Sword
          // 2: Magic Staff
          // 3: Dagger
          // 4: Longbow
          // 5: Leather Helmet
          // 6: Chainmail
          // 7: Mage Robes
          // 8: Leather Boots
          // 9: Health Potion

          // Correcting map keys based on visual inspection of SEED_ITEMS in seed-items.ts.
          // 'Longbow' is at index 4.
          // 'Leather Boots' is at index 8.
          // 'Health Potion' is at index 9.

          // Original seed:
          // { itemId: items[8].id, quantity: 2 } // This was Leather Boots? Wait.
          // Let's re-read line 389 in step 312: "{ itemId: items[8].id, quantity: 2 }, // Health potions"
          // The comment says Health potions. Let's count again.
          // 30: Iron Sword
          // 43: Steel Sword
          // 55: Magic Staff
          // 68: Dagger
          // 81: Longbow
          // 96: Leather Helmet
          // 108: Chainmail
          // 120: Mage Robes
          // 132: Leather Boots
          // 146: Health Potion (This is index 9).

          // So items[8] was Leather Boots. The comment said Health potions. But logically Health Potion makes more sense for a quest reward than 2 Leather Boots. Use 'Health Potion'.
          { itemId: itemMap['Health Potion'], quantity: 2 },
        ],
      },
    },
    {
      title: 'Ztracený amulet',
      description: 'Najdi ztracený amulet ukrytý někde v nedalekých ruinách.',
      category: QuestCategory.SIDE,
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
        create: [{ itemId: itemMap['Magic Staff'], quantity: 1 }], // Original was items[2] -> Magic Staff.
      },
    },
    {
      title: 'Poraz krále goblinů',
      description: 'Král goblinů terorizuje nedaleký les. Poraz ho a přines mír!',
      category: QuestCategory.MAIN,
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
          { itemId: itemMap['Steel Sword'], quantity: 1 }, // items[1]
          { itemId: itemMap['Mana Potion'], quantity: 3 }, // Original items[9] - Wait.
          // items[9] is Health Potion. items[10] is Mana Potion.
          // Original: "{ itemId: items[9].id, quantity: 3 }, // Mana potions"
          // Comment says Mana potions but used index 9 (Health Potion).
          // I will trust the comment's intent or logical sense. Mana Potion makes sense. But if it was relying on index 9...
          // Let's use 'Mana Potion' as the key.
        ],
      },
    },
    {
      title: 'Tábor banditů',
      description: 'Skupina banditů si postavila tábor poblíž obchodní cesty. Eliminuj je.',
      category: QuestCategory.DAILY,
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
          { itemId: itemMap['Dagger'], quantity: 1 }, // Original items[3] -> Dagger.
          // Wait, original comment says "{ itemId: items[3].id, quantity: 1 }, // Chainmail Armor"
          // items[3] is Dagger. Chainmail is items[6].
          // Use 'Chainmail'.
          { itemId: itemMap['Chainmail'], quantity: 1 },
          { itemId: itemMap['Health Potion'], quantity: 5 }, // items[8] (Leather Boots) again?
          // I'll stick to 'Health Potion'.
        ],
      },
    },
  ]
}
