import { useEffect } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from 'react-router-dom'
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
import { getProduct } from './data/products'
import { getProductShopSlug, getShopCategoryBySlug } from './data/filters'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import ProjectGroupDetail from './pages/ProjectGroupDetail'
import { getProjectImageGroup } from './data/imageGroups'
import About from './pages/About'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function ProductPage() {
  const { slug } = useParams()

  if (slug) {
    const category = getShopCategoryBySlug(slug)
    if (category)
      return <Products key={category.slug} activeCategorySlug={category.slug} />

    const product = getProduct(slug)
    if (product) {
      const shopSlug = getProductShopSlug(product)
      return shopSlug ? (
        <Navigate to={`/products/${shopSlug}/${product.id}`} replace />
      ) : (
        <ProductDetail productId={product.id} />
      )
    }
  }

  return <Products key="all" activeCategorySlug={null} />
}

function ProductDetailRoute() {
  const { productId } = useParams()
  return <ProductDetail productId={productId} />
}

function ProjectDetailRoute() {
  const { id } = useParams()

  if (getProjectImageGroup(id)) return <ProjectGroupDetail />
  return <ProjectDetail />
}

function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <IntroAnimation />
      <Header />
      <main key={pathname} className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/products/:slug/:productId" element={<ProductDetailRoute />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetailRoute />} />
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
