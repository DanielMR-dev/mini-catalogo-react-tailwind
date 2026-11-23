import { Icon } from './Icon'

export function Header({ favoriteCount }: { favoriteCount: number }) {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex min-h-19 max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <div className="flex items-center gap-3 text-lg font-bold tracking-tight text-[#173b2f]">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#164e39] text-white">
            <Icon name="bag" className="size-5" />
          </span>
          Mini Catálogo
        </div>
        <p aria-live="polite" className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#e8f0e8] px-3 py-2 text-sm font-semibold text-[#173b2f] sm:gap-2 sm:px-4">
          <Icon name="heart" className="size-4" />
          <span>Favoritos: {favoriteCount}</span>
        </p>
      </div>
    </header>
  )
}
