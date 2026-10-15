/** Central list of TanStack Query keys so hooks and mutations stay in sync. */
export const queryKeys = {
  places: {
    all: ['places'] as const,
    list: () => ['places', 'list'] as const,
    summary: (placeId: string) => ['places', 'summary', placeId] as const,
    detail: (placeId: string) => ['places', 'detail', placeId] as const,
    search: (query: string) => ['places', 'search', query] as const,
    neighborhoods: () => ['places', 'neighborhoods'] as const,
  },
  trails: {
    all: ['trails'] as const,
    list: () => ['trails', 'list'] as const,
    detail: (trailId: string) => ['trails', 'detail', trailId] as const,
  },
  reports: {
    all: ['reports'] as const,
    closed: (placeId: string) => ['reports', 'closed', placeId] as const,
  },
  saved: {
    all: ['saved'] as const,
    list: () => ['saved', 'list'] as const,
    detail: (placeId: string) => ['saved', 'detail', placeId] as const,
  },
}
