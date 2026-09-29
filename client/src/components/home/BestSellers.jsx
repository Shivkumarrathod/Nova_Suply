import { ArrowRight } from 'lucide-react'
import { ProductCard } from '../products/ProductCard'

export function BestSellers({ products, getProductQuantity, onAddToCart, onDecrease, onViewAll }) {
  return (
    <section className="featured-products" aria-labelledby="best-sellers-title">
      <div className="section-heading">
        <div><span>Popular near you</span><h2 id="best-sellers-title">Best sellers</h2></div>
        <button className="view-all-button" type="button" onClick={onViewAll}>View all products <ArrowRight size={18} /></button>
      </div>
      <div className="products products-featured">
        {products.slice(0, 5).map((product, index) => <ProductCard key={product.id} product={product} index={index} quantity={getProductQuantity(product.id)} onAddToCart={onAddToCart} onDecrease={onDecrease} />)}
      </div>
    </section>
  )
}