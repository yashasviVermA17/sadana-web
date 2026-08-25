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
  // Wall Panels
  '3d-panels': 'wall-panels',
  'hdhmr-3d-panels': 'wall-panels',
  'pvc-wall-panels': 'wall-panels',
  'pu-stones': 'wall-panels',
  'parametric-panel': 'wall-panels',
  'victara-panel': 'wall-panels',
  'wpc-panels': 'wall-panels',
  'exterior-wall-panel': 'wall-panels',
  // Decorative Sheets
  'acrylic-sheets': 'decorative-sheets',
  'metal-highlighter-sheet': 'decorative-sheets',
  'charcoal-sheets': 'decorative-sheets',
  laminates: 'decorative-sheets',
  'ripple-sheet': 'decorative-sheets',
  'acp-sheets': 'decorative-sheets',
  'cork-sheets': 'decorative-sheets',
  'uv-marble-sheets': 'decorative-sheets',
  'veneer-sheets': 'decorative-sheets',
  // Ceiling
  'alabaster-ceiling': 'ceiling',
  'baffle-ceiling': 'ceiling',
  'stretch-fiber-ceiling': 'ceiling',
  'vox-soffit-ceiling': 'ceiling',
  // Flooring
  'wooden-flooring': 'flooring',
  'spc-flooring': 'flooring',
  'vinyl-flooring': 'flooring',
  'gym-flooring': 'flooring',
  rugs: 'flooring',
  // Roofing
  'roofing-thatch': 'roofing',
  // Doors
  'customized-doors': 'doors',
  'glass-films': 'doors',
  // Blinds & Curtains
  blinds: 'blinds-curtains',
  'wooden-blinds': 'blinds-curtains',
  curtains: 'blinds-curtains',
  // Wallpaper
  wallpapers: 'wallpaper',
  // Artificial Grass
  'artificial-grass': 'artificial-grass',
  // Exterior / Outdoor
  'hdpc-lowers': 'exterior-outdoor',
  'fabric-lowers': 'exterior-outdoor',
  'vertical-garden': 'exterior-outdoor',
  'outdoor-deck-tile': 'exterior-outdoor',
  // Moulding & Decorative
  mouldings: 'moulding-decorative',
  'mosaic-tiles': 'moulding-decorative',
  // Soft Panels
  'vox-soft-panel': 'soft-panels',
  // Carpet
  carpet: 'carpet',
  // CNC Work
  'cnc-work': 'cnc-work',
  // Rattan Cane
  'rattan-cane': 'rattan-cane',
  // Mattress
  mattress: 'mattress',
  cushion: 'mattress',
  // Sofa
  sofa: 'sofa',
}

const byShopSlug = (slug) => (p) => PRODUCT_SHOP_SLUGS[p.id] === slug

export const FILTER_GROUPS = [
  {
    key: 'category',
    title: 'Category',
    options: [
      { label: 'Wall Panels', slug: 'wall-panels', test: byShopSlug('wall-panels') },
      {
        label: 'Decorative Sheets',
        slug: 'decorative-sheets',
        test: byShopSlug('decorative-sheets'),
      },
      { label: 'Ceiling', slug: 'ceiling', test: byShopSlug('ceiling') },
      { label: 'Flooring', slug: 'flooring', test: byShopSlug('flooring') },
      { label: 'Roofing', slug: 'roofing', test: byShopSlug('roofing') },
      { label: 'Doors', slug: 'doors', test: byShopSlug('doors') },
      {
        label: 'Blinds & Curtains',
        slug: 'blinds-curtains',
        test: byShopSlug('blinds-curtains'),
      },
      { label: 'Customized Wallpaper', slug: 'wallpaper', test: byShopSlug('wallpaper') },
      {
        label: 'Artificial Grass',
        slug: 'artificial-grass',
        test: byShopSlug('artificial-grass'),
      },
      {
        label: 'Exterior / Outdoor',
        slug: 'exterior-outdoor',
        test: byShopSlug('exterior-outdoor'),
      },
      {
        label: 'Moulding & Decorative',
        slug: 'moulding-decorative',
        test: byShopSlug('moulding-decorative'),
      },
      { label: 'Soft Panels', slug: 'soft-panels', test: byShopSlug('soft-panels') },
      { label: 'Carpet', slug: 'carpet', test: byShopSlug('carpet') },
      { label: 'CNC Work', slug: 'cnc-work', test: byShopSlug('cnc-work') },
      { label: 'Rattan Cane', slug: 'rattan-cane', test: byShopSlug('rattan-cane') },
      { label: 'Mattress', slug: 'mattress', test: byShopSlug('mattress') },
      { label: 'Sofa', slug: 'sofa', test: byShopSlug('sofa') },
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

export const productSearchText = (product) => {
  const slug = PRODUCT_SHOP_SLUGS[product.id]
  const cat = slug ? FILTER_GROUPS[0].options.find((o) => o.slug === slug) : null
  return [
    product.name,
    product.category,
    product.short,
    product.material,
    ...(product.finishes || []),
    ...(product.applications || []),
    cat?.label,
    slug ? slug.split('-').join(' ') : '',
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export const categorySearchText = (category) =>
  `${category.name} ${category.slug.split('-').join(' ')}`.toLowerCase()

export const searchProducts = (products, query) => {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter((p) => productSearchText(p).includes(q))
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
