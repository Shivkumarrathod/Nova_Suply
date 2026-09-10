import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  LogOut,
  MapPin,
  Package,
  PackageOpen,
  ReceiptText,
  ShoppingBag,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { products } from './data/products'

const loadDemoState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`nova-${key}`)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [user, setUser] = useState(() => loadDemoState('user', null))
  const [cart, setCart] = useState(() => loadDemoState('cart', []))
  const [orders, setOrders] = useState(() => loadDemoState('orders', []))
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('nova-user', JSON.stringify(user))
    localStorage.setItem('nova-cart', JSON.stringify(cart))
    localStorage.setItem('nova-orders', JSON.stringify(orders))
  }, [user, cart, orders])

  const cartTotal = cart.reduce((total, product) => total + product.price, 0)

  const addToCart = (product) => {
    if (!user) {
      setPendingProduct(product)
      setAuthOpen(true)
      return
    }
    setCart((items) => [...items, product])
  }

  const finishLogin = (method) => {
    setUser({ name: method === 'google' ? 'Alex Morgan' : 'Nova Member', phone: '+1 555 000 1234' })
    if (pendingProduct) setCart((items) => [...items, pendingProduct])
    setPendingProduct(null)
    setAuthOpen(false)
  }

  const openAccountPanel = (panel) => {
    setMenuOpen(false)
    setActivePanel(panel)
  }

  const checkout = () => {
    if (!user) {
      setAuthOpen(true)
      return
    }
    const order = {
      id: `NS-${Date.now().toString().slice(-6)}`,
      items: cart.length,
      total: cartTotal,
      date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
    }
    setOrders((current) => [order, ...current])
    setCart([])
    setCartOpen(false)
    setActivePanel('success')
  }

  const logout = () => {
    setUser(null)
    setCart([])
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <nav className="nav-actions" aria-label="Store navigation">
          <a className="nav-link" href="#products" aria-label="Products"><Package size={18} /><span>Products</span></a>
          <button className="icon-button" type="button" aria-label={`Cart with ${cart.length} items`} title="Cart" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={20} /><span className="cart-count">{cart.length}</span>
          </button>
          <div className={`profile-wrap ${menuOpen ? 'menu-open' : ''}`}>
            <button className="profile-button" type="button" aria-label={user ? `${user.name} profile` : 'Sign in'} aria-expanded={user ? menuOpen : undefined} onClick={() => user ? setMenuOpen((open) => !open) : setAuthOpen(true)}>
              <UserRound size={19} /><span>{user?.name ?? 'Sign in'}</span>{user && <ChevronDown size={14} />}
            </button>
            {user && <div className="profile-menu">
              <button type="button" onClick={() => openAccountPanel('profile')}><UserRound size={17} /> View profile</button>
              <button type="button" onClick={() => openAccountPanel('orders')}><ReceiptText size={17} /> Orders</button>
              <button type="button" onClick={() => openAccountPanel('addresses')}><MapPin size={17} /> Addresses</button>
              <button type="button" onClick={logout}><LogOut size={17} /> Logout</button>
            </div>}
          </div>
        </nav>
        <a className="wordmark" href="#top" aria-label="Nova Supply home">NOVA<span>SUPPLY</span></a>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="intro-title">
          <p className="kicker"><span /> Objects for modern rituals</p>
          <div className="intro-copy">
            <h1 id="intro-title">Less, but<br /><em>remarkable.</em></h1>
            <p>Three considered objects. Built with purpose, selected for the way they make everyday life feel.</p>
          </div>
          <a className="text-link" href="#products">Explore the collection <ArrowRight size={18} /></a>
        </section>

        <section className="products" id="products" aria-label="Featured products">
          {products.map((product, index) => (
            <article className="product-card" key={product.id} style={{ '--accent': product.accent, '--delay': `${index * 90}ms` }}>
              <div className="product-image-wrap">
                <span className="product-number">0{index + 1}</span>
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="add-button" type="button" onClick={() => addToCart(product)}>Add to cart <ArrowRight size={18} /></button>
              </div>
              <div className="product-info">
                <p className="eyebrow">{product.eyebrow}</p>
                <div className="product-title-row"><h2>{product.name}</h2><strong>${product.price}</strong></div>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer><span>NOVA SUPPLY / 2026</span><span>Designed for the everyday.</span></footer>

      {cartOpen && <>
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />
        <aside className="panel" aria-label="Shopping cart">
          <div className="panel-header"><div><p className="eyebrow">Your selection</p><h2>Cart ({cart.length})</h2></div><button className="close-button" type="button" aria-label="Close cart" onClick={() => setCartOpen(false)}><X size={20} /></button></div>
          {cart.length === 0 ? <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is waiting for something remarkable.</p></div> : <>
            {cart.map((product, index) => <div className="cart-line" key={`${product.id}-${index}`}>
              <img src={product.image} alt="" />
              <div><h3>{product.name}</h3><p>${product.price}</p></div>
              <button className="remove-button" type="button" aria-label={`Remove ${product.name}`} onClick={() => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={17} /></button>
            </div>)}
            <div className="cart-total"><span>Subtotal</span><strong>${cartTotal}</strong></div>
            <button className="primary-button" type="button" onClick={checkout}>Place demo order</button>
          </>}
        </aside>
      </>}

      {activePanel && <>
        <div className="drawer-backdrop" onClick={() => setActivePanel(null)} />
        <aside className="panel" aria-label={`${activePanel} panel`}>
          <div className="panel-header"><div><p className="eyebrow">Member space</p><h2>{activePanel === 'success' ? 'Order confirmed' : activePanel[0].toUpperCase() + activePanel.slice(1)}</h2></div><button className="close-button" type="button" aria-label="Close panel" onClick={() => setActivePanel(null)}><X size={20} /></button></div>
          {activePanel === 'profile' && <div className="account-card"><h3>{user?.name}</h3><p>{user?.phone}</p><p>Nova member since 2026</p></div>}
          {activePanel === 'addresses' && <div className="account-card"><h3>Primary address</h3><p>48 Market Street<br />San Francisco, CA 94105<br />United States</p><button className="google-button" type="button">Edit demo address</button></div>}
          {activePanel === 'orders' && (orders.length ? orders.map((order) => <div className="order-card" key={order.id}><div className="order-meta"><strong>{order.id}</strong><span>{order.date}</span></div><h3>{order.items} {order.items === 1 ? 'item' : 'items'}</h3><p>Total ${order.total} · Preparing</p></div>) : <div className="empty-state"><PackageOpen size={28} /><p>Your completed demo orders will appear here.</p></div>)}
          {activePanel === 'success' && <div><div className="success-mark"><Check size={28} /></div><p className="eyebrow">Demo order {orders[0]?.id}</p><h2>Thank you, {user?.name}.</h2><p>Your order is now visible in Orders. No payment was processed.</p><button className="primary-button" type="button" onClick={() => setActivePanel('orders')}>View orders</button></div>}
        </aside>
      </>}

      {authOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAuthOpen(false)}>
          <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="close-button" type="button" aria-label="Close sign in" onClick={() => setAuthOpen(false)}><X size={20} /></button>
            <p className="eyebrow">Member access</p>
            <h2 id="auth-title">Sign in to continue</h2>
            <p>{pendingProduct ? `${pendingProduct.name} is ready to join your cart.` : 'Access your profile, orders, and saved addresses.'}</p>
            <label htmlFor="phone">Phone number</label>
            <div className="phone-row"><span>+1</span><input id="phone" type="tel" placeholder="555 000 1234" autoFocus /></div>
            <button className="primary-button" type="button" onClick={() => finishLogin('phone')}>Continue with phone</button>
            <div className="divider"><span>or</span></div>
            <button className="google-button" type="button" onClick={() => finishLogin('google')}><b>G</b> Continue with Google</button>
            <small>Prototype only. No credentials are sent or stored.</small>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
