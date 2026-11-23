import { useMemo, useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import type { Product } from '../types/product'
import { formatCategory, normalizeTitle } from '../utils/products'
import { CatalogStatus } from './CatalogStatus'
import { CategoryFilter } from './CategoryFilter'
import { ProductGrid } from './ProductGrid'
import { SearchBar } from './SearchBar'

export function Catalog({ products }: { products: Product[] }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const query = normalizeTitle(search)
  const debouncedQuery = useDebounce(query)
  const activeQuery = query ? debouncedQuery : ''
  const categories = [...new Set(products.map((product) => product.category))]
    .sort((a, b) => formatCategory(a).localeCompare(formatCategory(b), 'es'))
  const visibleProducts = useMemo(() => products.filter((product) =>
    (!category || product.category === category) &&
    (!activeQuery || normalizeTitle(product.title).includes(activeQuery)),
  ), [products, category, activeQuery])

  function clearFilters() {
    setSearch('')
    setCategory('')
  }

  return (
    <>
      <div className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] sm:p-5">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={categories} value={category} onChange={setCategory} />
      </div>
      <div className="mt-8 mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <div>
          <h2 id="products-heading" className="text-2xl font-bold tracking-tight">Productos</h2>
          <p aria-live="polite" className="mt-1 text-sm text-[#4a5b51]">
            {visibleProducts.length} {visibleProducts.length === 1 ? 'producto' : 'productos'}
          </p>
        </div>
        {(search || category) && (
          <button type="button" onClick={clearFilters}
            className="min-h-11 rounded px-2 text-sm font-semibold text-[#164e39] underline underline-offset-4 hover:text-[#102f24] focus-visible:outline-2 focus-visible:outline-[#164e39]">
            Restablecer filtros
          </button>
        )}
      </div>
      {visibleProducts.length
        ? <ProductGrid products={visibleProducts} />
        : <CatalogStatus kind="no-matches" onAction={clearFilters} />}
    </>
  )
}
