// src/components/ui/DrawerModal.jsx
export default function DrawerModal({ open, title, onClose, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div className="w-full max-w-xl bg-white h-full shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded px-2 py-1 hover:bg-gray-100">✕</button>
        </div>
        <div className="p-4">{children}</div>
        {footer && <div className="border-t p-3">{footer}</div>}
      </div>
    </div>
  );
}
