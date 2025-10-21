import { useParams, Link } from 'react-router-dom'

export default function Course() {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">Course #{id}</h1>
          <p className="mt-2 text-sm opacity-70">By KGF Instructor • 12.5 total hours • Updated 2025</p>
          <div className="mt-6 aspect-video bg-gray-100 rounded-md" />
          <div className="mt-6 prose max-w-none">
            <h2>What you'll learn</h2>
            <ul>
              <li>Hands-on projects</li><li>Real datasets</li><li>Deployments on Azure</li>
            </ul>
          </div>
        </div>
        <aside className="border rounded-md p-4 h-fit sticky top-4">
          <div className="text-3xl font-black">₹499</div>
          <button className="mt-4 w-full bg-brand text-white rounded-md py-2 font-semibold">Add to cart</button>
          <Link to="/" className="block text-center mt-2 text-sm underline">Back to Home</Link>
        </aside>
      </div>
    </div>
  )
}
