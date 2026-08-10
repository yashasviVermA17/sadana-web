export default function ValueCard({ value, index, dark = false }) {
  return (
    <div
      className={`group flex h-full flex-col gap-3 rounded-card border p-6 transition-all duration-300 sm:p-7 ${
        dark
          ? 'border-white/12 bg-card hover:border-brand/60 hover:bg-white/[0.05]'
          : 'border-charcoal/10 bg-ivory hover:-translate-y-1 hover:border-brand/30 hover:shadow-card'
      }`}
    >
      <span className="font-serif text-sm text-brand">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className={`font-serif text-xl ${dark ? 'text-cream' : 'text-charcoal'}`}>
        {value.title}
      </h3>
      <p className={`text-sm leading-relaxed ${dark ? 'text-taupe' : 'text-stone'}`}>
        {value.text}
      </p>
    </div>
  )
}
