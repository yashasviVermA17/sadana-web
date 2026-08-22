import { Quote } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { testimonials } from '../data/site'

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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 90}
              className="flex flex-col gap-5 rounded-card border border-charcoal/10 bg-ivory p-6 sm:p-7"
            >
              <Quote className="h-7 w-7 text-brand" aria-hidden="true" />
              <p className="flex-1 text-sm leading-relaxed text-stone">“{t.quote}”</p>
              <div className="flex items-center gap-3 border-t border-charcoal/10 pt-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-stone">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {clientLogos.length > 0 && (
          <div className="mt-14">
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
        )}
      </div>
    </section>
  )
}
