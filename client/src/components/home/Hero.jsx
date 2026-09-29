import { ArrowRight, BadgeCheck, Clock3 } from 'lucide-react'

export function Hero({ onShopNow }) {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro-copy">
        <span className="offer-pill">Free delivery on your first order</span>
        <h1 id="intro-title">Kitchen essentials,<br /><em>at your door.</em></h1>
        <p>Cold-pressed oils, everyday staples, and traditional ghee delivered fresh from our pantry.</p>
        <button className="shop-now-button" type="button" onClick={onShopNow}>Shop all products <ArrowRight size={18} /></button>
        <div className="hero-promises"><span><Clock3 size={16} /> Fast delivery</span><span><BadgeCheck size={16} /> Quality checked</span></div>
      </div>
      <div className="hero-media"><img src="/products/olive-oil.jpg" alt="Olive oil with fresh kitchen ingredients" /><span>Freshly stocked<br /><strong>every morning</strong></span></div>
    </section>
  )
}