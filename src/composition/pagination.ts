import { computed, ref, Ref } from '@vue/composition-api'

export interface PaginationConfiguration {
  pageNumber: Ref<number>
  rowsPerPage: Ref<number>
  totalItems: Ref<number>
  disabled?: boolean
  boundaryCount?: Ref<number>
  siblingCount?: Ref<number>
  hideNextButton?: boolean
  hidePrevButton?: boolean
  showFirstButton?: boolean
  showLastButton?: boolean
}

export type PaginationNavItemType =
  | 'page'
  | 'first'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis'
  | 'next'
  | 'last'

export function usePagination({
  pageNumber,
  rowsPerPage,
  totalItems,
  disabled = false,
  boundaryCount = ref(1),
  siblingCount = ref(1),
  hideNextButton = false,
  hidePrevButton = false,
  showFirstButton = false,
  showLastButton = false,
}: PaginationConfiguration) {
  const totalPages = computed(() =>
    Math.ceil(totalItems.value / rowsPerPage.value)
  )

  const startPages = computed(() =>
    range(1, Math.min(boundaryCount.value, totalPages.value))
  )
  const endPages = computed(() =>
    range(
      Math.max(
        totalPages.value - boundaryCount.value + 1,
        boundaryCount.value + 1
      ),
      totalPages.value
    )
  )

  const siblingsStart = computed(() =>
    Math.max(
      Math.min(
        // Natural start
        pageNumber.value - siblingCount.value,
        // Lower boundary when page is high
        totalPages.value - boundaryCount.value - siblingCount.value * 2 - 1
      ),
      // Greater than startPages
      boundaryCount.value + 2
    )
  )

  const siblingsEnd = computed(() =>
    Math.min(
      Math.max(
        // Natural end
        pageNumber.value + siblingCount.value,
        // Upper boundary when page is low
        boundaryCount.value + siblingCount.value * 2 + 2
      ),
      // Less than endPages
      endPages.value[0] - 2
    )
  )

  const itemList = computed(() => [
    ...(showFirstButton ? ['first'] : []),
    ...(hidePrevButton ? [] : ['previous']),
    ...startPages.value,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart.value > boundaryCount.value + 2
      ? ['start-ellipsis']
      : boundaryCount.value + 1 < totalPages.value - boundaryCount.value
      ? [boundaryCount.value + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart.value, siblingsEnd.value),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd.value < totalPages.value - boundaryCount.value - 1
      ? ['end-ellipsis']
      : totalPages.value - boundaryCount.value > boundaryCount.value
      ? [totalPages.value - boundaryCount.value]
      : []),

    ...endPages.value,
    ...(hideNextButton ? [] : ['next']),
    ...(showLastButton ? ['last'] : []),
  ])

  // Map the link type to its page number
  const linkPageNumber = (type: PaginationNavItemType) => {
    switch (type) {
      case 'first':
        return 1
      case 'previous':
        return pageNumber.value - 1
      case 'next':
        return pageNumber.value + 1
      case 'last':
        return totalPages.value
      default:
        return 1
    }
  }

  // Convert the basic item list to PaginationNavItem props objects
  const items = computed(() =>
    itemList.value.map((item) => {
      return typeof item === 'number'
        ? {
            key: item,
            type: 'page' as PaginationNavItemType,
            pageNumber: item,
            selected: item === pageNumber.value,
            disabled,
            'aria-current': item === pageNumber.value ? 'true' : undefined,
          }
        : {
            key: item,
            type: item as PaginationNavItemType,
            pageNumber: linkPageNumber(item as PaginationNavItemType),
            selected: false,
            disabled:
              disabled ||
              (item.indexOf('ellipsis') === -1 &&
                (item === 'next' || item === 'last'
                  ? pageNumber.value >= totalPages.value
                  : pageNumber.value <= 1)),
          }
    })
  )

  return {
    items,
  }
}

function range(start: number, end: number) {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}
