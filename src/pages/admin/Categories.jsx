// src/pages/admin/Categories.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/ui/DataTable.jsx";
import DrawerModal from "../../components/ui/DrawerModal.jsx";
import { fetchCategories, saveCategory, deleteCategory } from "../../store/slices/categorySlice";

export default function Categories() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(s => s.categories);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", is_active: 1, sort_order: 0 });

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const cols = [
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "slug", title: "Slug" },
    { key: "is_active", title: "Active", render: v => (v ? "Yes" : "No") },
    { key: "sort_order", title: "Sort" },
  ];

  const submit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(saveCategory(form));
    if (saveCategory.fulfilled.match(ok)) {
      setOpen(false); setForm({ name:"", slug:"", is_active:1, sort_order:0 });
      dispatch(fetchCategories());
    }
  };

  return (
    <div>
      <div className="mb-3 flex justify-between">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button className="rounded bg-brand px-3 py-2 text-white" onClick={() => setOpen(true)}>New Category</button>
      </div>

      <DataTable columns={cols} rows={items} onRowClick={(r) => { setForm(r); setOpen(true); }} />
      {loading && <p className="mt-3 text-sm">Loading…</p>}

      <DrawerModal open={open} onClose={()=>setOpen(false)} title={form.id ? "Edit Category" : "New Category"}
        footer={
          <div className="flex justify-between">
            {form.id && (
              <button className="rounded border px-3 py-2"
                onClick={async ()=>{ await dispatch(deleteCategory(form.id)); setOpen(false); dispatch(fetchCategories()); }}>
                Delete
              </button>
            )}
            <button className="rounded bg-brand px-3 py-2 text-white" onClick={submit}>Save</button>
          </div>
        }>
        <div className="space-y-3">
          <Field label="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
          <Field label="Slug" value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})}/>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={!!form.is_active} onChange={e=>setForm({...form,is_active:e.target.checked?1:0})}/>
            <span>Active</span>
          </label>
          <Field label="Sort order" type="number" value={form.sort_order}
                 onChange={e=>setForm({...form,sort_order:Number(e.target.value)})}/>
        </div>
      </DrawerModal>
    </div>
  );
}

function Field({ label, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm">{label}</span>
      <input {...rest} className="w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30"/>
    </label>
  );
}
