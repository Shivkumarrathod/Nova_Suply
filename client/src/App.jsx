import { useEffect, useState } from 'react'
import { AccountPanel } from './components/account/AccountPanel'
import { AuthDialog } from './components/auth/AuthDialog'
import { CartDrawer } from './components/cart/CartDrawer'
import { FloatingCart } from './components/cart/FloatingCart'
import { Hero } from './components/home/Hero'
import { BestSellers } from './components/home/BestSellers'
import { CategoryShortcuts } from './components/home/CategoryShortcuts'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { ProductsPage } from './components/products/ProductsPage'
import { products } from './data/products'
import { useStorefront } from './hooks/useStorefront'

function App() {
  const store = useStorefront()
  const [page, setPage] = useState(() => window.location.pathname === '/products' ? 'products' : 'home')

  useEffect(() => {
    const handlePopState = () => setPage(window.location.pathname === '/products' ? 'products' : 'home')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = (nextPage) => {
    const path = nextPage === 'products' ? '/products' : '/'
    window.history.pushState({}, '', path)
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openAccountPanel = (panel) => {
    store.setMenuOpen(false)
    store.setActivePanel(panel)
  }

  return (
    <div className="site-shell">
      <Header
        user={store.user}
        menuOpen={store.menuOpen}
        serverOnline={store.serverOnline}
        onHome={() => navigate('home')}
        onProducts={() => navigate('products')}
        onAuthOpen={() => store.setAuthOpen(true)}
        onMenuToggle={() => store.setMenuOpen((open) => !open)}
        onPanelOpen={openAccountPanel}
        onLogout={store.logout}
      />

      <main id="top">
        {page === 'home' ? <><Hero onShopNow={() => navigate('products')} /><CategoryShortcuts onSelect={() => navigate('products')} /><BestSellers products={products} getProductQuantity={store.getProductQuantity} onAddToCart={store.addToCart} onDecrease={store.decrementProduct} onViewAll={() => navigate('products')} /></> : <ProductsPage products={products} getProductQuantity={store.getProductQuantity} onAddToCart={store.addToCart} onDecrease={store.decrementProduct} onBack={() => navigate('home')} />}
      </main>

      <Footer />

      {store.cart.length > 0 && !store.cartOpen && <FloatingCart itemCount={store.cart.length} total={store.cartTotal} onOpen={() => store.setCartOpen(true)} />}
      {store.cartOpen && <CartDrawer cart={store.cart} total={store.cartTotal} onClose={() => store.setCartOpen(false)} onRemove={store.removeCartItem} onCheckout={store.checkout} />}
      {store.activePanel && <AccountPanel type={store.activePanel} user={store.user} orders={store.orders} onClose={() => store.setActivePanel(null)} onNavigate={store.setActivePanel} onShowOrders={() => store.setActivePanel('orders')} />}
      {store.authOpen && <AuthDialog pendingProduct={store.pendingProduct} onClose={() => store.setAuthOpen(false)} onLogin={store.finishLogin} />}
    </div>
  )
}

export default App