import { useParams } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import Button from '../components/Button'
import ImageGallery from '../components/ImageGallery'
import Reveal from '../components/Reveal'
import AutoSlider from '../components/AutoSlider'
import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { getProduct, relatedProducts } from '../data/products'
import { getProductShopCategory } from '../data/filters'
import { useUI } from '../context/UIContext'

const relatedVisible = { base: 1.1, sm: 2.2, lg: 3, xl: 3 }

function DetailRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">{label}</p>
      <div className="text-sm leading-relaxed text-charcoal">{children}</div>
    </div>
  )
}

export default function ProductDetail({ productId: propProductId }) {
  const { productId } = useParams()
  const { openQuote } = useUI()
  const id = propProductId || productId
  const product = getProduct(id)

  if (!product) {
    return (
      <section className="mx-auto flex max-w-none flex-col items-center px-5 py-32 text-center sm:px-6">
        <h1 className="font-serif text-4xl text-charcoal">Product not found</h1>
        <p className="mt-4 text-stone">The product you’re looking for doesn’t exist.</p>
        <Button to="/products" className="mt-8">
          Back to Products
        </Button>
      </section>
    )
  }

  const shopCategory = getProductShopCategory(product)
  const related = relatedProducts(product)

  return (
    <>
      <section className="mx-auto max-w-none px-5 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <Reveal>
          <Breadcrumb
            items={[
              { label: 'Products', to: '/products' },
              ...(shopCategory
                ? [{ label: shopCategory.name, to: `/products/${shopCategory.slug}` }]
                : []),
              { label: product.name },
            ]}
          />
        </Reveal>
        <Reveal delay={100}>
          <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:mt-6 sm:text-xs">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            {product.category}
          </span>
        </Reveal>
        <Reveal delay={160}>
          <h1 className="mt-3 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-charcoal sm:mt-4 sm:text-5xl lg:text-[4.25rem]">
            {product.name}
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone sm:mt-6 sm:text-lg">
            {product.short}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-none px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
          <Reveal>
            <ImageGallery images={product.gallery} alt={product.name} />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                {product.category}
              </span>
              <h1 className="mt-4 font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-stone">
                {product.description}
              </p>

              <div className="mt-8 divide-y divide-charcoal/10 border-y border-charcoal/10">
                <DetailRow label="Features">
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </DetailRow>

                <DetailRow label="Material Information">{product.material}</DetailRow>

                <DetailRow label="Applications">
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs text-charcoal"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </DetailRow>

                <DetailRow label="Finishes">
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((finish) => (
                      <span
                        key={finish}
                        className="rounded-full bg-charcoal px-3.5 py-1.5 text-xs text-cream"
                      >
                        {finish}
                      </span>
                    ))}
                  </div>
                </DetailRow>
              </div>

              <p className="mt-8 text-xs leading-relaxed text-stone">
                Free physical samples available on request. Bulk and trade pricing for
                architects and contractors.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-mist">
          <div className="mx-auto max-w-none px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <SectionHeading eyebrow="Related Products" title="You may also like" />
              <Reveal delay={150}>
                <Button to="/products" variant="outline">
                  View All Products
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Reveal>
            </div>
            <Reveal className="mt-10">
              <AutoSlider
                key={`related-${product.id}`}
                items={related}
                itemClassName="h-full"
                visible={relatedVisible}
                renderItem={(item) => <ProductCard product={item} categoryFirst={false} />}
              />
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
