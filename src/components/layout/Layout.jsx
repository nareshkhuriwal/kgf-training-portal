import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx"; // from the sidebar I shared

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const user = useSelector((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);

  // show sidebar only on /admin or /instructor routes (and only if logged in)
  const showSidebar = useMemo(() => {
    const isBackoffice =
      pathname.startsWith("/admin") || pathname.startsWith("/instructor");
    return !!user?.token && isBackoffice;
  }, [pathname, user?.token]);

  const role = user?.role || "instructor"; // default when role not loaded yet

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* CONTENT */}
      {showSidebar ? (
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="border-r bg-white">
            <div className="h-12 flex items-center justify-between px-3 border-b">
              <span className="text-sm font-medium">
                {collapsed ? "Menu" : role === "admin" ? "Admin" : "Instructor"}
              </span>
              <button
                onClick={() => setCollapsed((v) => !v)}
                className="text-xs rounded px-2 py-1 hover:bg-gray-100"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? "›" : "‹"}
              </button>
            </div>
            <Sidebar role={role} collapsed={collapsed} />
          </div>

          {/* Main area */}
          <main className="flex-1 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
          </main>
        </div>
      ) : (
        // public pages: no sidebar
        <main className="flex-1">
          <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        </main>
      )}

      <Footer />
    </div>
  );
}
