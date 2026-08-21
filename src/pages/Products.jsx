import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import PageHero from '../components/PageHero'
import { products } from '../data/products'
import {
  EMPTY_FILTERS,
  countActiveFilters,
  filterProducts,
  getShopCategoryBySlug,
  getProductShopSlug,
  searchProducts,
  shopCategories,
  toggleFilter,
} from '../data/filters'
import imgHero from '../assets/product hera image 2.jpg'

export default function Products({ activeCategorySlug }) {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const activeCategory = useMemo(
    () => (activeCategorySlug ? getShopCategoryBySlug(activeCategorySlug) : null),
    [activeCategorySlug],
  )

  const baseItems = useMemo(
    () =>
      activeCategory
        ? products.filter((p) => getProductShopSlug(p) === activeCategory.slug)
        : products,
    [activeCategory],
  )

  const filtered = useMemo(() => {
    const byFilters = filterProducts(baseItems, filters)
    return searchProducts(byFilters, query)
  }, [baseItems, filters, query])

  const activeCount = countActiveFilters(filters)
  const hasActive = activeCount > 0 || Boolean(query.trim()) || Boolean(activeCategory)

  const handleToggle = (groupKey, label) =>
    setFilters((prev) => toggleFilter(prev, groupKey, label))

  const clearAll = () => {
    setFilters(EMPTY_FILTERS)
    setQuery('')
    setDrawerOpen(false)
    navigate('/products')
  }

  const searchBox = (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-stone"
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
        aria-label="Search products"
        className="w-full rounded-full border border-charcoal/15 bg-white py-3 pl-11 pr-10 text-sm text-charcoal placeholder:text-stone/50 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-stone transition-colors duration-200 hover:bg-mist hover:text-charcoal"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )

  const countLabel = (
    <p className="text-sm text-stone">
      Showing <span className="font-medium text-charcoal">{filtered.length}</span> of{' '}
      <span className="font-medium text-charcoal">{baseItems.length}</span> products
    </p>
  )

  return (
    <>
      <PageHero
        image={imgHero}
        breadcrumb={
          activeCategory
            ? [
                { label: 'Products', to: '/products' },
                { label: activeCategory.name },
              ]
            : [{ label: 'Products' }]
        }
        eyebrow="Our Products"
        title="Surfaces, panels & materials for every space"
        subtitle="Your trusted destination for premium interior and exterior design products — wall panels, blinds, alabaster sheets, decorative surfaces and interior materials, sourced, sampled and supplied by a team that can touch every product we sell."
      />

      <section className="mx-auto max-w-none px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
          <FilterSidebar
            categories={shopCategories}
            activeCategorySlug={activeCategorySlug}
            filters={filters}
            onToggle={handleToggle}
            onClear={clearAll}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          />

          <div className="min-w-0 flex-1">
            <Reveal className="mb-8">
              <div className="flex items-center justify-between gap-4 lg:hidden">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open filters"
                  className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 bg-white px-5 py-2.5 text-sm font-medium text-charcoal transition-colors duration-200 hover:border-brand hover:text-brand"
                >
                  <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                  Filters
                  {activeCount > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1.5 text-[11px] font-semibold text-cream">
                      {activeCount}
                    </span>
                  )}
                </button>
                {countLabel}
              </div>

              <div className="hidden items-end justify-between gap-6 lg:flex">
                <div className="w-full max-w-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                    Search Products
                  </p>
                  <div className="mt-2.5">{searchBox}</div>
                </div>
                <div className="shrink-0 pb-1">{countLabel}</div>
              </div>

              <div className="mt-5 lg:hidden">{searchBox}</div>

              {activeCategory && (
                <div className="mt-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-3 py-1 text-xs font-medium text-brand-dark">
                    {activeCategory.name}
                    <button
                      type="button"
                      onClick={() => navigate('/products')}
                      aria-label={`Remove ${activeCategory.name} category`}
                      className="grid h-4 w-4 place-items-center rounded-full transition-colors duration-200 hover:bg-brand hover:text-cream"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                </div>
              )}
            </Reveal>

            {filtered.length > 0 ? (
              <Reveal>
                <ProductGrid items={filtered} columns="sm:grid-cols-2 xl:grid-cols-3" categoryFirst={false} />
              </Reveal>
            ) : (
              <Reveal className="flex flex-col items-center gap-4 rounded-card border border-dashed border-charcoal/20 bg-ivory px-6 py-20 text-center">
                <p className="font-serif text-2xl text-charcoal">No products found</p>
                <p className="max-w-sm text-sm leading-relaxed text-stone">
                  Try adjusting your search or removing some filters.
                </p>
                {hasActive && (
                  <Button variant="outline" onClick={clearAll} className="mt-2">
                    Clear all filters
                  </Button>
                )}
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
