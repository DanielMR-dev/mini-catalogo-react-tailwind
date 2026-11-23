import { formatCategory } from '../utils/products'
import { Icon } from './Icon'

export function CategoryFilter({ categories, value, onChange }: {
  categories: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold">
      Categoría
      <span className="relative">
        <select value={value} onChange={(event) => onChange(event.target.value)}
          className="min-h-12 w-full appearance-none rounded-xl border border-[#a4ada4] bg-white py-2 pr-10 pl-4 text-base font-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164e39]">
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>{formatCategory(category)}</option>
          ))}
        </select>
        <Icon name="chevron" className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-[#4a5b51]" />
      </span>
    </label>
  )
}
