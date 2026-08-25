import { Target, Eye } from 'lucide-react'
import Button from '../components/Button'
import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import StatsSection from '../components/StatsSection'
import Timeline from '../components/Timeline'
import ValueCard from '../components/ValueCard'
import SectionHeading from '../components/SectionHeading'
import PageHero from '../components/PageHero'
import TiltCard from '../components/TiltCard'
import TiltImage from '../components/TiltImage'
import { values } from '../data/site'
import imgStory from '../assets/about inside image.jpg'
import imgCtaBg from '../assets/products/wall-panels/Parametric wall panel.jpeg'
import imgHero from '../assets/about hero image 17.jpeg'

function MissionVision() {
  const cards = [
    {
      icon: Target,
      title: 'Our Vision',
      text: 'To become a trusted destination for innovative, stylish and high-quality interior and exterior solutions that transform every space into something beautiful, functional and lasting.',
    },
    {
      icon: Eye,
      title: 'Our Mission',
      text: 'To provide premium interior and exterior products that match modern design, durability and customer needs — with excellent service, honest guidance, quality assurance and timely support, for homes, offices, commercial spaces and construction projects.',
    },
  ]

  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 100}>
          <div className="flex h-full flex-col gap-4 rounded-card border border-charcoal/10 bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-soft text-brand">
              <card.icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
              {card.title}
            </h3>
            <p className="text-base leading-relaxed text-charcoal">{card.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function WhyChooseUs() {
  const points = [
    'Wide range of interior & exterior products',
    'Modern and premium designs',
    'Quality materials at competitive prices',
    'Expert guidance and customer support',
    'Solutions for Home, Office, Showroom, Hospitals, Colleges, Hotels, Schools, University & Commercial Projects',
    'Design your dream space with us — inside and out',
  ]

  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Why Choose Us"
          title="The reasons to decor with us"
          text="We bring together design, quality and functionality under one roof."
          className="max-w-2xl"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <Reveal key={point} delay={i * 70}>
              <div className="flex h-full items-start gap-3.5 rounded-card border border-charcoal/10 bg-ivory p-5 sm:p-6">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-semibold text-cream">
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-charcoal">{point}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <section data-hero className="relative h-[50vh] min-h-[300px] w-full overflow-hidden sm:h-[52vh] sm:min-h-[360px] lg:h-[95vh] lg:min-h-[720px]">
        <img
          src={imgHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-x-0 top-0 block h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/25" aria-hidden="true" />
        <div className="absolute inset-0 mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-5 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
          <Breadcrumb items={[{ label: 'About' }]} light />
          <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:mt-6 sm:text-xs">
            <span className="h-px w-8 bg-brand" aria-hidden="true" />
            About Us
          </span>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:mt-5 sm:text-lg">
            At SADANA DECOR &amp; INTERIOR, we believe every space has a story — and we are here to help you design it with perfection.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-none px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <TiltCard className="img-zoom overflow-hidden rounded-card">
              <TiltImage
                src={imgStory}
                alt="SADANA Decor & Interior showroom"
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-stone">
              <p>
                Welcome to SADANA Decor & Interior, your trusted destination for premium
                interior and exterior design products. We specialize in offering a wide
                range of stylish, durable and modern solutions to transform residential,
                commercial and office spaces.
              </p>
              <p>
                From elegant wall finishes, wallpapers, modular decor, ceiling solutions,
                tiles, panels and lighting to high-quality exterior cladding, elevation
                materials, outdoor decor and architectural finishes — we bring together
                design, quality and functionality under one roof.
              </p>
              <p>
                Our mission is to help customers create spaces that are not only beautiful
                but also practical and long-lasting. With a focus on latest trends,
                superior materials and customer satisfaction, we aim to provide products
                that match every style and budget.
              </p>
              <p>
                At SADANA Decor & Interior, we believe every space has a story — and we
                are here to help you design it with perfection.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-none px-5 pb-14 sm:px-6 lg:px-8">
        <MissionVision />
      </section>

      <WhyChooseUs />

      <StatsSection className="bg-mist" />

      <section className="mx-auto max-w-none px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-3 rounded-card border border-charcoal/10 bg-mist px-6 py-10 text-center sm:flex-row sm:justify-between sm:px-12 sm:text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Our Esteemed Clients
              </p>
              <h2 className="mt-2 font-serif text-2xl text-charcoal">
                Government & Institutional Projects
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-stone">
              Trusted by government and institutional clients for premium interior &
              exterior products — delivered with quality assurance and timely support.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our Promise"
          title="Everything you need, under one roof"
          className="max-w-2xl"
        />
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            align="center"
            eyebrow="Why Choose Us"
            title="The values we don’t compromise on"
            dark
            className="max-w-2xl"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 90}>
                <ValueCard value={value} index={i} dark />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <img src={imgCtaBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/70" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1320px] flex-col items-center px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-3xl text-cream sm:text-5xl">
              Come feel the difference
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/75">
              Visit our Vijay Nagar, Indore showroom and explore the full range of
              interior & exterior products in person.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
              <Button to="/contact">Visit the Showroom</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
