export default function ContactCard({ icon: Icon, title, lines }) {
  return (
    <div className="group flex h-full flex-col gap-3 rounded-card border border-charcoal/10 bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card sm:p-7">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone">
        {title}
      </h3>
      <div className="flex flex-col gap-1">
        {lines.map((line) => (
          <p key={line} className="text-sm font-medium text-charcoal">
            {line}
          </p>
        ))}
      </div>
      <span className="mt-auto h-px w-10 bg-brand transition-all duration-300 group-hover:w-16" aria-hidden="true" />
    </div>
  )
}
