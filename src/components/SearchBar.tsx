import { Icon } from './Icon'

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid min-w-0 gap-2 text-sm font-semibold">
      Buscar productos
      <span className="relative">
        <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#4a5b51]" />
        <input type="search" value={value} onChange={(event) => onChange(event.target.value)}
          placeholder="Busca por nombre de producto"
          className="min-h-12 w-full rounded-xl border border-[#a4ada4] bg-white py-2 pr-3 pl-11 text-base font-normal placeholder:text-stone-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164e39]" />
      </span>
    </label>
  )
}
