import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const clientLogoModules = import.meta.glob('../assets/clients/*.png', {
  eager: true,
  import: 'default',
})

const clientLogos = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    name: path
      .split('/')
      .pop()
      .replace(/^\d+_/, '')
      .replace(/\.png$/i, '')
      .replace(/_/g, ' '),
  }))

export default function Testimonials() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-none px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Happy Clients"
          text="Fifteen years of relationships built one room at a time."
          className="max-w-2xl"
        />

        <div className="mt-10">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
            Brands & institutions we have served
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
            {clientLogos.map((logo) => (
              <Reveal key={logo.src}>
                <div className="flex h-20 items-center justify-center rounded-xl border border-charcoal/10 bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-card sm:h-24">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="max-h-full w-full object-contain"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
