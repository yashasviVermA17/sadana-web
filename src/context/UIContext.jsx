import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [homeReveal, setHomeReveal] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const openSearch = useCallback(() => setSearchOpen(true), [])
  const closeSearch = useCallback(() => setSearchOpen(false), [])
  const openQuote = useCallback(() => setQuoteOpen(true), [])
  const closeQuote = useCallback(() => setQuoteOpen(false), [])
  const finishIntro = useCallback(() => setIntroDone(true), [])
  const startHomeReveal = useCallback(() => setHomeReveal(true), [])
  const openLightbox = useCallback(() => setLightboxOpen(true), [])
  const closeLightbox = useCallback(() => setLightboxOpen(false), [])

  useEffect(() => {
    setSearchOpen(false)
    setQuoteOpen(false)
    setLightboxOpen(false)
    setMobileMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = searchOpen || quoteOpen || mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchOpen, quoteOpen, mobileMenuOpen])

  return (
    <UIContext.Provider
      value={{
        searchOpen,
        openSearch,
        closeSearch,
        quoteOpen,
        openQuote,
        closeQuote,
        introDone,
        finishIntro,
        homeReveal,
        startHomeReveal,
        lightboxOpen,
        openLightbox,
        closeLightbox,
        mobileMenuOpen,
        setMobileMenuOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error('useUI must be used within UIProvider')
  return ctx
}
