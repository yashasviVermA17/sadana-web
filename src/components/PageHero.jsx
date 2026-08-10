import Breadcrumb from './Breadcrumb'
import Reveal from './Reveal'

export default function PageHero({ image, breadcrumb, eyebrow, title, subtitle, children }) {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="img-settle absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-none px-5 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-20">
        <Reveal>
          <Breadcrumb items={breadcrumb} light />
        </Reveal>
        {eyebrow && (
          <Reveal delay={100}>
            <span className="mt-6 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={160}>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-cream sm:text-5xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={220}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
