import { Quote } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { testimonials } from '../data/site'

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
      </div>
    </section>
  )
}
