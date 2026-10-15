import type { PriceTier, SourceLabel, StoryTagId } from '@/types'

export const APP_NAME = 'Table Tales'
export const APP_TAGLINE = 'The story behind the table.'

export const TAG_LABELS: Record<StoryTagId, string> = {
  'family-owned': 'Family-owned',
  'immigrant-cuisine': 'Immigrant cuisine',
  'historic-building': 'Historic building',
  'generations-old': 'Generations-old',
  'neighborhood-institution': 'Neighborhood institution',
  'community-hub': 'Community hub',
}

export const SOURCE_LABELS: Record<SourceLabel, { short: string; description: string }> = {
  owner: {
    short: 'Told by the owner',
    description: 'This story comes from the people who run the place.',
  },
  researched: {
    short: 'Researched',
    description: 'This story was pieced together from archives, books, and records.',
  },
  both: {
    short: 'Owner + research',
    description: "The owner's own telling, checked against archives and records.",
  },
}

export const PRICE_DESCRIPTIONS: Record<PriceTier, string> = {
  1: 'Budget-friendly',
  2: 'Moderate',
  3: 'Upscale',
  4: 'Special occasion',
}
