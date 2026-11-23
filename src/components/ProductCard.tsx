import type { Product } from '../types/product'
import { formatCategory } from '../utils/products'

import { Icon } from './Icon'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD' })

export function ProductCard({ product, isFavorite, onToggleFavorite }: {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#dddeda] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative grid aspect-[4/3] place-items-center bg-[#edf0e9] p-5">
        <img src={product.thumbnail} alt={product.title} width="300" height="300" loading="lazy"
          decoding="async" className="h-full min-h-0 w-full object-contain" />
        <button type="button" onClick={() => onToggleFavorite(product.id)}
          aria-label={`Favorito: ${product.title}`} aria-pressed={isFavorite}
          className="absolute top-3 right-3 grid size-11 cursor-pointer place-items-center rounded-full border border-[#b9c3b9] bg-white text-[#174c38] shadow-sm hover:bg-[#e8f0e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164e39] aria-pressed:border-[#164e39] aria-pressed:bg-[#164e39] aria-pressed:text-white aria-pressed:hover:bg-[#113a2c]">
          <Icon name="heart" className={isFavorite ? 'size-5 fill-current' : 'size-5'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col items-start gap-2.5 p-5">
        <span className="rounded-full bg-[#e8f0e8] px-2.5 py-1 text-xs font-semibold text-[#365542]">
          {formatCategory(product.category)}
        </span>
        <h3 className="line-clamp-2 font-semibold leading-snug wrap-anywhere text-[#172d25]" title={product.title}>
          {product.title}
        </h3>
        <p className="mt-auto pt-1 text-lg font-bold tabular-nums text-[#174c38]">{currency.format(product.price)}</p>
      </div>
    </article>
  )
}
