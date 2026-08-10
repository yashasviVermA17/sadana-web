import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingContact from './components/FloatingContact'
import IntroAnimation from './components/IntroAnimation'
import QuoteModal from './components/QuoteModal'
import SearchOverlay from './components/SearchOverlay'
import { UIProvider } from './context/UIContext'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <IntroAnimation />
      <Header />
      <main key={pathname} className={`page-enter ${pathname === '/' ? '' : 'pt-[68px]'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContact />
      <SearchOverlay />
      <QuoteModal />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <UIProvider>
        <ScrollToTop />
        <Layout />
      </UIProvider>
    </BrowserRouter>
  )
}
