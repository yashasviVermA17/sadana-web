const allText = (p) =>
  [
    p.name,
    p.category,
    p.short,
    p.material,
    ...(p.finishes || []),
    ...(p.applications || []),
  ]
    .join(' ')
    .toLowerCase()

const match = (re) => (p) => re.test(allText(p))

export const FILTER_GROUPS = [
  {
    key: 'category',
    title: 'Category',
    options: [
      { label: 'Marble', test: match(/marble/) },
      { label: 'PVC Panels', test: match(/pvc|wood plastic composite/) },
      { label: 'Wallpapers', test: match(/wallpaper/) },
      { label: 'False Ceiling', test: (p) => p.category === 'Ceilings' },
      {
        label: 'Furniture',
        test: match(/furniture|wardrobe|kitchen|cabinet|shutter|counter/),
      },
      { label: 'Flooring', test: (p) => p.category === 'Flooring' },
    ],
  },
  {
    key: 'material',
    title: 'Material',
    options: [
      { label: 'Natural Marble', test: match(/marble/) },
      { label: 'WPC / PVC', test: match(/pvc|wood plastic composite/) },
      { label: 'Non-woven Fabric', test: match(/non-woven|fabric/) },
      {
        label: 'Gypsum & POP',
        test: match(/mouldings|primed for paint|paint-ready|gypsum|\bpop\b/),
      },
      { label: 'Engineered Wood', test: match(/engineered|laminat|veneer|plywood|hpl/) },
      { label: 'Leather & Walnut', test: match(/leather|leatherette|walnut/) },
    ],
  },
  {
    key: 'application',
    title: 'Application',
    options: [
      { label: 'Flooring', test: (p) => p.category === 'Flooring' || match(/floor/)(p) },
      {
        label: 'Wall Cladding',
        test: match(/cladding|wall panel|panelling|feature wall|elevation|facade|façade|feature panel/),
      },
      { label: 'Bedroom Walls', test: match(/bedroom/) },
      { label: 'Living Room', test: match(/living|dining/) },
      { label: 'Kitchen Counter', test: match(/kitchen|counter/) },
      { label: 'Bathroom', test: match(/bathroom/) },
    ],
  },
  {
    key: 'colour',
    title: 'Colour',
    options: [
      { label: 'White', test: match(/white/) },
      { label: 'Black', test: match(/\bblack\b/) },
      { label: 'Beige', test: match(/beige|ivory|honey|travertine/) },
      { label: 'Wood', test: match(/wood|oak|walnut|teak|grain/) },
      { label: 'Tan', test: match(/\btan\b|brown|cane|leather|leatherette/) },
    ],
  },
]

export const EMPTY_FILTERS = {
  category: [],
  material: [],
  application: [],
  colour: [],
}

export const toggleFilter = (filters, groupKey, label) => {
  const list = filters[groupKey] || []
  return {
    ...filters,
    [groupKey]: list.includes(label) ? list.filter((l) => l !== label) : [...list, label],
  }
}

export const filterProducts = (products, filters) =>
  products.filter((p) =>
    FILTER_GROUPS.every((group) => {
      const selected = filters[group.key] || []
      if (selected.length === 0) return true
      return group.options.some((o) => selected.includes(o.label) && o.test(p))
    }),
  )

export const searchProducts = (products, query) => {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) =>
    [p.name, p.category, p.short, p.material, ...(p.finishes || []), ...(p.applications || [])]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}

export const countActiveFilters = (filters) =>
  Object.values(filters).reduce((total, list) => total + (list?.length || 0), 0)
