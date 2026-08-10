import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import AutoSlider from './AutoSlider'
import ProductCard from './ProductCard'
import { products } from '../data/products'

const rows = [
  {
    title: 'Walls, Ceilings & Doors',
    categories: ['Wall Finishes', 'Ceilings', 'Doors & Panels'],
  },
  {
    title: 'Flooring',
    categories: ['Flooring'],
  },
  {
    title: 'Soft Furnishings & Outdoor',
    categories: ['Soft Furnishings', 'Exterior & Outdoor'],
  },
]

export default function CollectionCarousel() {
  return (
    <section id="materials" className="overflow-hidden bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Collection"
          title="Everything You Need to Decorate."
          className="max-w-2xl"
        />

        <div className="mt-12 space-y-14 lg:mt-16 lg:space-y-16">
          {rows.map((row, rowIndex) => {
            const items = products.filter((p) => row.categories.includes(p.category))
            return (
              <Reveal key={row.title} delay={rowIndex * 100}>
                <div>
                  <h2 className="mb-5 flex items-center gap-3 font-serif text-xl text-charcoal sm:text-2xl">
                    <span className="h-5 w-1 rounded-full bg-brand" aria-hidden="true" />
                    {row.title}
                  </h2>
                  <AutoSlider
                    items={items}
                    itemClassName="h-full"
                    renderItem={(product) => <ProductCard product={product} />}
                  />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
