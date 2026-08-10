import { useEffect, useState } from 'react'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import ProjectGrid from '../components/ProjectGrid'
import StatsSection from '../components/StatsSection'
import Testimonials from '../components/Testimonials'
import CollectionSlider from '../components/CollectionSlider'
import { useUI } from '../context/UIContext'
import { products } from '../data/products'
import { projects } from '../data/projects'
import imgHero from '../assets/Sofa.jpg'
import imgCta1 from '../assets/Pu stone wall panel.jpg'
import imgCta2 from '../assets/Parametric wall panel.jpg'
import imgCta3 from '../assets/Vertical garden.jpg'
import imgCta4 from '../assets/Alabaster ceiling.jpg'
import imgCta5 from '../assets/Wooden flooring.jpg'
import imgCta6 from '../assets/Baffle ceiling.jpg'
import imgCta7 from '../assets/Curtain.jpg'

const ctaImages = [imgCta1, imgCta2, imgCta3, imgCta4, imgCta5, imgCta6, imgCta7]
const CTA_INTERVAL = 1000

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
  const { homeReveal } = useUI()
  const shown = homeReveal ? ' is-visible' : ''

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <img
        src={imgHero}
        alt="Premium interior design by Sadana Decor"
        className={`hero-img absolute inset-0 h-full w-full object-cover${shown}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-charcoal/15" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-none px-5 pb-20 pt-36 sm:px-6 lg:px-8 lg:pb-24">
        <span
          className={`hero-item inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-cream/70${shown}`}
          style={{ transitionDelay: '40ms' }}
        >
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          Sadana Decor · Since 2010
        </span>

        <h1
          className={`hero-item mt-5 max-w-3xl font-serif text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-[4.25rem]${shown}`}
          style={{ transitionDelay: '150ms' }}
        >
          Creating Elegant Spaces for Beautiful Living
        </h1>

        <p
          className={`hero-item mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg${shown}`}
          style={{ transitionDelay: '260ms' }}
        >
          Premium Interior Solutions for Homes, Offices &amp; Commercial Spaces.
        </p>

        <div
          className={`hero-item mt-9 flex flex-wrap items-center gap-3.5${shown}`}
          style={{ transitionDelay: '370ms' }}
        >
          <Button to="/products" size="lg">
            Explore Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>

      <a
        href="#materials"
        aria-label="Scroll to materials"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-cream/60 transition-colors duration-300 hover:text-cream lg:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
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
        <ProductGrid items={featured} />
      </Reveal>
    </section>
  )
}

function RecentProjects() {
  const recent = projects.slice(0, 6)

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Recent Projects"
            title="Spaces we recently completed"
            text="Residences, workspaces and hospitality interiors delivered turnkey."
          />
          <Reveal delay={150}>
            <Button to="/projects" variant="outline">
              View All Projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <ProjectGrid items={recent} />
        </Reveal>
      </div>
    </section>
  )
}

function FinalCta() {
  const [ctaIndex, setCtaIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCtaIndex((i) => (i + 1) % ctaImages.length)
    }, CTA_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden">
      {ctaImages.map((img, i) => (
        <img
          key={img}
          src={img}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            i === ctaIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-charcoal/75" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-none flex-col items-center px-5 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-brand">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            Let’s Begin
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-[1.12] text-cream sm:text-5xl">
            Let’s design a space you’ll never want to leave.
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/75">
            Share your plan and our designers will prepare a tailored concept and quote
            for your home, office or commercial project.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <Button to="/projects" variant="outlineLight" size="lg">
              See Our Work
            </Button>
          </div>
        </Reveal>
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
      <RecentProjects />
      <CollectionSlider />
      <Testimonials />
      <FinalCta />
    </>
  )
}
