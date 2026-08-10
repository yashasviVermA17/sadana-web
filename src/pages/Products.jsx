import { useSearchParams } from 'react-router-dom'
import CategoryFilter from '../components/CategoryFilter'
import ProductGrid from '../components/ProductGrid'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import PageHero from '../components/PageHero'
import { categories, productsByCategory } from '../data/products'
import imgHero from '../assets/3 D panel.jpg'

const categoryAliases = {
  wallpapers: 'Wall Finishes',
  curtains: 'Soft Furnishings',
  'wooden-flooring': 'Flooring',
  blinds: 'Soft Furnishings',
  'pvc-panels': 'Wall Finishes',
  'artificial-grass': 'Exterior & Outdoor',
  'home-decor': 'Soft Furnishings',
  'office-decor': 'All',
}

export default function Products() {
  const [params, setParams] = useSearchParams()
  const active = categoryAliases[params.get('category')] || params.get('category') || 'All'
  const items = productsByCategory(active)

  const setCategory = (category) => {
    if (category === 'All') setParams({})
    else setParams({ category })
  }

  return (
    <>
      <PageHero
        image={imgHero}
        breadcrumb={[{ label: 'Products' }]}
        eyebrow="Our Products"
        title="Surfaces, panels & materials for every space"
        subtitle="Wall panels, blinds, alabaster sheets, decorative surfaces and interior materials — sourced, sampled and supplied by a team that can touch every product we sell."
      />

      <section className="mx-auto max-w-none px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal className="mb-8">
          <CategoryFilter categories={['All', ...categories]} active={active} onChange={setCategory} />
        </Reveal>

        <Reveal className="mb-8 flex items-center justify-between gap-4">
          <p className="text-sm text-stone">
            <span className="font-medium text-charcoal">{items.length}</span>{' '}
            {items.length === 1 ? 'product' : 'products'} in {active}
          </p>
        </Reveal>

        {items.length > 0 ? (
          <Reveal>
            <ProductGrid items={items} />
          </Reveal>
        ) : (
          <Reveal className="flex flex-col items-center gap-4 rounded-card border border-dashed border-charcoal/20 py-20 text-center">
            <p className="text-stone">No products found in this category yet.</p>
            <Button variant="outline" onClick={() => setParams({})}>
              View All Products
            </Button>
          </Reveal>
        )}


      </section>
    </>
  )
}
