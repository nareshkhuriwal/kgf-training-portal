import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((s) => s.user);
  const [form, setForm] = useState({ email: "", password: "", device_name: "web" });
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/';

  console.log("Login page rendered. Current token:", token);

  useEffect(() => {
    if (token) navigate(redirectTo, { replace: true });
  }, [token, navigate, redirectTo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});
    const action = await dispatch(login(form));
    if (login.fulfilled.match(action)) {
      navigate(redirectTo, { replace: true });
    } else if (action.payload?.errors) {
      setServerErrors(action.payload.errors);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Email"
          type="email"
          value={form.email}
          error={serverErrors.email?.[0]}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          error={serverErrors.password?.[0]}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/register" className="text-brand underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

function Field({ label, error, ...rest }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      <input
        {...rest}
        className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-brand/30 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
