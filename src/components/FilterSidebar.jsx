import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import { FILTER_GROUPS, countActiveFilters } from '../data/filters'

function CategoryLink({ to, active, children, onClose }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClose}
        aria-current={active ? 'page' : undefined}
        className="group flex cursor-pointer items-center gap-3 py-1"
      >
        <span
          aria-hidden="true"
          className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-[1.5px] transition-all duration-200 ${
            active ? 'border-brand bg-brand' : 'border-brand/50 group-hover:border-brand'
          }`}
        >
          <span
            className={`h-[6px] w-[6px] rounded-full bg-cream transition-opacity duration-200 ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </span>
        <span
          className={`text-sm transition-colors duration-200 ${
            active ? 'font-medium text-charcoal' : 'text-stone group-hover:text-charcoal'
          }`}
        >
          {children}
        </span>
      </Link>
    </li>
  )
}

function FilterPanel({ categories, activeCategorySlug, filters, onToggle, onClear, onClose }) {
  const activeCount = countActiveFilters(filters)

  return (
    <div>
      {categories && categories.length > 0 && (
        <section className="pb-7">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
            Categories
          </h3>
          <ul className="mt-4 space-y-1.5">
            <CategoryLink
              to="/products"
              onClose={onClose}
              active={!activeCategorySlug}
            >
              All Products
            </CategoryLink>
            {categories.map((cat) => (
              <CategoryLink
                key={cat.slug}
                to={`/products/${cat.slug}`}
                onClose={onClose}
                active={cat.slug === activeCategorySlug}
              >
                {cat.name}
              </CategoryLink>
            ))}
          </ul>
        </section>
      )}

      {FILTER_GROUPS.filter((g) => g.key !== 'category').map((group, i) => (
        <section
          key={group.key}
          className={
            categories && categories.length > 0
              ? 'mt-8 border-t border-charcoal/10 pt-7'
              : i === 0
                ? 'pt-1'
                : 'mt-8 border-t border-charcoal/10 pt-7'
          }
        >
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
            {group.title}
          </h3>
          <ul className="mt-4 space-y-3.5">
            {group.options.map((option) => {
              const checked = (filters[group.key] || []).includes(option.label)
              return (
                <li key={option.label}>
                  <label className="group flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(group.key, option.label)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-[1.5px] transition-all duration-200 ${
                        checked ? 'border-brand bg-brand' : 'border-brand/50 group-hover:border-brand'
                      }`}
                    >
                      <Check
                        className={`h-[10px] w-[10px] text-cream transition-opacity duration-200 ${
                          checked ? 'opacity-100' : 'opacity-0'
                        }`}
                        strokeWidth={3.5}
                      />
                    </span>
                    <span
                      className={`text-sm transition-colors duration-200 ${
                        checked ? 'font-medium text-charcoal' : 'text-stone group-hover:text-charcoal'
                      }`}
                    >
                      {option.label}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </section>
      ))}

    </div>
  )
}

export default function FilterSidebar({
  categories,
  activeCategorySlug,
  filters,
  onToggle,
  onClear,
  open,
  onClose,
}) {
  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <>
      <aside className="hidden w-[230px] shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-card border border-charcoal/10 bg-white px-5 py-6 lg:py-7">
          <FilterPanel
            categories={categories}
            activeCategorySlug={activeCategorySlug}
            filters={filters}
            onToggle={onToggle}
            onClear={onClear}
            onClose={onClose}
          />
        </div>
      </aside>

      {createPortal(
        <div
          className={`fixed inset-0 z-[60] lg:hidden ${open ? '' : 'pointer-events-none'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Product filters"
        >
          <div
            className={`absolute inset-0 bg-charcoal/35 backdrop-blur-[2px] transition-opacity duration-300 ${
              open ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className={`absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col bg-white shadow-soft transition-transform duration-300 ease-out ${
              open ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal">
                Filters
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full text-stone transition-colors duration-200 hover:bg-mist hover:text-charcoal"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6">
              <FilterPanel
                categories={categories}
                activeCategorySlug={activeCategorySlug}
                filters={filters}
                onToggle={onToggle}
                onClear={onClear}
                onClose={onClose}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}
