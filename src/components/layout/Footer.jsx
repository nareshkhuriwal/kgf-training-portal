export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-[#1c1d1f] text-slate-100">
      <div className="mx-auto max-w-7xl px-4">
        {/* main grid */}
        <div className="grid gap-8 py-10 text-sm md:grid-cols-4 border-b border-white/10">
          <div>
            <div className="mb-3 font-semibold text-slate-200">Top categories</div>
            <ul className="space-y-1 text-slate-300">
              <li className="hover:text-slate-100">Data Science</li>
              <li className="hover:text-slate-100">Python</li>
              <li className="hover:text-slate-100">Azure ML</li>
              <li className="hover:text-slate-100">Power BI</li>
            </ul>
          </div>

          <div>
            <div className="mb-3 font-semibold text-slate-200">Resources</div>
            <ul className="space-y-1 text-slate-300">
              <li className="hover:text-slate-100">Blog</li>
              <li className="hover:text-slate-100">Help &amp; Support</li>
              <li className="hover:text-slate-100">Affiliate</li>
            </ul>
          </div>

          <div>
            <div className="mb-3 font-semibold text-slate-200">Company</div>
            <ul className="space-y-1 text-slate-300">
              <li className="hover:text-slate-100">About</li>
              <li className="hover:text-slate-100">Careers</li>
              <li className="hover:text-slate-100">Contact</li>
            </ul>
          </div>

          <div>
            <div className="text-2xl font-bold tracking-tight">
              KGF <span className="text-brand">Training</span>
            </div>
            <p className="mt-2 text-slate-400">
              Build in-demand skills with affordable, high-quality courses.
            </p>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-400 md:flex-row">
          <div className="font-semibold text-slate-300">
            KGF <span className="text-brand">Training</span>
          </div>
          <div>© {year} KGF Online Training</div>
        </div>
      </div>
    </footer>
  );
}
