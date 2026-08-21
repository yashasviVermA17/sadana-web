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

export const PRODUCT_SHOP_SLUGS = {
  // Marble & stone
  'pu-stones': 'marble',
  'marble-sheets': 'marble',
  'uv-marble-sheets': 'marble',
  // PVC & wall panels
  'pvc-wall-panels': 'pvc-panels',
  'wpc-panels': 'pvc-panels',
  'customized-wall-paneling': 'pvc-panels',
  '3d-panels': 'pvc-panels',
  'parametric-panel': 'pvc-panels',
  'hdhmr-3d-panels': 'pvc-panels',
  // Separate categories
  'french-mouldings': 'mouldings',
  'cnc-work': 'cnc-work',
  'glass-films': 'glass-films',
  // Wallpapers
  wallpapers: 'wallpapers',
  // False ceiling
  'baffle-ceiling': 'false-ceiling',
  'stretch-fiber-ceiling': 'false-ceiling',
  'pvc-ceiling': 'false-ceiling',
  'vox-soffit-ceiling': 'false-ceiling',
  // Sheets
  'alabaster-sheets': 'sheets',
  'highlight-sheets': 'sheets',
  'cork-sheets': 'sheets',
  'charcoal-sheets': 'sheets',
  'charcoal-highlighter-sheet': 'sheets',
  'acp-hpl-sheets': 'sheets',
  // Flooring
  'wooden-flooring': 'flooring',
  'gym-flooring': 'flooring',
  'spc-flooring': 'flooring',
  'vinyl-flooring': 'flooring',
  'rugs-carpets': 'carpets',
  // Exterior & outdoor
  'exterior-cladding': 'exterior-outdoor',
  'wpc-cladding': 'exterior-outdoor',
  'wall-cladding': 'exterior-outdoor',
  'charcoal-louvers': 'exterior-outdoor',
  'exterior-vox-panel': 'exterior-outdoor',
  'hdpc-louvers': 'exterior-outdoor',
  'roofing-thatch': 'exterior-outdoor',
  'ladder-rungs': 'rungs',
  'grass-tiles': 'exterior-outdoor',
  'vertical-garden': 'exterior-outdoor',
  'artificial-grass': 'exterior-outdoor',
  // Separate categories
  'customized-doors': 'doors',
  plywood: 'plywood',
  laminates: 'laminates',
  'acrylic-sheets': 'acrylic-sheets',
  'veneer-sheets': 'veneer-sheets',
  curtains: 'curtains',
  blinds: 'blinds',
  'wooden-blinds': 'blinds',
  upholstery: 'sofa-mattress',
  mattress: 'sofa-mattress',
  'rattan-cane': 'rattan-cane',
}

const byShopSlug = (slug) => (p) => PRODUCT_SHOP_SLUGS[p.id] === slug

export const FILTER_GROUPS = [
  {
    key: 'category',
    title: 'Category',
    options: [
      { label: 'Marble', slug: 'marble', test: byShopSlug('marble') },
      { label: 'PVC Panels', slug: 'pvc-panels', test: byShopSlug('pvc-panels') },
      { label: 'Wallpapers', slug: 'wallpapers', test: byShopSlug('wallpapers') },
      { label: 'False Ceiling', slug: 'false-ceiling', test: byShopSlug('false-ceiling') },
      { label: 'Sheets', slug: 'sheets', test: byShopSlug('sheets') },
      { label: 'Flooring', slug: 'flooring', test: byShopSlug('flooring') },
      { label: 'Carpets', slug: 'carpets', test: byShopSlug('carpets') },
      {
        label: 'Exterior & Outdoor',
        slug: 'exterior-outdoor',
        test: byShopSlug('exterior-outdoor'),
      },
      { label: 'Rungs', slug: 'rungs', test: byShopSlug('rungs') },
      { label: 'Doors', slug: 'doors', test: byShopSlug('doors') },
      { label: 'Plywood', slug: 'plywood', test: byShopSlug('plywood') },
      { label: 'Laminates', slug: 'laminates', test: byShopSlug('laminates') },
      { label: 'Acrylic Sheets', slug: 'acrylic-sheets', test: byShopSlug('acrylic-sheets') },
      { label: 'Veneer Sheets', slug: 'veneer-sheets', test: byShopSlug('veneer-sheets') },
      { label: 'Curtains', slug: 'curtains', test: byShopSlug('curtains') },
      { label: 'Blinds', slug: 'blinds', test: byShopSlug('blinds') },
      { label: 'Sofa & Mattress', slug: 'sofa-mattress', test: byShopSlug('sofa-mattress') },
      { label: 'Rattan Cane', slug: 'rattan-cane', test: byShopSlug('rattan-cane') },
      { label: 'Mouldings', slug: 'mouldings', test: byShopSlug('mouldings') },
      { label: 'CNC Work', slug: 'cnc-work', test: byShopSlug('cnc-work') },
      { label: 'Glass Films', slug: 'glass-films', test: byShopSlug('glass-films') },
    ],
  },
]

export const EMPTY_FILTERS = {
  category: [],
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

export const shopCategories = FILTER_GROUPS[0].options.map(({ label, slug, test }) => ({
  name: label,
  slug,
  test,
}))

export const getShopCategoryBySlug = (slug) => shopCategories.find((c) => c.slug === slug)

export const getProductShopSlug = (product) => PRODUCT_SHOP_SLUGS[product.id] || null

export const getProductShopCategory = (product) => {
  const slug = getProductShopSlug(product)
  return slug ? getShopCategoryBySlug(slug) : undefined
}
