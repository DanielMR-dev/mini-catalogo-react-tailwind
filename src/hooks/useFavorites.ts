import { useEffect, useState } from 'react'

const storageKey = 'mini-catalogo:favorite-product-ids'

function readFavorites(): Set<number> {
  try {
    const stored = localStorage.getItem(storageKey)
    const parsed: unknown = stored ? JSON.parse(stored) : []
    if (Array.isArray(parsed)) {
      return new Set(parsed.filter((id): id is number =>
        typeof id === 'number' && Number.isSafeInteger(id) && id > 0,
      ))
    }
  } catch {
    // El catálogo sigue disponible si el almacenamiento está bloqueado o dañado.
  }
  return new Set()
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favorites]))
    } catch {
      // Los cambios siguen disponibles durante la sesión.
    }
  }, [favorites])

  function toggleFavorite(id: number) {
    setFavorites((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })
  }

  return { favorites, toggleFavorite }
}
