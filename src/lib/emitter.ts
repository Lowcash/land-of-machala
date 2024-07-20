import { EventEmitter } from 'stream'

export default class TypedEventEmitter<T extends Record<string, any>> {
  private emitter = new EventEmitter()

  emit<K extends keyof T>(event: K, payload: T[K]): boolean {
    return this.emitter.emit(event as string, payload)
  }

  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
    this.emitter.on(event as string, listener)
    return this
  }

  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): this {
    this.emitter.off(event as string, listener)
    return this
  }

  removeAllListeners<K extends keyof T>(event: K): this {
    this.emitter.removeAllListeners(event as string)
    return this
  }
}
