import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// OPTIONAL: if you have a thunk to fetch learning list, import & dispatch it
// import { fetchMyLearning } from "../../store/slices/coursesSlice";

export default function LearningMenu() {
  const dispatch = useDispatch();
  // Expect shape: state.courses.myLearning = [{id, slug, title, thumb, progress}]
  const items = useSelector((s) => s.courses?.myLearning ?? []);
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

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

  // Load when opened (optional)
  useEffect(() => {
    if (open) {
      // dispatch(fetchMyLearning());
    }
  }, [open, dispatch]);

  return (
    <div className="relative hidden md:block">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`rounded-full px-3 py-2 text-sm font-medium hover:bg-gray-100 ${open ? "bg-gray-100" : ""}`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        My learning
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          className="absolute right-0 mt-2 w-[420px] overflow-hidden rounded-2xl border bg-white shadow-xl"
        >
          {items.length === 0 ? (
            <div className="px-4 py-6 text-sm text-gray-600">
              You haven’t started any courses yet.
              <Link to="/catalog" className="ml-2 text-brand underline">Browse courses</Link>
            </div>
          ) : (
            <>
              <ul className="max-h-[70vh] overflow-auto">
                {items.slice(0, 6).map((c) => (
                  <li key={c.id} className="border-b last:border-0">
                    <Link
                      to={`/course/${c.slug || c.id}`}
                      className="flex gap-3 px-3 py-3 hover:bg-gray-50"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      <img
                        src={c.thumb || "/placeholder-course.jpg"}
                        alt=""
                        className="h-16 w-24 flex-none rounded-md object-cover bg-gray-100"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{c.title}</p>
                        <div className="mt-2">
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                              className="h-full bg-brand"
                              style={{ width: `${Math.min(Math.max(c.progress ?? 0, 0), 100)}%` }}
                            />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Start learning</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t p-2">
                <Link
                  to="/my-learning"
                  className="block rounded-lg px-3 py-2 text-center text-sm font-medium hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  Go to My learning
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
