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
          className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/20"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex h-full w-full max-w-none flex-col items-start justify-end px-5 pb-12 sm:px-6 lg:px-8 lg:pb-16">
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
      </div>
    </section>
  )
}
