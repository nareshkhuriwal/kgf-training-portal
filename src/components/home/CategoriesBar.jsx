import { Link } from 'react-router-dom'

export default function CategoriesBar({ categories = [] }) {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex gap-6 overflow-x-auto">
        {categories.map(c => (
          <Link key={c.id} to={`/catalog/${c.id}`} className="text-sm whitespace-nowrap hover:text-brand">{c.name}</Link>
        ))}
      </div>
    </div>
  )
}
