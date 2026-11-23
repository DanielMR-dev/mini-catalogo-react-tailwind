import { expect, test } from '@playwright/test'
import type { Product } from '../src/types/product'

const endpoint = 'https://dummyjson.com/products?limit=20'
const sample: Product[] = [
  { id: 1, title: 'Crema de manos', price: 12, category: 'beauty', thumbnail: '/favicon.svg' },
  { id: 2, title: 'Crema de almendras', price: 5, category: 'groceries', thumbnail: '/favicon.svg' },
  { id: 3, title: 'Sofá', price: 350, category: 'furniture', thumbnail: '/favicon.svg' },
]

test('combina nombre y categoría sin repetir la petición', async ({ page }) => {
  let requests = 0
  await page.route(endpoint, (route) => {
    requests++
    return route.fulfill({ json: { products: sample } })
  })
  await page.goto('/')
  const cards = page.getByRole('article')
  await expect(cards).toHaveCount(3)
  await expect(cards.first().getByRole('img', { name: sample[0].title })).toBeVisible()
  await expect(cards.first()).toContainText('Belleza')
  await expect(cards.first()).toContainText('12,00')

  await page.getByRole('searchbox').fill('  CREMA   DE  ')
  await expect(cards).toHaveCount(2)
  await page.getByRole('combobox', { name: 'Categoría' }).selectOption('beauty')
  await expect(cards).toHaveCount(1)
  await expect(cards.first()).toContainText('Crema de manos')

  await page.getByRole('searchbox').fill('sin coincidencias')
  await expect(page.getByText('No encontramos productos que coincidan con tu búsqueda.')).toBeVisible()
  await page.getByRole('button', { name: 'Limpiar filtros' }).click()
  await expect(cards).toHaveCount(3)
  await expect(page.getByRole('combobox')).toHaveValue('')
  expect(requests).toBe(1)
})

test('conserva favoritos al filtrar y al recargar y permite retirarlos', async ({ page }) => {
  await page.route(endpoint, (route) => route.fulfill({ json: { products: sample } }))
  await page.goto('/')
  const favorite = page.getByRole('button', { name: 'Favorito: Crema de manos' })
  await favorite.focus()
  await favorite.press('Space')
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('Favoritos: 1')).toBeVisible()

  await page.getByRole('combobox').selectOption('furniture')
  await expect(favorite).toHaveCount(0)
  await expect(page.getByText('Favoritos: 1')).toBeVisible()

  await page.reload()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'false')
  await expect(page.getByText('Favoritos: 0')).toBeVisible()
  await page.reload()
  await expect(favorite).toHaveAttribute('aria-pressed', 'false')
})

test('muestra carga, recupera un error HTTP e ignora favoritos inválidos', async ({ page }) => {
  let failFirstRequest = true
  await page.addInitScript(() => localStorage.setItem('mini-catalogo:favorite-product-ids', '{inválido'))
  await page.route(endpoint, async (route) => {
    if (failFirstRequest) {
      failFirstRequest = false
      await expect(page.getByText('Cargando productos…')).toBeVisible()
      await route.fulfill({ status: 503 })
      return
    }
    await route.fulfill({ json: { products: sample } })
  })
  await page.goto('/')
  await expect(page.getByRole('alert')).toContainText('No pudimos cargar el catálogo.')
  await page.getByRole('button', { name: 'Reintentar' }).click()
  await expect(page.getByRole('article')).toHaveCount(3)
  await expect(page.getByText('Favoritos: 0')).toBeVisible()
})

test('adapta la cuadrícula al ancho sin desbordar la página', async ({ page }) => {
  await page.route(endpoint, (route) => route.fulfill({ json: { products: sample } }))
  await page.goto('/')
  await expect(page.getByRole('article')).toHaveCount(3)
  const grid = page.getByRole('list')
  const layouts = [
    { width: 320, columns: 1 },
    { width: 768, columns: 2 },
    { width: 1024, columns: 3 },
    { width: 1440, columns: 4 },
  ]
  for (const { width, columns } of layouts) {
    await page.setViewportSize({ width, height: 850 })
    expect(await grid.evaluate((element) =>
      getComputedStyle(element).gridTemplateColumns.split(' ').length,
    )).toBe(columns)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width)
  }
})
