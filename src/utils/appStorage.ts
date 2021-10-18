import appConfig from '@/app.config.json'

export default {
  createNamespacedKey(key: string) {
    return `_${appConfig.localStorage.namespace}:___${key}___`
  },

  getItem: (key: string) => localStorage.getItem(key),

  setItem: (key: string, value: any) => localStorage.setItem(key, value),

  removeItem: (key: string) => localStorage.removeItem(key),

  getObjectItem: <T>(key: string): '' | T | null => {
    const value = localStorage.getItem(key)
    return value && (JSON.parse(value) as T)
  },

  setObjectItem: (key: string, value: Record<string, any>) => {
    localStorage.setItem(key, JSON.stringify(value))
  },

  renewObjectItem: function <T>(key: string, defaultValue: T): T {
    const newValue = { ...defaultValue } as Record<string, any>
    const storedValue = this.getObjectItem<Partial<T>>(key) as
      | ''
      | (Partial<T> & Record<string, any>)
      | null

    if (storedValue) {
      for (const key in storedValue) {
        if (key in newValue) {
          newValue[key] = storedValue[key]
        }
      }
    }

    this.setObjectItem(key, newValue)

    return newValue as T
  },
}
