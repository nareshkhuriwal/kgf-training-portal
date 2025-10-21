import Card from '../ui/Card.jsx'

export default function Carousel({ title, items = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button className="text-sm hover:text-brand">See all</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map(i => <Card key={i.id} item={i} />)}
      </div>
    </section>
  )
}
