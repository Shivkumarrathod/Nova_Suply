import { ChevronDown, Clock3, LogOut, MapPin, Package, ReceiptText, Search, UserRound } from 'lucide-react'

export function Header({ user, menuOpen, serverOnline, onHome, onProducts, onAuthOpen, onMenuToggle, onPanelOpen, onLogout }) {
  return (
    <header className="site-header">
      <nav className="nav-actions" aria-label="Store navigation">
        <div className="delivery-location"><Clock3 size={17} /><span><strong>Delivery in 15 mins</strong><small><MapPin size={11} /> Market Street, San Francisco</small></span></div>
        <button className="header-search" type="button" onClick={onProducts}><Search size={18} /><span>Search oils, ghee and more</span></button>
        <button className="nav-link" type="button" aria-label="Products" onClick={onProducts}><Package size={18} /><span>Products</span></button>
        <div className={`profile-wrap ${menuOpen ? 'menu-open' : ''}`}>
          <button className="profile-button" type="button" aria-label={user ? `${user.name} profile` : 'Sign in'} aria-expanded={user ? menuOpen : undefined} onClick={user ? onMenuToggle : onAuthOpen}>
            <UserRound size={19} /><span>{user?.name ?? 'Sign in'}</span>{user && <ChevronDown size={14} />}
          </button>
          {user && <div className="profile-menu">
            <button type="button" onClick={() => onPanelOpen('profile')}><UserRound size={17} /> View profile</button>
            <button type="button" onClick={() => onPanelOpen('orders')}><ReceiptText size={17} /> Orders</button>
            <button type="button" onClick={() => onPanelOpen('addresses')}><MapPin size={17} /> Addresses</button>
            <button type="button" onClick={onLogout}><LogOut size={17} /> Logout</button>
          </div>}
        </div>
      </nav>
      <button className="wordmark" type="button" aria-label="Nova Oils home" onClick={onHome}>
        NOVA<span>OILS</span>
        <span className={`server-status ${serverOnline ? 'is-online' : 'is-offline'}`} title={serverOnline ? 'Server OK' : 'Server error'} role="img" aria-label={serverOnline ? 'Server OK' : 'Server error'} />
      </button>
    </header>
  )
}