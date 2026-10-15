import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'

interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <form role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="story-search" className="sr-only">
        Search stories by name, neighborhood, cuisine, or tag
      </label>
      <div className="relative">
        <Icon
          name="search"
          className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted"
        />
        <input
          id="story-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search places, dishes, areas"
          autoComplete="off"
          enterKeyHint="search"
          className="min-h-12 w-full rounded-full border border-line bg-raised pr-12 pl-12 font-sans text-base placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value && (
          <IconButton
            icon="x"
            label="Clear search"
            onClick={() => onChange('')}
            className="absolute top-1/2 right-1 -translate-y-1/2"
          />
        )}
      </div>
    </form>
  )
}
