import { ArrowLeft } from 'lucide-react'
import { ProductCatalog } from './ProductCatalog'

export function ProductsPage({ products, getProductQuantity, onAddToCart, onDecrease, onBack }) {
  return (
    <div className="products-page">
      <div className="products-page-intro">
        <button className="back-button" type="button" onClick={onBack}><ArrowLeft size={17} /> Home</button>
        <p className="kicker"><span /> The complete pantry</p>
        <h1>Oils for every<br /><em>kind of cooking.</em></h1>
        <p>Browse everyday staples, cold-pressed oils, and traditional ghee. Filter by type or search for exactly what your kitchen needs.</p>
      </div>
      <ProductCatalog products={products} getProductQuantity={getProductQuantity} onAddToCart={onAddToCart} onDecrease={onDecrease} />
    </div>
  )
}