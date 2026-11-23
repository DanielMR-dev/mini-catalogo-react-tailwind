import { Icon } from './Icon'

export function CatalogStatus({ kind, onAction }: {
  kind: 'loading' | 'error' | 'empty' | 'no-matches'
  onAction?: () => void
}) {
  const content = {
    loading: ['Cargando productos…', 'Estamos consultando el catálogo.', ''],
    error: ['No pudimos cargar el catálogo.', 'Revisa tu conexión e inténtalo de nuevo.', 'Reintentar'],
    empty: ['El catálogo está vacío.', 'Todavía no hay productos disponibles.', ''],
    'no-matches': ['No encontramos productos que coincidan con tu búsqueda.', 'Prueba otro nombre o cambia la categoría.', 'Limpiar filtros'],
  }[kind]

  return (
    <div className="grid justify-items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-14 text-center">
      <div role={kind === 'error' ? 'alert' : 'status'} className="grid justify-items-center gap-2">
        {kind === 'loading'
          ? <span aria-hidden="true" className="mb-2 size-7 rounded-full border-2 border-[#164e39] border-r-transparent motion-safe:animate-spin" />
          : <Icon name={kind === 'error' ? 'alert' : 'search'} className="mb-2 size-7 text-[#164e39]" />}
        <p className="font-semibold">{content[0]}</p>
        <p className="text-[#4a5b51]">{content[1]}</p>
      </div>
      {onAction && (
        <button type="button" onClick={onAction}
          className="mt-2 min-h-11 rounded-xl bg-[#164e39] px-5 font-semibold text-white hover:bg-[#113a2c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#164e39]">
          {content[2]}
        </button>
      )}
    </div>
  )
}
