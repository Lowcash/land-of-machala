// Central config barrel export
// Exports all configuration modules

export enum ERROR_CAUSE {
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  NO_PERMISSION = 'NO_PERMISSION',
  NO_CHARACTER = 'NO_CHARACTER',
  NO_POSITION = 'NO_POSITION',
  ENTITY_NOT_EXIST = 'ENTITY_NOT_EXIST',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  CANNOT_MOVE = 'CANNOT_MOVE',
  COMBAT = 'COMBAT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
}

export const PAGE_COOKIE_KEY = 'page'

export * from './routes'
export * from './query-keys'
export * from './cache-keys'
export * from './game-constants'
