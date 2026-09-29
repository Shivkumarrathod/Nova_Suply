import { CookingPot, Droplets, Milk, Sprout } from 'lucide-react'

const categories = [
  { name: 'Everyday oils', note: 'For daily cooking', icon: Droplets, tone: 'yellow' },
  { name: 'Cold pressed', note: 'Traditional extraction', icon: Sprout, tone: 'green' },
  { name: 'Pure ghee', note: 'Slow simmered', icon: Milk, tone: 'orange' },
  { name: 'High heat', note: 'Fry and saute', icon: CookingPot, tone: 'blue' },
]

export function CategoryShortcuts({ onSelect }) {
  return (
    <section className="category-shortcuts" aria-labelledby="categories-title">
      <div className="section-heading"><div><span>Shop by use</span><h2 id="categories-title">What are you cooking?</h2></div></div>
      <div className="shortcut-grid">
        {categories.map(({ name, note, icon: Icon, tone }) => (
          <button className={`shortcut shortcut-${tone}`} type="button" key={name} onClick={onSelect}>
            <span className="shortcut-icon"><Icon size={25} /></span><span><strong>{name}</strong><small>{note}</small></span>
          </button>
        ))}
      </div>
    </section>
  )
}