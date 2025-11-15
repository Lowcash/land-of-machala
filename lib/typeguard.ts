// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Type guard requires any to narrow unknown types
export function isString(arg: any): arg is string {
  return typeof arg === 'string'
}
