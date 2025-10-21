export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">Special offer — just hours to save!</h1>
          <p className="mt-4 text-white/90 max-w-xl">Your exclusive longtime-learner deal: courses from just ₹479 for a very limited time.</p>
        </div>
        <div className="rounded-xl bg-white/10 aspect-video" />
      </div>
    </section>
  )
}
