import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import StatsSection from '../components/StatsSection'
import Testimonials from '../components/Testimonials'
import InstagramReels from '../components/InstagramReels'
import { products } from '../data/products'
import imgHero from '../assets/home page hero image.png'

function Hero() {
  return (
    <section data-hero>
      <div className="relative min-h-[max(680px,100svh)] w-full overflow-hidden lg:aspect-auto lg:h-[92vh] lg:min-h-[560px]">
        <img
          src={imgHero}
          alt="Premium interior design by Sadana Decor"
          className="absolute inset-x-0 top-[-9%] block h-[125%] w-full object-cover object-center md:top-0 md:h-full md:object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/15 to-charcoal/50 lg:bg-gradient-to-t lg:from-charcoal/90 lg:via-charcoal/45 lg:to-charcoal/15"
          aria-hidden="true"
        />

        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-6 pb-[70px] sm:px-8 md:justify-start md:pb-10 md:pt-[170px] lg:justify-end lg:px-8 lg:pb-20 lg:pt-0">
          <h1 className="max-w-4xl text-[clamp(38px,10vw,46px)] font-bold leading-[1.1] text-white lg:text-6xl lg:leading-tight">
            SADANA DECOR &amp; INTERIOR
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg lg:mt-3">
            All Types Of Interior &amp; Exterior Products Under One Roof
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3.5 sm:mt-8">
            <Button to="/products" size="lg" className="max-w-full">
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

      <div className="mt-12">
        <ProductGrid items={products} categoryFirst />
      </div>
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
      <Testimonials />
    </>
  )
}
