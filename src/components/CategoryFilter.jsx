export default function CategoryFilter({ categories: items, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {items.map((item) => {
        const isActive = item === active
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-pressed={isActive}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'border-brand bg-brand text-cream shadow-card'
                : 'border-charcoal/15 bg-ivory text-charcoal hover:border-brand hover:text-brand'
            }`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}
