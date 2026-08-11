import { NavLink } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { navLinks } from '../data/site'
import { useUI } from '../context/UIContext'
import Button from './Button'

export default function MobileMenu({ open, onClose }) {
  const { openSearch, openQuote } = useUI()

  return (
    <div
      className={`fixed inset-x-0 top-[88px] z-40 origin-top border-b border-charcoal/10 bg-ivory transition-all duration-300 lg:hidden ${
        open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      <nav className="mx-auto flex max-w-none flex-col gap-1 px-5 py-6" aria-label="Mobile navigation">
        {navLinks.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            style={{ transitionDelay: `${i * 30}ms` }}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3.5 font-serif text-lg transition-colors duration-300 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              } ${
                isActive
                  ? 'bg-brand-soft text-brand'
                  : 'text-charcoal hover:bg-linen hover:text-brand'
              }`
            }
          >
            {link.label}
            <ArrowRight className="h-4 w-4 opacity-40" aria-hidden="true" />
          </NavLink>
        ))}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => {
              onClose()
              openSearch()
            }}
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Button>
          <Button
            onClick={() => {
              onClose()
              openQuote()
            }}
          >
            Get Quote
          </Button>
        </div>
      </nav>
    </div>
  )
}
