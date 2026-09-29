import { useEffect, useState } from 'react'

const loadDemoState = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`nova-${key}`)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function useStorefront() {
  const [user, setUser] = useState(() => loadDemoState('user', null))
  const [cart, setCart] = useState(() => loadDemoState('cart', []))
  const [orders, setOrders] = useState(() => loadDemoState('orders', []))
  const [authOpen, setAuthOpen] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [serverOnline, setServerOnline] = useState(false)

  useEffect(() => {
    localStorage.setItem('nova-user', JSON.stringify(user))
    localStorage.setItem('nova-cart', JSON.stringify(cart))
    localStorage.setItem('nova-orders', JSON.stringify(orders))
  }, [user, cart, orders])

  useEffect(() => {
    let isMounted = true
    const checkServerHealth = async () => {
      try {
        const response = await fetch('/api/health')
        if (isMounted) setServerOnline(response.ok)
      } catch {
        if (isMounted) setServerOnline(false)
      }
    }
    checkServerHealth()
    const intervalId = window.setInterval(checkServerHealth, 10000)
    return () => {
      isMounted = false
      window.clearInterval(intervalId)
    }
  }, [])

  const cartTotal = cart.reduce((total, product) => total + product.price, 0)
  const getProductQuantity = (productId) => cart.filter((product) => product.id === productId).length

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

  return {
    user, cart, orders, authOpen, pendingProduct, cartOpen, activePanel, menuOpen, serverOnline, cartTotal,
    addToCart, finishLogin, checkout, logout, getProductQuantity,
    decrementProduct: (productId) => setCart((items) => {
      const itemIndex = items.findLastIndex((product) => product.id === productId)
      return itemIndex === -1 ? items : items.filter((_, index) => index !== itemIndex)
    }),
    removeCartItem: (index) => setCart((items) => items.filter((_, itemIndex) => itemIndex !== index)),
    setAuthOpen, setCartOpen, setActivePanel, setMenuOpen,
  }
}