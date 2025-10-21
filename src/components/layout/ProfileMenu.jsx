import { Link } from "react-router-dom";
import { FiLogOut, FiSettings, FiBookmark, FiUser, FiCreditCard, FiGlobe, FiMessageSquare, FiStar, FiShoppingCart, FiBarChart2, FiGift } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

export default function ProfileMenu({ user, fallbackInitial = "U" }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);


  console.log("ProfileMenu rendered. User:", user, "Open:", open);

  // Close on click outside
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (menuRef.current?.contains(e.target) || btnRef.current?.contains(e.target)) return;
      setOpen(false);
    }
    function onEsc(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const avatar = (
    <div
      className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white"
      aria-hidden
    >
      {(user?.avatarUrl && <img src={user.avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />) || fallbackInitial}
    </div>
  );

  // Guest view
  if (!user?.id) {
    return (
      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="rounded-full ring-offset-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
        >
          {avatar}
        </button>

        {open && (
          <div
            ref={menuRef}
            role="menu"
            className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border bg-white shadow-xl"
          >
            <div className="px-4 py-3">
              <p className="text-sm text-gray-500">Welcome to KGF Training</p>
            </div>
            <div className="border-t p-2">
              <MenuItem to="/login" icon={<FiUser />}>Log in</MenuItem>
              <MenuItem to="/register" icon={<FiStar />}>Sign up</MenuItem>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="rounded-full ring-offset-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand/40"
      >
        {avatar}
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border bg-white shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-brand text-center leading-10 text-white">
              {fallbackInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Primary quick actions */}
          <div className="grid grid-cols-2 gap-2 border-y p-3 text-sm">
            <Quick to="/my-learning" icon={<FiBookmark />}>My learning</Quick>
            <Quick to="/cart" icon={<FiShoppingCart />}>My cart</Quick>
            <Quick to="/wishlist" icon={<FiStar />}>Wishlist</Quick>
            <Quick to="/instructor" icon={<FiBarChart2 />}>Instructor dashboard</Quick>
          </div>

          {/* Menu */}
          <div className="p-2 text-sm">
            <MenuItem to="/notifications" icon={<Badge count={user.notifications ?? 0} />}>
              Notifications
            </MenuItem>
            <MenuItem to="/messages" icon={<FiMessageSquare />}>
              Messages <span className="ml-auto text-xs text-gray-500">{user.messages ?? 0}</span>
            </MenuItem>
            <MenuItem to="/account" icon={<FiSettings />}>Account settings</MenuItem>
            <MenuItem to="/billing" icon={<FiCreditCard />}>Payment methods</MenuItem>
            <MenuItem to="/subscriptions" icon={<FiGift />}>Subscriptions</MenuItem>
            <MenuItem to="/credits" icon={<FiGift />}>KGF credits</MenuItem>
            <MenuItem to="/orders" icon={<FiShoppingCart />}>Purchase history</MenuItem>
            <MenuItem to="/language" icon={<FiGlobe />}>Language</MenuItem>
            <MenuItem to={`/u/${user.username || user.id}`} icon={<FiUser />}>Public profile</MenuItem>
          </div>

          {/* Footer */}
          <div className="border-t p-2">
            <MenuItem to="/auth/logout" icon={<FiLogOut />} onClick={(e)=>e.preventDefault()} >
              Log out
            </MenuItem>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItem({ to, icon, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      role="menuitem"
      className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
    >
      <span className="grid h-8 w-8 place-items-center rounded-md bg-gray-100 text-gray-700">
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </Link>
  );
}

function Quick({ to, icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:border-brand/60 hover:bg-brand/5"
    >
      <span className="grid h-6 w-6 place-items-center">{icon}</span>
      <span className="truncate">{children}</span>
    </Link>
  );
}

function Badge({ count }) {
  const c = Number(count || 0);
  return (
    <span className="relative grid h-8 w-8 place-items-center rounded-md bg-gray-100 text-gray-700">
      <FiMessageSquare aria-hidden />
      {c > 0 && (
        <span className="absolute -right-1 -top-1 rounded-full bg-brand px-1.5 text-[10px] font-semibold leading-4 text-white">
          {c > 99 ? "99+" : c}
        </span>
      )}
    </span>
  );
}
