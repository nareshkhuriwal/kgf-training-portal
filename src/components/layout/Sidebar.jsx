import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { getMenusForRole } from "./Menus";

export default function Sidebar({ role = "instructor", collapsed = false }) {
  const menu = useMemo(() => getMenusForRole(role), [role]);
  return (
    <aside
      className={`h-[calc(100vh-56px)] border-r bg-white ${collapsed ? "w-16" : "w-72"} transition-all`}
    >
      <nav className="p-2">
        {menu.map((item, idx) =>
          item.children ? (
            <Group key={idx} item={item} collapsed={collapsed} />
          ) : (
            <Item key={idx} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
          )
        )}
      </nav>
    </aside>
  );
}

function Group({ item, collapsed }) {
  const [open, setOpen] = useState(true);
  const Icon = item.icon;
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50"
      >
        {Icon && <Icon size={18} className="shrink-0" />}
        {!collapsed && (
          <>
            <span className="text-sm font-medium">{item.label}</span>
            <ChevronDown
              size={16}
              className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>
      {open && !collapsed && (
        <div className="ml-8 mt-1 space-y-1">
          {item.children.map((c, i) => (
            <Item key={i} to={c.to} icon={c.icon} label={c.label} size="sm" />
          ))}
        </div>
      )}
    </div>
  );
}

function Item({ to, icon: Icon, label, size = "md", collapsed = false }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-2 py-2 hover:bg-gray-50 ${
          isActive ? "bg-gray-100 text-brand font-medium" : "text-gray-700"
        }`
      }
      end
    >
      {Icon && <Icon size={18} className="shrink-0" />}
      {!collapsed && <span className={`${size === "sm" ? "text-sm" : ""}`}>{label}</span>}
    </NavLink>
  );
}
