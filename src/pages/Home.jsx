import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import StatsSection from '../components/StatsSection'
import Testimonials from '../components/Testimonials'
import CollectionSlider from '../components/CollectionSlider'
import InstagramReels from '../components/InstagramReels'
import { products } from '../data/products'
import imgHero from '../assets/home page hero image.png'

const featuredIds = [
  'uv-marble-sheets',
  'pvc-wall-panels',
  'wallpapers',
  'alabaster-sheets',
  'spc-flooring',
  'wpc-panels',
  'vertical-garden',
  'rattan-cane',
  '3d-panels',
]

function Hero() {
  return (
    <section data-hero>
      <div className="relative aspect-[1672/941] min-h-[200px] w-full overflow-hidden lg:aspect-auto lg:h-[92vh] lg:min-h-[560px]">
        <img
          src={imgHero}
          alt="Premium interior design by Sadana Decor"
          className="block h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/10 lg:from-charcoal/90 lg:via-charcoal/45 lg:to-charcoal/15"
          aria-hidden="true"
        />

        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-5 pb-5 sm:px-6 sm:pb-12 lg:px-8 lg:pb-20">
          <h1 className="max-w-3xl font-serif text-[1.5rem] leading-[1.12] text-cream sm:text-5xl lg:text-[4.25rem]">
            Welcome to SADANA DECOR &amp; INTERIOR
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/85 sm:mt-5 sm:text-lg">
            All Types Of Interior &amp; Exterior Products Under One Roof
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3.5 sm:mt-8">
            <Button to="/products" size="lg">
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturedCollection() {
  const featured = products.filter((p) => featuredIds.includes(p.id))

  return (
    <section className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow="Featured Collection"
          title="Materials chosen with intent"
          text="A curated selection of surfaces, panels and pieces used across our projects."
        />
        <Reveal delay={150}>
          <Button to="/products" variant="outline">
            View All Products
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Reveal>
      </div>

      <Reveal className="mt-12">
        <ProductGrid items={featured} categoryFirst />
      </Reveal>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <StatsSection dark className="bg-charcoal" />
      <InstagramReels />
      <CollectionSlider />
      <Testimonials />
    </>
  )
}
