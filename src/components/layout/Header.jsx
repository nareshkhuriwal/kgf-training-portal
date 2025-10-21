// components/header/Header.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiSearch, FiBell, FiHeart, FiShoppingCart } from "react-icons/fi";
import ProfileMenu from "./ProfileMenu";
import LearningMenu from "./LearningMenu";

import { useEffect, useState } from "react";
import { fetchMe } from "../../store/slices/userSlice"; // <-- hydrate thunk
import logo from "../../assets/logo.png";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const cartCount = useSelector((s) => s.cart?.items?.length ?? 0);
  const wishlistCount = useSelector((s) => s.wishlist?.items?.length ?? 0);
  const notifications = useSelector((s) => s.notifications?.unread ?? 0);
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  // If we have a token but no user details yet, hydrate from /auth/me
  useEffect(() => {
    if (user?.token && !user?.name && !user?.loading) {
      dispatch(fetchMe());
    }
  }, [user?.token, user?.name, user?.loading, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="KGF logo"
            className="h-8 w-8 object-contain select-none"
            loading="eager"
            decoding="async"
          />
          <span className="text-xl font-bold tracking-tight">
            KGF <span className="text-brand">Training</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={submit} className="flex-1">
          <label className="group flex items-center gap-2 rounded-full border px-3 py-2 focus-within:ring-2 focus-within:ring-brand/30">
            <FiSearch className="opacity-60" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for anything"
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
              aria-label="Search"
            />
          </label>
        </form>

        {/* Top nav */}
        <nav className="hidden items-center gap-5 text-sm md:flex">
          <TopLink to="/catalog/development">Development</TopLink>
          <TopLink to="/catalog/it">IT &amp; Software</TopLink>
        </nav>

        {/* My learning dropdown */}
        <LearningMenu />

        {/* Actions */}
        <div className="flex items-center gap-3">
          <IconButton
            to="/wishlist"
            title="Wishlist"
            count={wishlistCount}
            icon={<FiHeart aria-hidden />}
          />
          <IconButton
            to="/cart"
            title="Cart"
            count={cartCount}
            icon={<FiShoppingCart aria-hidden />}
          />
          <IconButton
            to="/notifications"
            title="Notifications"
            count={notifications}
            icon={<FiBell aria-hidden />}
          />

          {/* Profile */}
          <ProfileMenu
            user={user}
            fallbackInitial={(user?.name || "U").slice(0, 1).toUpperCase()}
          />
        </div>
      </div>
    </header>
  );
}

function TopLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:text-brand ${isActive ? "text-brand font-medium" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}

function IconButton({ to, title, icon, count }) {
  return (
    <Link
      to={to}
      className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100"
      aria-label={title}
      title={title}
    >
      {icon}
      {!!count && (
        <span
          className="absolute -right-1 -top-1 rounded-full bg-brand px-1.5 text-[10px] font-semibold leading-4 text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
