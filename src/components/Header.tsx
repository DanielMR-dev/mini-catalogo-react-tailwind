import { Icon } from './Icon'

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex min-h-19 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <div className="flex items-center gap-3 text-lg font-bold tracking-tight text-[#173b2f]">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#164e39] text-white">
            <Icon name="bag" className="size-5" />
          </span>
          Mini Catálogo
        </div>
      </div>
    </header>
  )
}
