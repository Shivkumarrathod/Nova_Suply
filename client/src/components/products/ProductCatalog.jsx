import { useState } from 'react'
import { Search } from 'lucide-react'
import { productCategories } from '../../data/products'
import { ProductCard } from './ProductCard'

export function ProductCatalog({ products, getProductQuantity, onAddToCart, onDecrease }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesQuery = !normalizedQuery || `${product.name} ${product.description} ${product.origin}`.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })

  return (
    <section className="catalog" id="products" aria-labelledby="catalog-title">
      <div className="catalog-heading">
        <div><p className="eyebrow">Our pantry</p><h2 id="catalog-title">All products</h2></div>
        <p>{visibleProducts.length} of {products.length} products</p>
      </div>
      <div className="catalog-tools">
        <div className="category-tabs" aria-label="Product categories">
          {productCategories.map((item) => <button className={category === item ? 'is-active' : ''} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <label className="search-field"><Search size={18} /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search oils and ghee" /></label>
      </div>
      {visibleProducts.length ? <div className="products">
        {visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} quantity={getProductQuantity(product.id)} onAddToCart={onAddToCart} onDecrease={onDecrease} />)}
      </div> : <div className="empty-state"><p>No products match your search.</p></div>}
    </section>
  )
}