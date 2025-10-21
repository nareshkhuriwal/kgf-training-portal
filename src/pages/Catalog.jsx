import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from '../components/ui/Card.jsx'

export default function Catalog() {
  const { id } = useParams()
  const { featured } = useSelector(s => s.courses)
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Catalog: {id}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.concat(featured).map((c, i) => <Card key={c.id+String(i)} item={c} />)}
      </div>
    </div>
  )
}
