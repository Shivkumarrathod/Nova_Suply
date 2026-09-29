import { Clock3, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react'

export function CartDrawer({ cart, total, onClose, onRemove, onCheckout }) {
  return <>
    <div className="drawer-backdrop" onClick={onClose} />
    <aside className="panel" aria-label="Shopping cart">
      <div className="panel-header"><div><p className="eyebrow">Your selection</p><h2>Cart <span className="panel-count">{cart.length}</span></h2></div><button className="close-button" type="button" aria-label="Close cart" onClick={onClose}><X size={20} /></button></div>
      {cart.length === 0 ? <div className="empty-state"><ShoppingBag size={28} /><p>Your cart is ready for a pantry essential.</p></div> : <>
        <div className="delivery-banner"><span><Clock3 size={18} /></span><div><strong>Delivery in 15 minutes</strong><small>From your nearby Nova Oils store</small></div></div>
        <section className="cart-section" aria-label="Cart items">
          <h3>Items in your cart</h3>
          {cart.map((product, index) => <div className="cart-line" key={`${product.id}-${index}`}>
            <img src={product.image} alt="" /><div><h4>{product.name}</h4><p>{product.size}</p><strong>₹{product.price}</strong></div>
            <button className="remove-button" type="button" aria-label={`Remove ${product.name}`} onClick={() => onRemove(index)}><Trash2 size={16} /></button>
          </div>)}
        </section>
        <section className="bill-summary" aria-labelledby="bill-title">
          <h3 id="bill-title">Bill details</h3>
          <div><span>Item subtotal</span><span>₹{total}</span></div>
          <div><span>Delivery fee</span><strong>Free</strong></div>
          <div className="bill-total"><strong>To pay</strong><strong>₹{total}</strong></div>
        </section>
        <button className="primary-button" type="button" onClick={onCheckout}>Place demo order</button>
        <p className="checkout-note"><ShieldCheck size={14} /> Demo checkout · No payment will be processed</p>
      </>}
    </aside>
  </>
}