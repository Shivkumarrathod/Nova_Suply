import { ArrowRight, ShoppingBag } from 'lucide-react'

export function FloatingCart({ itemCount, total, onOpen }) {
  return (
    <button className="floating-cart" type="button" aria-label={`Cart with ${itemCount} items`} onClick={onOpen}>
      <span className="floating-cart-icon"><ShoppingBag size={19} /></span>
      <span className="floating-cart-copy"><strong>{itemCount} {itemCount === 1 ? 'item' : 'items'}</strong><small>₹{total} subtotal</small></span>
      <span className="floating-cart-action">View cart <ArrowRight size={17} /></span>
    </button>
  )
}