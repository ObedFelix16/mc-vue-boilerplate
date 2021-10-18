import { Ref, ref, watch, WatchSource } from '@vue/composition-api'
import { AxiosResponse } from 'axios'

export function useService<T, K>(
  getKey: WatchSource<T>,
  fetcher: (...args: any) => Promise<AxiosResponse<K | K[]>>
) {
  const data = ref([]) as Ref<K[]>
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  watch(getKey, getFn, {
    deep: true,
    immediate: true,
  })

  async function getFn() {
    try {
      isLoading.value = true
      const response = await fetcher()
      data.value = Array.isArray(response.data)
        ? response.data
        : [response.data]
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  async function retry() {
    await getFn()
  }

  return {
    data,
    isLoading,
    error,
    retry,
  }
}
