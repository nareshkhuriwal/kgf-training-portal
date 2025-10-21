import { Link } from 'react-router-dom'

export default function Card({ item }) {
  return (
    <Link to={`/course/${item.id}`} className="block border rounded-md overflow-hidden hover:shadow-sm bg-white">
      <div className="aspect-video bg-gray-100" />
      <div className="p-3">
        <div className="font-semibold line-clamp-2">{item.title}</div>
        <div className="text-xs opacity-70 mt-1">{item.author || 'KGF Instructor'}</div>
        <div className="text-sm mt-2 font-semibold">₹{item.price}</div>
      </div>
    </Link>
  )
}
