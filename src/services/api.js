// services/api.js

// Read base once and strip any trailing slash (supports empty for same-origin).
const BASE_URL = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');

// --- Auth token helpers ------------------------------------------------------
export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (t) => (t ? localStorage.setItem('auth_token', t) : localStorage.removeItem('auth_token'));

// --- Utils -------------------------------------------------------------------
const isFormData = (v) => typeof FormData !== 'undefined' && v instanceof FormData;
const qs = (params = {}) => {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
  return entries.length ? `?${new URLSearchParams(entries).toString()}` : '';
};
const join = (path) => `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

// Build headers per request (skips JSON headers when sending FormData).
const buildHeaders = (body) => {
  const t = getToken();
  const h = {};
  if (!isFormData(body)) {
    h['Content-Type'] = 'application/json';
    h.Accept = 'application/json';
  }
  if (t) h.Authorization = `Bearer ${t}`;
  return h;
};

// Core requester
export async function request(path, { method = 'GET', body, params, signal, timeout = 15000 } = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(new Error('timeout')), timeout);

  try {
    const url = join(path) + qs(params);
    const res = await fetch(url, {
      method,
      headers: buildHeaders(body),
      body: isFormData(body) ? body : body ? JSON.stringify(body) : undefined,
      credentials: 'omit',
      signal: signal ?? ctrl.signal,
    });

    const ct = res.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await res.json() : await res.text();

    if (!res.ok) {
      const err = new Error((data && data.message) || `HTTP ${res.status}`);
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

// --- Public API --------------------------------------------------------------
export const api = {
  // Auth
  login:    (p) => request('/api/auth/login',    { method: 'POST', body: p }),
  register: (p) => request('/api/auth/register', { method: 'POST', body: p }),
  me:       ()  => request('/api/auth/me'), // <-- NEW
  // Catalog (read-only, public)
  catalog:  (params) => request('/api/catalog', { params }), // eg: {category, q, page}

  // Categories (admin)
  listCategories:  (params)        => request('/api/categories', { params }),
  getCategory:     (id)            => request(`/api/categories/${id}`),
  createCategory:  (body)          => request('/api/categories', { method: 'POST', body }),
  updateCategory:  (id, body)      => request(`/api/categories/${id}`, { method: 'PUT', body }),
  deleteCategory:  (id)            => request(`/api/categories/${id}`, { method: 'DELETE' }),

  // Courses (admin + instructor)
  listCourses:     (params)        => request('/api/courses', { params }), // supports ?mine=1, ?status=published, ?page=1
  getCourse:       (id)            => request(`/api/courses/${id}`),
  createCourse:    (body)          => request('/api/courses', { method: 'POST', body }),
  updateCourse:    (id, body)      => request(`/api/courses/${id}`, { method: 'PUT', body }),
  publishCourse:   (id)            => request(`/api/courses/${id}/publish`, { method: 'POST' }),

  // Optional media upload (thumbnail) — body should be FormData with 'file'
  uploadCourseMedia: (id, formData) => request(`/api/courses/${id}/media`, { method: 'POST', body: formData }),

  // Sections (nested under course)
  listSections:    (courseId)                  => request(`/api/courses/${courseId}/sections`),
  createSection:   (courseId, body)            => request(`/api/courses/${courseId}/sections`, { method: 'POST', body }),
  updateSection:   (courseId, id, body)        => request(`/api/courses/${courseId}/sections/${id}`, { method: 'PUT', body }),
  deleteSection:   (courseId, id)              => request(`/api/courses/${courseId}/sections/${id}`, { method: 'DELETE' }),

  // Lessons (nested under course + section)
  listLessons:     (courseId, sectionId)                 => request(`/api/courses/${courseId}/sections/${sectionId}/lessons`),
  getLesson:       (courseId, sectionId, id)             => request(`/api/courses/${courseId}/sections/${sectionId}/lessons/${id}`),
  createLesson:    (courseId, sectionId, body)           => request(`/api/courses/${courseId}/sections/${sectionId}/lessons`, { method: 'POST', body }),
  updateLesson:    (courseId, sectionId, id, body)       => request(`/api/courses/${courseId}/sections/${sectionId}/lessons/${id}`, { method: 'PUT', body }),
  deleteLesson:    (courseId, sectionId, id)             => request(`/api/courses/${courseId}/sections/${sectionId}/lessons/${id}`, { method: 'DELETE' }),
};

export default api;
