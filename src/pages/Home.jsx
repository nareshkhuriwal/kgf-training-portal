import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomepage } from '../store/slices/courseSlice.js'
import Hero from '../components/home/Hero.jsx'
import CategoriesBar from '../components/home/CategoriesBar.jsx'
import Carousel from '../components/home/Carousel.jsx'

export default function Home() {
  const dispatch = useDispatch()

  // Use the key that exists in the store: "course" (not "courses")
  // Also provide safe fallbacks so it won't crash if undefined during init/hot-reload.
  const {
    categories = [],
    featured = [],
    recommended = [],
    status = 'idle',
    error = null,
  } = useSelector((s) => s.course ?? {})

  useEffect(() => {
    if (status === 'idle') dispatch(fetchHomepage())
  }, [status, dispatch])

  if (status === 'loading') return <div className="p-6">Loading…</div>
  if (status === 'failed') return <div className="p-6 text-red-600">Failed: {error || 'Something went wrong'}</div>

  return (
    <div>
      <Hero />
      <CategoriesBar categories={categories} />
      <Carousel title="Let's start learning" items={featured} />
      <Carousel title="Recommended for you" items={recommended} />
    </div>
  )
}
