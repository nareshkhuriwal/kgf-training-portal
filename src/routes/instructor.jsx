// src/routes/instructor.jsx
import { Outlet, NavLink } from "react-router-dom";

export default function InstructorLayout() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Instructor</h1>
      <nav className="mb-6 flex gap-4 text-sm">
        <Top to="/instructor/courses">My Courses</Top>
      </nav>
      <Outlet />
    </div>
  );
}
function Top({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded px-3 py-1 hover:bg-gray-100 ${isActive ? "bg-gray-100" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
