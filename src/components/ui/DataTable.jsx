// src/components/ui/DataTable.jsx
export default function DataTable({ columns, rows, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded border">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map(c => (
              <th key={c.key} className="px-3 py-2 text-left font-medium">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(r)}>
              {columns.map(c => (
                <td key={c.key} className="px-3 py-2">
                  {c.render ? c.render(r[c.key], r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
