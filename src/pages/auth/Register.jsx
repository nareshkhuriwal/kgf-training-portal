import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as registerThunk } from "../../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((s) => s.user);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "learner",
    device_name: "web",
  });
  const [serverErrors, setServerErrors] = useState({});

  useEffect(() => {
    if (token) navigate('/', { replace: true });
  }, [token, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerErrors({});
    const action = await dispatch(registerThunk(form));
    if (registerThunk.fulfilled.match(action)) {
      navigate('/', { replace: true });
    } else if (action.payload?.errors) {
      setServerErrors(action.payload.errors);
    }
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          label="Full name"
          value={form.name}
          error={serverErrors.name?.[0]}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <Field
          label="Confirm password"
          type="password"
          value={form.password_confirmation}
          error={serverErrors.password_confirmation?.[0]}
          onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-brand px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-brand underline">
          Log in
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
