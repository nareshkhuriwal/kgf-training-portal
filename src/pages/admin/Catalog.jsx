// src/pages/admin/Catalog.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalog } from "../../store/slices/catalogSlice";

export default function Catalog() {
  const dispatch = useDispatch();
  const { categories, featured, loading } = useSelector(s => s.catalog);
  useEffect(()=>{ dispatch(fetchCatalog()); },[dispatch]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 text-lg font-semibold">Featured courses</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(c => (
            <div key={c.id} className="rounded border p-3">
              <div className="font-medium">{c.title}</div>
              <div className="text-xs opacity-70">{c.language} • {c.level}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Categories</h2>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map(cat => (
            <div key={cat.id} className="rounded border p-3">
              <div className="font-medium">{cat.name}</div>
              <div className="text-xs opacity-70">{cat.slug}</div>
            </div>
          ))}
        </div>
      </section>

      {loading && <p className="text-sm">Loading…</p>}
    </div>
  );
}
