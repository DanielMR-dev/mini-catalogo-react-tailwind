# Mini Catálogo

Prueba técnica frontend que simula un catálogo de comercio electrónico. Permite explorar los primeros 20 productos de DummyJSON y guardar favoritos en el navegador.

## Tecnologías

React 19 y hooks, TypeScript 6 en modo estricto, Vite 8, Tailwind CSS 4, Fetch API, ESLint, Git y GitHub. Las pruebas de interacción usan Playwright con Chromium.

## Funcionalidades

### Requisitos obligatorios

- Tarjetas con imagen, título, categoría y precio en USD.
- Estados de carga, catálogo vacío y error con reintento.
- Búsqueda por título que ignora mayúsculas y normaliza espacios. Mensaje sin coincidencias y opción para restablecer los filtros.
- Botones de favoritos con estado accesible y contador en el encabezado.
- Cuadrícula de una columna en móvil, dos en tableta y tres o cuatro en escritorio.

### Bonus implementados

- Favoritos persistentes con `localStorage`.
- Hooks `useProducts`, `useFavorites` y `useDebounce`.
- Debounce de 275 ms y filtro por categoría, combinable con la búsqueda.

## Instalación

Requisitos de desarrollo: Node.js 24 y npm.

```bash
git clone https://github.com/DanielMR-dev/mini-catalogo-react-tailwind.git
cd mini-catalogo-react-tailwind
npm ci
npm run dev
```

Para compilar y previsualizar la versión de producción:

```bash
npm run build
npm run preview
```

Para ejecutar ESLint y las pruebas de navegador:

```bash
npm run lint
npx playwright install chromium
npm test
```

En Linux, si faltan bibliotecas del sistema, usa `npx playwright install --with-deps chromium`. Las pruebas simulan las respuestas de DummyJSON para reproducir la carga, un error HTTP y el reintento. También comprueban filtros combinados, búsqueda, uso por teclado y persistencia de favoritos.

## API

`GET https://dummyjson.com/products?limit=20`

La aplicación consume el arreglo `products` con los campos `id`, `title`, `price`, `category` y `thumbnail`. Las miniaturas proceden de las URLs devueltas por la API. [Documentación de DummyJSON](https://dummyjson.com/docs/products)

## Estructura

| Ruta | Responsabilidad |
| --- | --- |
| `src/App.tsx` | Estructura de la página y coordinación de la carga y los favoritos |
| `src/components/` | Encabezado, catálogo, controles, cuadrícula, tarjetas y estados |
| `src/hooks/` | Consulta de la API, almacenamiento de favoritos y debounce |
| `src/types/` | Contratos de producto y de respuesta de la API |
| `src/utils/` | Normalización de texto y etiquetas de categoría |
| `tests/` | Pruebas de comportamiento en Chromium |

## Decisiones técnicas

- **Vite** proporciona recarga rápida durante el desarrollo y genera archivos estáticos en `dist`. Tailwind 4 se integra con `@tailwindcss/vite` y se carga con `@import "tailwindcss"`. [Instalación oficial de Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite)
- **TypeScript en modo estricto** explicita los contratos de la API y de los componentes. Una unión discriminada representa los estados de la consulta.
- **Componentes**. `App` coordina la página y `Catalog` mantiene los filtros. `ProductGrid` y `ProductCard` presentan los resultados.
- **Favoritos**. Un `Set<number>` mantiene identificadores únicos. `useFavorites` lo serializa en `mini-catalogo:favorite-product-ids` e ignora datos inválidos. Si el navegador bloquea el almacenamiento, los cambios funcionan en memoria durante la sesión.
- **Búsqueda y filtros**. Las categorías se derivan de los productos recibidos. El filtro combina coincidencias de título y categoría sobre el arreglo en memoria. El debounce limita cuándo se vuelve a aplicar la consulta de texto.
- **Errores**. `useProducts` verifica `response.ok`, cancela la solicitud al desmontarse y presenta un mensaje con reintento ante fallos de red, HTTP o formato.

## Despliegue en Render

1. En el panel de Render, selecciona **New → Static Site** y conecta `DanielMR-dev/mini-catalogo-react-tailwind`.
2. Selecciona la rama `main` y deja **Root Directory** vacío.
3. Configura **Build Command** con `npm install && npm run build` y **Publish Directory** con `dist`.
4. Configura `NODE_VERSION` con `24.18.0` y crea el sitio.
5. Cuando el despliegue termine, abre la URL asignada y verifica la carga de los productos, los filtros y la persistencia de favoritos.

[Documentación de sitios estáticos en Render](https://render.com/docs/static-sites)

## Mejoras futuras

1. Incorporar paginación para explorar el catálogo completo de la API.
2. Añadir una vista de favoritos que permita consultar y retirar los productos guardados.
3. Integrar las pruebas de navegador y ESLint en GitHub Actions para validar cada Pull Request.
