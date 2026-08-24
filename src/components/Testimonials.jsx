import SectionHeading from './SectionHeading'
import LogoCarousel from './LogoCarousel'

const clientLogoModules = import.meta.glob(
  '../assets/Sadana_Client_Logos_Enhanced/*.png',
  {
    eager: true,
    import: 'default',
  },
)

const clientLogos = Object.entries(clientLogoModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const fileName = path.split('/').pop()
    const num = fileName.match(/\d+/)?.[0] ?? ''
    return {
      src,
      name: num ? `Client Logo ${Number(num)}` : fileName.replace(/\.png$/i, ''),
    }
  })

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
            <LogoCarousel
              items={clientLogos}
              renderItem={(logo) => (
                <div className="group flex h-20 w-full items-center justify-center rounded-xl border border-charcoal/10 bg-white p-2 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:h-24 sm:p-3">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    loading="lazy"
                    className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
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
