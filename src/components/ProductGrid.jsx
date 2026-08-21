import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function ProductGrid({
  items,
  className = '',
  columns = 'sm:grid-cols-2 lg:grid-cols-3',
  categoryFirst = true,
}) {
  return (
    <div
      className={`grid gap-5 ${columns} sm:gap-6 ${className}`}
    >
      {items.map((item, i) => {
        const entry = item && item.product ? item : { key: item.id, product: item, image: undefined }
        return (
          <Reveal key={entry.key} delay={(i % 3) * 90} className="h-full">
            <ProductCard
              product={entry.product}
              image={entry.image}
              categoryFirst={categoryFirst}
            />
          </Reveal>
        )
      })}
    </div>
  )
}
