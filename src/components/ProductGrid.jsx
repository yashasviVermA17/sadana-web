import ProductCard from './ProductCard'

export default function ProductGrid({ items, className = '' }) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 ${className}`}
    >
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
