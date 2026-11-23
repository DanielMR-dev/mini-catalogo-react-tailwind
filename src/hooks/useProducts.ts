import { useEffect, useState } from 'react'
import type { Product, ProductsResponse } from '../types/product'

const productsUrl = 'https://dummyjson.com/products?limit=20'

type ProductsState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; products: Product[] }

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    async function loadProducts() {
      try {
        const response = await fetch(productsUrl, { signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const { products }: ProductsResponse = await response.json()
        if (!Array.isArray(products)) throw new Error('Respuesta inválida')
        if (!signal.aborted) setState({ status: 'success', products })
      } catch {
        if (!signal.aborted) setState({ status: 'error' })
      }
    }

    void loadProducts()
    return () => controller.abort()
  }, [attempt])

  function retry() {
    setState({ status: 'loading' })
    setAttempt((previous) => previous + 1)
  }

  return { state, retry }
}
