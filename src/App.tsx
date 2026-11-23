import { CatalogStatus } from './components/CatalogStatus'
import { Header } from './components/Header'
import { Catalog } from './components/Catalog'
import { useFavorites } from './hooks/useFavorites'
import { useProducts } from './hooks/useProducts'

export default function App() {
  const { state, retry } = useProducts()
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <div className="min-h-screen bg-[#f8f8f3] font-sans text-[#172d25]">
      <Header favoriteCount={favorites.size} />
      <main className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <div className="relative isolate mt-6 overflow-hidden rounded-3xl bg-[#164e39] px-6 py-9 text-white sm:mt-8 sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -top-10 right-[-7rem] -z-10 size-80 rounded-full border border-white/20 bg-white/5 sm:right-3 sm:size-104" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-52 -z-10 size-104 rounded-full border border-white/20 bg-white/5 sm:right-48" />
          <h1 className="text-[clamp(1.85rem,8.5vw,3.75rem)] leading-tight font-bold tracking-tight">Mini Catálogo</h1>
          <p className="mt-4 max-w-lg text-base text-[#e0f0e7] sm:text-lg">
            Explora la colección y guarda tus productos favoritos.
          </p>
        </div>
        <section aria-labelledby="products-heading" className="mt-9">
          {state.status === 'success' && state.products.length ? <Catalog products={state.products} favorites={favorites} onToggleFavorite={toggleFavorite} /> : (
            <>
              <h2 id="products-heading" className="mb-5 text-2xl font-bold tracking-tight">Productos</h2>
              {state.status === 'loading' && <CatalogStatus kind="loading" />}
              {state.status === 'error' && <CatalogStatus kind="error" onAction={retry} />}
              {state.status === 'success' && <CatalogStatus kind="empty" />}
            </>
          )}
        </section>
      </main>
    </div>
  )
}
