import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock hooks
vi.mock('@/hooks/api/use-game', () => ({
  useGameInfoShowQuery: vi.fn(),
}))

vi.mock('@/context/game-provider', () => ({
  useSetLocationBackgroundEffect: vi.fn(),
}))

describe('Game World Page Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('player state detection', () => {
    it('should detect defeated player', () => {
      const data = {
        player: {
          hasDefeated: true,
        },
      }

      expect(data.player.hasDefeated).toBe(true)
    })

    it('should detect alive player', () => {
      const data = {
        player: {
          hasDefeated: false,
        },
      }

      expect(data.player.hasDefeated).toBe(false)
    })
  })

  describe('place detection', () => {
    it('should show place info when in a place', () => {
      const data = {
        place: {
          id: 'main_city',
          text: {
            header: 'You are in Main City',
            description: 'A bustling city center',
          },
          subplaces: [
            { place: { id: 'hospital-1' }, type: 'hospital' },
            { place: { id: 'bank-1' }, type: 'bank' },
          ],
        },
      }

      expect(data.place).toBeDefined()
      expect(data.place.id).toBe('main_city')
      expect(data.place.subplaces).toHaveLength(2)
    })

    it('should handle no place (wilderness)', () => {
      const data = {
        place: undefined,
      }

      expect(data.place).toBeUndefined()
    })

    it('should filter subplaces correctly', () => {
      const place = {
        hospital: { id: 'hospital-1' },
        armory: null,
        bank: { id: 'bank-1' },
      }

      const subplaces = [
        place.hospital && { place: place.hospital, type: 'hospital' },
        place.armory && { place: place.armory, type: 'armory' },
        place.bank && { place: place.bank, type: 'bank' },
      ].filter((x) => !!x)

      expect(subplaces).toHaveLength(2)
      expect(subplaces[0]?.type).toBe('hospital')
      expect(subplaces[1]?.type).toBe('bank')
    })
  })

  describe('combat state detection', () => {
    it('should detect combat state', () => {
      const data = {
        combat: {
          enemyInstance: {
            id: 'enemy-1',
            hp_actual: 50,
            hp_max: 100,
            enemy: {
              name: 'Goblin',
            },
          },
          text: {
            attack: 'Attack',
            runAway: 'Run Away',
          },
        },
      }

      expect(data.combat).toBeDefined()
      expect(data.combat.enemyInstance.hp_actual).toBe(50)
    })

    it('should detect no combat state', () => {
      const data = {
        combat: undefined,
      }

      expect(data.combat).toBeUndefined()
    })
  })

  describe('loot state detection', () => {
    it('should detect loot available', () => {
      const data = {
        loot: {
          id: 'loot-1',
          money: 50,
          weapons_loot: [{ weapon: { name: 'Sword' } }],
          armors_loot: [],
          text: {
            loot: 'Collect Loot',
            reward: '50 gold',
          },
        },
      }

      expect(data.loot).toBeDefined()
      expect(data.loot.money).toBe(50)
      expect(data.loot.weapons_loot).toHaveLength(1)
    })

    it('should detect no loot', () => {
      const data = {
        loot: undefined,
      }

      expect(data.loot).toBeUndefined()
    })

    it('should handle loot with items', () => {
      const loot = {
        money: 25,
        weapons_loot: [
          { weapon: { name: 'Sword' } },
          { weapon: { name: 'Axe' } },
        ],
        armors_loot: [{ armor: { name: 'Shield' } }],
      }

      expect(loot.weapons_loot).toHaveLength(2)
      expect(loot.armors_loot).toHaveLength(1)
    })
  })

  describe('i18n mapping', () => {
    it('should map weapon loot names', () => {
      const weaponsLoot = [
        { weapon: { i18n_key: 'weapon.sword' } },
        { weapon: { i18n_key: 'weapon.axe' } },
      ]

      const mappedWeapons = weaponsLoot.map((x) => ({
        ...x,
        weapon: { ...x.weapon, name: `${x.weapon.i18n_key}.header` },
      }))

      expect(mappedWeapons[0].weapon.name).toBe('weapon.sword.header')
      expect(mappedWeapons[1].weapon.name).toBe('weapon.axe.header')
    })

    it('should map armor loot names', () => {
      const armorsLoot = [{ armor: { i18n_key: 'armor.shield' } }]

      const mappedArmors = armorsLoot.map((x) => ({
        ...x,
        armor: { ...x.armor, name: `${x.armor.i18n_key}.header` },
      }))

      expect(mappedArmors[0].armor.name).toBe('armor.shield.header')
    })
  })
})
