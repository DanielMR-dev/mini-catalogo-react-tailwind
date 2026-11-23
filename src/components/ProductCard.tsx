import type { Product } from '../types/product'
import { formatCategory } from '../utils/products'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD' })

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#dddeda] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative grid aspect-[4/3] place-items-center bg-[#edf0e9] p-5">
        <img src={product.thumbnail} alt={product.title} width="300" height="300" loading="lazy"
          decoding="async" className="h-full min-h-0 w-full object-contain" />
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
