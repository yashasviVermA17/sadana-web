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
      {items.map((product, i) => (
        <Reveal key={product.id} delay={(i % 3) * 90} className="h-full">
          <ProductCard product={product} categoryFirst={categoryFirst} />
        </Reveal>
      ))}
    </div>
  )
}
