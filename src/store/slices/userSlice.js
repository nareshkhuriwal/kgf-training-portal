// store/slices/userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const login = createAsyncThunk('user/login', async (payload, { rejectWithValue }) => {
  try {
    return await api.login(payload);
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message });
  }
});

export const register = createAsyncThunk('user/register', async (payload, { rejectWithValue }) => {
  try {
    return await api.register(payload);
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message });
  }
});

// NEW: hydrate from token
export const fetchMe = createAsyncThunk('user/me', async (_, { rejectWithValue }) => {
  try {
    return await api.me();
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message, status: e.status });
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  localStorage.removeItem('auth_token');
  return true;
});

const initialToken = localStorage.getItem('auth_token');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    email: null,
    role: null,
    token: initialToken || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(login.fulfilled, (s, { payload }) => {
      s.loading = false;
      s.error = null;
      s.token = payload.token;
      if (payload.token) localStorage.setItem('auth_token', payload.token);
      // user details may or may not come with login; keep as is and let fetchMe populate.
      const u = payload?.data || payload?.data?.user;
      if (u) {
        s.id = u.id; s.name = u.name; s.email = u.email; s.role = u.role ?? 'learner';
      }
    });
    builder.addCase(login.rejected, (s, { payload }) => {
      s.loading = false; s.error = payload?.message || 'Login failed';
    });

    // REGISTER
    builder.addCase(register.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(register.fulfilled, (s, { payload }) => {
      s.loading = false; s.error = null;
      s.token = payload.token;
      if (payload.token) localStorage.setItem('auth_token', payload.token);
      const u = payload?.data || payload?.data?.user;
      if (u) {
        s.id = u.id; s.name = u.name; s.email = u.email; s.role = u.role ?? 'learner';
      }
    });
    builder.addCase(register.rejected, (s, { payload }) => {
      s.loading = false; s.error = payload?.message || 'Registration failed';
    });

    // FETCH ME
    builder.addCase(fetchMe.pending, (s) => { s.loading = true; s.error = null; });
    builder.addCase(fetchMe.fulfilled, (s, { payload }) => {
      s.loading = false; s.error = null;
      const u = payload?.data || payload;
      if (u) {
        s.id = u.id; s.name = u.name; s.email = u.email; s.role = u.role ?? s.role ?? 'learner';
      }
    });
    builder.addCase(fetchMe.rejected, (s, { payload }) => {
      s.loading = false;
      // If token invalid, drop it so UI shows logged-out state
      if (payload?.status === 401) {
        s.id = s.name = s.email = s.role = null;
        s.token = null;
        localStorage.removeItem('auth_token');
      } else {
        s.error = payload?.message || 'Could not load profile';
      }
    });

    // LOGOUT
    builder.addCase(logout.fulfilled, (s) => {
      s.id = s.name = s.email = s.role = null;
      s.token = null;
      s.error = null;
      s.loading = false;
    });
  },
});

export default userSlice.reducer;
