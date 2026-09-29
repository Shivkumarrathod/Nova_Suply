import { CalendarDays, Check, ChevronRight, Clock3, Mail, MapPin, PackageCheck, PackageOpen, Pencil, Phone, ShieldCheck, Truck, X } from 'lucide-react'

export function AccountPanel({ type, user, orders, onClose, onNavigate, onShowOrders }) {
  const title = type === 'success' ? 'Order confirmed' : type[0].toUpperCase() + type.slice(1)
  return <>
    <div className="drawer-backdrop" onClick={onClose} />
    <aside className="panel" aria-label={`${type} panel`}>
      <div className="panel-header"><div><p className="eyebrow">Member space</p><h2>{title}</h2></div><button className="close-button" type="button" aria-label="Close panel" onClick={onClose}><X size={20} /></button></div>
      {type === 'profile' && <div className="profile-overview">
        <div className="profile-identity">
          <span className="profile-avatar">{user?.name?.charAt(0) ?? 'N'}</span>
          <div><span className="member-label"><ShieldCheck size={13} /> Verified member</span><h3>{user?.name}</h3><p>Nova Oils member since 2026</p></div>
        </div>
        <div className="profile-stats">
          <div><strong>{orders.length}</strong><span>Orders</span></div>
          <div><strong>1</strong><span>Saved address</span></div>
        </div>
        <section className="profile-section" aria-labelledby="contact-title">
          <h4 id="contact-title">Contact details</h4>
          <div className="contact-row"><span><Phone size={17} /></span><div><small>Phone number</small><strong>{user?.phone}</strong></div><ShieldCheck className="verified-icon" size={16} /></div>
          <div className="contact-row"><span><Mail size={17} /></span><div><small>Email</small><strong>member@novaoils.demo</strong></div></div>
        </section>
        <section className="profile-section" aria-labelledby="account-links-title">
          <h4 id="account-links-title">Your account</h4>
          <button className="profile-link" type="button" onClick={() => onNavigate('orders')}><span><PackageOpen size={18} /> Order history</span><ChevronRight size={17} /></button>
          <button className="profile-link" type="button" onClick={() => onNavigate('addresses')}><span><MapPin size={18} /> Saved addresses</span><ChevronRight size={17} /></button>
        </section>
      </div>}
      {type === 'addresses' && <div className="address-overview">
        <div className="address-summary"><span><MapPin size={20} /></span><div><strong>1 saved address</strong><p>Used for faster checkout and delivery estimates.</p></div></div>
        <section className="address-card" aria-labelledby="primary-address-title">
          <div className="address-card-header"><div><span className="address-icon"><MapPin size={18} /></span><div><span className="default-badge">Default</span><h3 id="primary-address-title">Primary address</h3></div></div><button type="button" aria-label="Edit primary address"><Pencil size={16} /></button></div>
          <p>48 Market Street<br />San Francisco, CA 94105<br />United States</p>
          <div className="address-delivery"><Truck size={17} /><span><strong>15 minute delivery</strong><small>Available at this address</small></span></div>
        </section>
        <button className="secondary-action" type="button"><MapPin size={17} /> Add another address</button>
      </div>}
      {type === 'orders' && (orders.length ? <div className="orders-list">{orders.map((order) => <article className="order-card" key={order.id}>
        <div className="order-card-header"><span className="order-icon"><PackageCheck size={20} /></span><div><span className="order-status"><Clock3 size={12} /> Preparing</span><h3>{order.id}</h3></div></div>
        <div className="order-details"><span><CalendarDays size={15} /> {order.date}</span><span><PackageOpen size={15} /> {order.items} {order.items === 1 ? 'item' : 'items'}</span></div>
        <div className="order-total"><span>Order total</span><strong>₹{order.total}</strong></div>
      </article>)}</div> : <div className="empty-state account-empty"><span><PackageOpen size={28} /></span><h3>No orders yet</h3><p>Your completed demo orders will appear here.</p></div>)}
      {type === 'success' && <div className="order-success"><div className="success-mark"><Check size={28} /></div><p className="eyebrow">Demo order {orders[0]?.id}</p><h2>Thank you, {user?.name}.</h2><p>Your order is confirmed and is now being prepared.</p><div className="success-detail"><Clock3 size={19} /><span><strong>Arriving in about 15 minutes</strong><small>No payment was processed for this demo.</small></span></div><button className="primary-button" type="button" onClick={onShowOrders}>View orders</button></div>}
    </aside>
  </>
}