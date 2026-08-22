import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import AutoSlider from './AutoSlider'

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
          <div className="mt-8">
            <AutoSlider
              items={clientLogos}
              itemClassName="h-full"
              visible={{ base: 1.15, sm: 2.2, lg: 3 }}
              interval={30000}
              renderItem={(logo) => (
                <div className="flex h-44 items-center justify-center rounded-2xl border border-charcoal/10 bg-white px-10 shadow-card sm:h-56 sm:px-14">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="max-h-full w-full object-contain"
                  />
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
