import Vue from 'vue'

export function mapTwoWay<T>(
  namespace: string,
  getter: string,
  action: string
): { get: () => T; set: (value: T) => void } {
  return {
    get(this: Vue): T {
      return this.$store.getters[namespace ? `${namespace}/${getter}` : getter]
    },
    set(this: Vue, value: T): void {
      this.$store.dispatch(namespace ? `${namespace}/${action}` : action, value)
    },
  }
}
