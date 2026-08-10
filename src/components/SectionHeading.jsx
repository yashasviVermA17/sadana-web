import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  dark = false,
  className = '',
}) {
  const alignment =
    align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'

  return (
    <Reveal className={`flex flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          <span className="h-px w-8 bg-brand" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`max-w-2xl text-3xl leading-[1.12] sm:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`max-w-xl text-base leading-relaxed ${
            dark ? 'text-taupe' : 'text-stone'
          }`}
        >
          {text}
        </p>
      )}
    </Reveal>
  )
}
