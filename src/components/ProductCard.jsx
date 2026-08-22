import { Link } from 'react-router-dom'
import { getProductShopSlug } from '../data/filters'
import TiltCard from './TiltCard'
import TiltImage from './TiltImage'

export default function ProductCard({ product, image, linkToCategory = false }) {
  const shopSlug = getProductShopSlug(product)
  const to =
    linkToCategory && shopSlug
      ? `/products/${shopSlug}`
      : shopSlug
        ? `/products/${shopSlug}/${product.id}`
        : `/products/${product.id}`

  return (
    <TiltCard className="h-full">
      <Link
        to={to}
        className="group relative block h-full overflow-hidden rounded-card border border-charcoal/10 bg-ivory shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_24px_60px_-24px_rgb(200_90_50/0.35)]"
      >
        <div className="relative img-zoom aspect-[4/3] overflow-hidden">
          <TiltImage
            src={image || product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-xl leading-snug text-cream">
                {product.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
