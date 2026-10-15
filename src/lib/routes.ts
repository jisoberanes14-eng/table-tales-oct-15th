export const routes = {
  home: '/',
  trails: '/trails',
  saved: '/saved',
  place: (placeId: string) => `/places/${placeId}`,
  trail: (trailId: string) => `/trails/${trailId}`,
} as const
