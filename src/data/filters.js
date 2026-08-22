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
  'parametric-panel': 'wall-panels',
  'pvc-wall-panels': 'wall-panels',
  'wpc-panels': 'wall-panels',
  'wpc-cladding': 'wall-panels',
  'customized-wall-paneling': 'wall-panels',
  'wall-cladding': 'wall-panels',
  'pu-stones': 'wall-panels',
  // Sheets
  'acp-hpl-sheets': 'sheets',
  'acrylic-sheets': 'sheets',
  'alabaster-sheets': 'sheets',
  'cork-sheets': 'sheets',
  'highlight-sheets': 'sheets',
  laminates: 'sheets',
  'uv-marble-sheets': 'sheets',
  'veneer-sheets': 'sheets',
  // Ceiling
  'baffle-ceiling': 'ceiling',
  'stretch-fiber-ceiling': 'ceiling',
  'pvc-ceiling': 'ceiling',
  'vox-soffit-ceiling': 'ceiling',
  // Flooring
  'gym-flooring': 'flooring',
  'spc-flooring': 'flooring',
  'vinyl-flooring': 'flooring',
  'wooden-flooring': 'flooring',
  'rugs-carpets': 'flooring',
  // Grass
  'artificial-grass': 'grass',
  'grass-tiles': 'grass',
  // Charcoal / Decorative
  'charcoal-louvers': 'charcoal-decorative',
  'charcoal-sheets': 'charcoal-decorative',
  'charcoal-highlighter-sheet': 'charcoal-decorative',
  'hdpc-louvers': 'charcoal-decorative',
  // Outdoor
  'exterior-cladding': 'outdoor',
  'exterior-vox-panel': 'outdoor',
  'roofing-thatch': 'outdoor',
  'rattan-cane': 'outdoor',
  // Doors
  'customized-doors': 'doors',
  // Glass
  'glass-films': 'glass',
  // Wallpaper
  wallpapers: 'wallpaper',
  'designer-wallpapers': 'wallpaper',
  'wallpapers-textured': 'wallpaper',
  'wallpapers-floral': 'wallpaper',
  'wallpapers-geometric': 'wallpaper',
  'wallpapers-3d': 'wallpaper',
  'wallpapers-kids': 'wallpaper',
  'wallpapers-metallic': 'wallpaper',
  // Blinds & Curtains
  blinds: 'blinds-curtains',
  curtains: 'blinds-curtains',
  'wooden-blinds': 'blinds-curtains',
  // Furniture
  upholstery: 'furniture',
  mattress: 'furniture',
  // Tiles
  'marble-sheets': 'tiles',
  // Wooden / Interior Work
  'cnc-work': 'wooden-work',
  'french-mouldings': 'wooden-work',
  plywood: 'wooden-work',
  // Rugs
  'ladder-rungs': 'rugs',
  // Vertical Garden
  'vertical-garden': 'vertical-garden',
}

const byShopSlug = (slug) => (p) => PRODUCT_SHOP_SLUGS[p.id] === slug

export const FILTER_GROUPS = [
  {
    key: 'category',
    title: 'Category',
    options: [
      { label: 'Wall Panels', slug: 'wall-panels', test: byShopSlug('wall-panels') },
      { label: 'Sheets', slug: 'sheets', test: byShopSlug('sheets') },
      { label: 'Ceiling', slug: 'ceiling', test: byShopSlug('ceiling') },
      { label: 'Flooring', slug: 'flooring', test: byShopSlug('flooring') },
      { label: 'Grass', slug: 'grass', test: byShopSlug('grass') },
      {
        label: 'Charcoal / Decorative',
        slug: 'charcoal-decorative',
        test: byShopSlug('charcoal-decorative'),
      },
      { label: 'Outdoor', slug: 'outdoor', test: byShopSlug('outdoor') },
      { label: 'Doors', slug: 'doors', test: byShopSlug('doors') },
      { label: 'Glass', slug: 'glass', test: byShopSlug('glass') },
      { label: 'Wallpaper', slug: 'wallpaper', test: byShopSlug('wallpaper') },
      {
        label: 'Blinds & Curtains',
        slug: 'blinds-curtains',
        test: byShopSlug('blinds-curtains'),
      },
      { label: 'Furniture', slug: 'furniture', test: byShopSlug('furniture') },
      { label: 'Tiles', slug: 'tiles', test: byShopSlug('tiles') },
      {
        label: 'Wooden / Interior Work',
        slug: 'wooden-work',
        test: byShopSlug('wooden-work'),
      },
      { label: 'Rugs', slug: 'rugs', test: byShopSlug('rugs') },
      { label: 'Vertical Garden', slug: 'vertical-garden', test: byShopSlug('vertical-garden') },
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
