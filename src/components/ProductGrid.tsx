import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products, favorites, onToggleFavorite }: {
  products: Product[]
  favorites: ReadonlySet<number>
  onToggleFavorite: (id: number) => void
}) {
  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} isFavorite={favorites.has(product.id)} onToggleFavorite={onToggleFavorite} />
        </li>
      ))}
    </ul>
  )
}
