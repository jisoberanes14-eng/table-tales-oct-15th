import { Chip } from '@/components/ui/Chip'
import type { Neighborhood } from '@/types'

interface NeighborhoodChipsProps {
  neighborhoods: Neighborhood[]
  /** Selected neighborhood name, or null for "All". */
  selected: string | null
  onSelect: (name: string | null) => void
}

export function NeighborhoodChips({ neighborhoods, selected, onSelect }: NeighborhoodChipsProps) {
  return (
    <div
      role="group"
      aria-label="Filter by neighborhood"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
    >
      <Chip pressed={selected === null} onClick={() => onSelect(null)}>
        All
      </Chip>
      {neighborhoods.map((neighborhood) => (
        <Chip
          key={neighborhood.name}
          pressed={selected === neighborhood.name}
          onClick={() => onSelect(selected === neighborhood.name ? null : neighborhood.name)}
        >
          {neighborhood.name}
          <span className="opacity-70">{neighborhood.placeCount}</span>
        </Chip>
      ))}
    </div>
  )
}
