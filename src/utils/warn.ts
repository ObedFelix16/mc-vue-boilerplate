export function assert(condition: unknown, message: string): void {
  if (!condition) {
    throw new Error(`[util-assert] ${message}`)
  }
}

export function warn(condition: unknown, message: string): void {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(`[util-warn] ${message}`)
  }
}
