import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import { navLinks } from '../data/site'
import { useUI } from '../context/UIContext'
import MobileMenu from './MobileMenu'
import logoImage from '../assets/logo 2.jpg'

function Logo({ onNavigate }) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      aria-label="Sadana Decor — Home"
      className="flex shrink-0 items-center"
    >
      <img
        data-header-logo
        src={logoImage}
        alt="Sadana Decor logo"
        className="h-[36px] w-auto rounded-[10px] sm:h-[40px]"
      />
    </Link>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const { openSearch, homeReveal, lightboxOpen } = useUI()
  const location = useLocation()

  function updateOverHero() {
    const hero = document.querySelector('[data-hero]')
    if (!hero) {
      setOverHero(false)
      return
    }
    const rect = hero.getBoundingClientRect()
    setOverHero(rect.top < 88 && rect.bottom > 88)
  }

  useEffect(() => {
    setMenuOpen(false)
    updateOverHero()
  }, [location.pathname])

  useEffect(() => {
    let frameId = null
    let ticking = false
    const update = () => {
      ticking = false
      updateOverHero()
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      frameId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,opacity] duration-300 ease-out ${
        lightboxOpen
          ? 'pointer-events-none bg-transparent opacity-0'
          : overHero
            ? 'bg-transparent'
            : 'border-b border-charcoal/10 bg-mist shadow-[0_12px_32px_-18px_rgba(39,38,36,0.35)]'
      } ${homeReveal ? 'nav-reveal' : ''}`}
    >
      <div className="mx-auto flex h-[88px] max-w-none items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <Logo onNavigate={() => setMenuOpen(false)} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-brand after:scale-x-100'
                    : overHero
                      ? 'text-cream/80 hover:text-cream after:scale-x-0 hover:after:scale-x-100'
                      : 'text-stone hover:text-charcoal after:scale-x-0 hover:after:scale-x-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Open search"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${
              overHero
                ? 'text-cream hover:bg-white/10 hover:text-cream'
                : 'text-charcoal hover:bg-brand-soft hover:text-brand'
            }`}
          >
            <Search className="h-[19px] w-[19px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 ${
              overHero
                ? 'text-cream hover:bg-white/10 hover:text-cream'
                : 'text-charcoal hover:bg-brand-soft hover:text-brand'
            } lg:hidden`}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
