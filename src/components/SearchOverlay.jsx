import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { products, categories } from '../data/products'
import { projects } from '../data/projects'
import { useUI } from '../context/UIContext'

function ResultRow({ type, title, subtitle, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 rounded-xl px-4 py-3 text-left transition-colors duration-200 hover:bg-mist"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-charcoal">{title}</span>
        {subtitle && <span className="block truncate text-xs text-stone">{subtitle}</span>}
      </span>
      <span className="flex shrink-0 items-center gap-2">
        <span className="rounded-full border border-charcoal/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone">
          {type}
        </span>
        <ArrowUpRight
          className="h-4 w-4 text-charcoal/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          aria-hidden="true"
        />
      </span>
    </button>
  )
}

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (searchOpen) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
    return undefined
  }, [searchOpen])

  useEffect(() => {
    if (!searchOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen, closeSearch])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { products: [], projects: [], categories: [] }
    return {
      products: products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.short.toLowerCase().includes(q),
        )
        .slice(0, 6),
      projects: projects
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.short.toLowerCase().includes(q),
        )
        .slice(0, 6),
      categories: categories.filter((c) => c.toLowerCase().includes(q)).slice(0, 4),
    }
  }, [query])

  const go = (to) => {
    closeSearch()
    navigate(to)
  }

  const hasResults =
    results.products.length > 0 || results.projects.length > 0 || results.categories.length > 0

  if (!searchOpen) return null

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search">
      <div
        className="overlay-anim absolute inset-0 bg-charcoal/35 backdrop-blur-[2px]"
        onClick={closeSearch}
        aria-hidden="true"
      />

      <div className="modal-anim relative mx-auto mt-0 max-w-2xl px-4 pt-4 sm:pt-8">
        <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory shadow-soft">
          <div className="flex items-center gap-3 border-b border-charcoal/10 px-5 py-4">
            <Search className="h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, projects, materials..."
              className="w-full bg-transparent text-base text-charcoal outline-none placeholder:text-stone/70"
              type="text"
            />
            <button
              type="button"
              onClick={closeSearch}
              aria-label="Close search"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-stone transition-colors duration-200 hover:bg-mist hover:text-charcoal"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-2 py-3">
            {!query.trim() ? (
              <p className="px-4 py-8 text-center text-sm text-stone">
                Search products, projects, materials and categories across Sadana
                Decor.
              </p>
            ) : !hasResults ? (
              <p className="px-4 py-8 text-center text-sm text-stone">
                No results for “{query}”. Try “panels”, “blinds” or “alabaster”.
              </p>
            ) : (
              <div className="space-y-4">
                {results.products.length > 0 && (
                  <div>
                    <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone">
                      Products
                    </p>
                    <div>
                      {results.products.map((p) => (
                        <ResultRow
                          key={p.id}
                          type="Product"
                          title={p.name}
                          subtitle={`${p.category} — ${p.short}`}
                          onClick={() => go(`/products/${p.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {results.projects.length > 0 && (
                  <div>
                    <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone">
                      Projects
                    </p>
                    <div>
                      {results.projects.map((p) => (
                        <ResultRow
                          key={p.id}
                          type="Project"
                          title={p.title}
                          subtitle={p.category}
                          onClick={() => go(`/projects/${p.id}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {results.categories.length > 0 && (
                  <div>
                    <p className="px-4 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone">
                      Categories
                    </p>
                    <div>
                      {results.categories.map((c) => (
                        <ResultRow
                          key={c}
                          type="Category"
                          title={c}
                          subtitle="View products in this category"
                          onClick={() => go(`/products?category=${encodeURIComponent(c)}`)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
