import { PaginationList, PaginationSelectModel } from '@/services/utils'
import { Ref, ref, watch, WatchSource } from '@vue/composition-api'
import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios'

export interface ServicePaginatedSettings {
  onSuccess?: () => void
  onError?: () => void
  onCancel?: () => void
}

const defaultSettings = {
  onSuccess: () => {},
  onError: () => {},
  onCancel: () => {},
}

export function useServicePaginated<T extends PaginationSelectModel, K>(
  getKey: WatchSource<T & { languageId?: string }>,
  fetcher: (
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<PaginationList<K>>>,
  settings?: ServicePaginatedSettings
) {
  const serviceSettings = {
    ...settings,
    ...defaultSettings,
  }

  const data = ref([]) as Ref<K[]>
  const totalItems = ref(0)
  const isLoading = ref(false)
  const error = ref<unknown | null>(null)

  const CancelToken = axios.CancelToken
  const cancel = ref<Canceler | null>(null)

  watch(
    getKey,
    async () => {
      try {
        if (cancel.value) {
          cancel.value()
        }
        isLoading.value = true
        const response = await fetcher({
          cancelToken: new CancelToken((c) => {
            cancel.value = c
          }),
        })
        data.value = response.data.items
        totalItems.value = response.data.totalItems
      } catch (e) {
        error.value = e
        if (axios.isCancel(e)) {
          serviceSettings.onCancel()
        } else {
          serviceSettings.onError()
        }
      } finally {
        isLoading.value = false
        cancel.value = null
      }
    },
    {
      deep: true,
      immediate: true,
    }
  )

  return {
    data,
    totalItems,
    isLoading,
    error,
  }
}
