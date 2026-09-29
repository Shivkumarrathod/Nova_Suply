import { Clock3, Minus, Plus } from 'lucide-react'

export function ProductCard({ product, index, quantity = 0, onAddToCart, onDecrease }) {
  return (
    <article className="product-card" style={{ '--accent': product.accent, '--delay': `${Math.min(index, 5) * 70}ms` }}>
      <div className="product-image-wrap">
        <span className="product-badge">{product.badge}</span>
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <span className="delivery-chip"><Clock3 size={11} /> 15 min</span>
        <h2>{product.name}</h2>
        <p className="product-size">{product.size} · {product.origin}</p>
        <p>{product.description}</p>
        <div className="product-buy-row"><strong>₹{product.price}</strong>{quantity > 0 ? <div className="quantity-control" aria-label={`${product.name} quantity`}>
          <button type="button" aria-label={`Decrease ${product.name} quantity`} onClick={() => onDecrease(product.id)}><Minus size={14} /></button>
          <strong aria-live="polite">{quantity}</strong>
          <button type="button" aria-label={`Increase ${product.name} quantity`} onClick={() => onAddToCart(product)}><Plus size={14} /></button>
        </div> : <button className="add-button" type="button" aria-label={`Add ${product.name} to cart`} onClick={() => onAddToCart(product)}><Plus size={15} /> Add</button>}</div>
      </div>
    </article>
  )
}