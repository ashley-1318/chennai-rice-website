import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CartProvider } from './shop/hooks/useCart.jsx'
import { WishlistProvider } from './shop/hooks/useWishlist.jsx'
import { CookieConsentProvider } from './hooks/useCookieConsent.jsx'
import './shop/styles/styles.scoped.css'
import './styles/shop-bridge.css'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import RiceCursor from './components/RiceCursor.jsx'
import SoruKutty from './components/chatbot/SoruKutty.jsx'
import CookieBanner from './components/CookieBanner.jsx'

import HomePage from './pages/HomePage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import BulkOrderPage from './pages/BulkOrderPage.jsx'
import ProductsPage from './shop/pages/ProductsPage.jsx'
import ProductDetailPage from './shop/pages/ProductDetailPage.jsx'
import AboutPage from './shop/pages/AboutPage.jsx'
import CartPage from './shop/pages/CartPage.jsx'
import WishlistPage from './shop/pages/WishlistPage.jsx'
import InfrastructurePage from './pages/infrastructure/InfrastructurePage.jsx'

/* Routes that exist in the navigation and footer but whose copy is still
   being written. Listed here so no link in the footer ever 404s. */
const PLACEHOLDER_PAGES = [
  { path: '/our-team', title: 'Our Team', blurb: 'Profiles of the people who run the mill are being put together and will appear here shortly.' },
  { path: '/careers', title: 'Careers', blurb: 'Open roles across our mills, logistics and sales will be listed here. Write to us in the meantime and we will keep your details on file.' },
  { path: '/quality', title: 'Quality', blurb: 'Our sorting, grading and testing process is being documented and will be published here shortly.' },
  { path: '/packaging', title: 'Packaging', blurb: 'Pack sizes, materials and our move to recyclable packaging are being written up for this page.' },
  { path: '/recipes', title: 'Recipes', blurb: 'Family recipes for biryani, pongal, idli and more are being collected and will be shared here.' },
  { path: '/blog', title: 'Blogs', blurb: 'Notes from the mill, the fields and the kitchen are on their way to this page.' },
  { path: '/csr', title: 'CSR', blurb: 'Our work with farming families and the community around Erode is being written up for this page.' },
  { path: '/downloads', title: 'Downloads', blurb: 'Product sheets, certifications and trade catalogues will be available to download here.' },
  { path: '/faqs', title: 'FAQs', blurb: 'Answers to the questions we are asked most about storage, cooking and ordering are being compiled.' },
  { path: '/track-order', title: 'Track Order', blurb: 'Order tracking will live here once our ordering system is connected.' },
  { path: '/terms', title: 'Terms & Conditions', blurb: 'Our trading terms are being finalised with our legal team and will be published here shortly.' },
  { path: '/privacy', title: 'Privacy Policy', blurb: 'How we handle the details you share with us is being written up and will appear here shortly.' },
  { path: '/shipping', title: 'Shipping & Delivery', blurb: 'Dispatch timelines, delivery areas and freight terms are on their way to this page.' },
  { path: '/refund', title: 'Refund Policy', blurb: 'Our returns and refund process is being documented and will be published here shortly.' },
]

/** Client routing keeps scroll position between pages; always open at the top. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CookieConsentProvider>
    <CartProvider>
      <WishlistProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/bulk-order" element={<BulkOrderPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/infrastructure" element={<InfrastructurePage />} />
        {PLACEHOLDER_PAGES.map(page => (
          <Route
            key={page.path}
            path={page.path}
            element={<ComingSoonPage title={page.title} blurb={page.blurb} />}
          />
        ))}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        {/* legacy deep links from the product-page repo */}
        <Route path="/index.html" element={<Navigate to="/products" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/cart.html" element={<Navigate to="/cart" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <RiceCursor />
      <SoruKutty />
      <CookieBanner />
      </WishlistProvider>
    </CartProvider>
    </CookieConsentProvider>
  )
}
