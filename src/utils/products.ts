const categoryNames: Record<string, string> = {
  beauty: 'Belleza',
  fragrances: 'Fragancias',
  furniture: 'Muebles',
  groceries: 'Comestibles',
}

export function formatCategory(category: string) {
  return Object.hasOwn(categoryNames, category)
    ? categoryNames[category]
    : category.replaceAll('-', ' ')
}

export function normalizeTitle(value: string) {
  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}
