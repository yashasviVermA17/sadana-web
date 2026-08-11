import Breadcrumb from './Breadcrumb'
import Reveal from './Reveal'

export default function PageHero({ image, breadcrumb, eyebrow, title, subtitle, children, fit = 'cover' }) {
  return (
    <section data-hero>
      <div className="relative h-[65vh] min-h-[440px] w-full overflow-hidden sm:h-[70vh] lg:h-[78vh]">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className={`img-settle block h-full w-full object-${fit}`}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/50 to-charcoal/25"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-5 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
          <Reveal>
            <Breadcrumb items={breadcrumb} light />
          </Reveal>
          {eyebrow && (
            <Reveal delay={100}>
              <span className="mt-5 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:mt-6 sm:text-xs">
                <span className="h-px w-8 bg-brand" aria-hidden="true" />
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={160}>
            <h1 className="mt-3 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-cream sm:mt-4 sm:text-5xl">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={220}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:mt-5 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}
