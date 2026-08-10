import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumb({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-stone">
      <Link
        to="/"
        className={`flex items-center gap-1.5 transition-colors duration-300 ${
          light ? 'text-cream/70 hover:text-cream' : 'hover:text-brand'
        }`}
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        <span>Home</span>
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            <ChevronRight
              className={`h-4 w-4 ${light ? 'text-cream/30' : 'text-charcoal/25'}`}
              aria-hidden="true"
            />
            {item.to && !isLast ? (
              <Link to={item.to} className="transition-colors duration-300 hover:text-brand">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? (light ? 'font-medium text-cream' : 'font-medium text-charcoal') : ''}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
