import type { Trail, TrailStop } from '@/types'

/** A trail as written in the seed: the card fields plus its stops (the count is derived). */
export interface TrailSeed extends Omit<Trail, 'stopCount'> {
  stops: TrailStop[]
}

/** FICTIONAL PLACEHOLDER TRAILS. Every stop is a sample place from places.seed.ts. */
export const trailsSeed: TrailSeed[] = [
  {
    id: 'a-pilsen-morning-walk-sample',
    title: 'A Pilsen Morning Walk (sample)',
    kind: 'neighborhood',
    area: 'Pilsen',
    description:
      'Start with pastry at dawn, linger over coffee in an old print shop, and finish with a slow mole lunch. Three stops, about a mile, all on foot.',
    estimatedMinutes: 90,
    stops: [
      {
        order: 1,
        placeId: 'pan-dulce-aurora-sample',
        blurb:
          'Begin where the neighborhood does: a warm concha from a bakery that has been opening before sunrise for decades.',
      },
      {
        order: 2,
        placeId: 'cafe-tinta-sample',
        blurb:
          'Take your coffee beside the old iron presses, and look up at the skylight the typesetters worked under.',
        fromPrevious: '6 min walk',
      },
      {
        order: 3,
        placeId: 'la-cocina-dona-marisol-sample',
        blurb:
          'End with the two-day mole that started it all, and ask to see the recipe tin by the register.',
        fromPrevious: '8 min walk',
      },
    ],
    isPlaceholder: true,
  },
  {
    id: 'rooms-with-a-past-sample',
    title: 'Rooms with a Past (sample)',
    kind: 'theme',
    area: 'Across the city',
    description:
      'Four places where the building tells as much of the story as the menu: a print shop, a tea-house dining room, a restored ballroom, and a rail depot. Plan a full day and use transit between stops.',
    estimatedMinutes: 240,
    stops: [
      {
        order: 1,
        placeId: 'cafe-tinta-sample',
        blurb:
          'A former print shop that kept its presses, its skylight, and its ink-stained floors.',
      },
      {
        order: 2,
        placeId: 'golden-ladle-noodle-house-sample',
        blurb: 'A second-floor dining room under a tin ceiling, above a longtime tea merchant.',
        fromPrevious: 'Transit, about 25 min',
      },
      {
        order: 3,
        placeId: 'sweet-peach-supper-club-sample',
        blurb:
          'A restored social-hall ballroom with a sprung dance floor and a working coat-check window.',
        fromPrevious: 'Transit, about 20 min',
      },
      {
        order: 4,
        placeId: 'hearth-and-rail-tavern-sample',
        blurb: 'A former rail depot where dessert is served at the old ticket counter.',
        fromPrevious: 'Transit, about 35 min',
      },
    ],
    isPlaceholder: true,
  },
]
