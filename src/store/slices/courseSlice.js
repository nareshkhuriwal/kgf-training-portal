// src/store/slices/coursesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../services/api'

// ---------- Thunks ----------

// Home page (catalog: categories + featured)
export const fetchHomepage = createAsyncThunk('courses/home', async (params, { rejectWithValue }) => {
  try {
    const res = await api.catalog(params) // GET /api/catalog
    return res
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

// Courses
export const fetchCourses = createAsyncThunk('courses/list', async (params, { rejectWithValue }) => {
  try {
    const res = await api.listCourses(params) // GET /api/courses
    return res
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const getCourse = createAsyncThunk('courses/get', async (id, { rejectWithValue }) => {
  try {
    const res = await api.getCourse(id) // GET /api/courses/:id
    return res
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const saveCourse = createAsyncThunk('courses/save', async (payload, { rejectWithValue }) => {
  try {
    if (payload.id) return await api.updateCourse(payload.id, payload) // PUT
    return await api.createCourse(payload) // POST
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const publishCourse = createAsyncThunk('courses/publish', async (id, { rejectWithValue }) => {
  try {
    return await api.publishCourse(id) // POST /publish
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

// Sections
export const fetchSections = createAsyncThunk('sections/list', async (courseId, { rejectWithValue }) => {
  try {
    return await api.listSections(courseId)
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const saveSection = createAsyncThunk('sections/save', async ({ courseId, ...data }, { rejectWithValue }) => {
  try {
    if (data.id) return await api.updateSection(courseId, data.id, data)
    return await api.createSection(courseId, data)
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const deleteSection = createAsyncThunk('sections/delete', async ({ courseId, id }, { rejectWithValue }) => {
  try {
    return await api.deleteSection(courseId, id)
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

// Lessons
export const fetchLessons = createAsyncThunk('lessons/list', async ({ courseId, sectionId }, { rejectWithValue }) => {
  try {
    const res = await api.listLessons(courseId, sectionId)
    return { courseId, sectionId, data: res }
  } catch (e) {
    return rejectWithValue(e.data || { message: e.message })
  }
})

export const saveLessonssss = createAsyncThunk(
  'lessons/save',
  async ({ courseId, sectionId, ...data }, { rejectWithValue }) => {
    try {
      if (data.id) return await api.updateLesson(courseId, sectionId, data.id, data)
      return await api.createLesson(courseId, sectionId, data)
    } catch (e) {
      return rejectWithValue(e.data || { message: e.message })
    }
  }
)

// thunk: send the whole payload in body (no URL params)
export const saveLesson = createAsyncThunk(
  'lessons/save',
  async (payload, { rejectWithValue }) => {
    try {
      // payload = { id?, courseId, sectionId, title, ... }
      if (payload.id) {
        return await api.updateLesson(payload); // PUT with body only
      }
      return await api.createLesson(payload);   // POST with body only
    } catch (e) {
      return rejectWithValue(e.data || { message: e.message });
    }
  }
);


export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async ({ courseId, sectionId, id }, { rejectWithValue }) => {
    try {
      return await api.deleteLesson(courseId, sectionId, id)
    } catch (e) {
      return rejectWithValue(e.data || { message: e.message })
    }
  }
)

// ---------- Slice ----------

const initialState = {
  // homepage
  categories: [],
  featured: [],
  recommended: [],

  // admin/instructor
  list: [],
  current: null,
  sections: [],
  // lessons keyed by "courseId:sectionId" => []
  lessons: {},

  // status/errors
  status: 'idle',
  loading: false,
  error: null,
}

const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Home
    builder
      .addCase(fetchHomepage.pending, (s) => { s.status = 'loading' })
      .addCase(fetchHomepage.fulfilled, (s, a) => {
        s.status = 'succeeded'
        s.categories = a.payload.categories ?? []
        s.featured = a.payload.featured ?? []
        s.recommended = a.payload.recommended ?? []
      })
      .addCase(fetchHomepage.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload?.message || a.error.message })

    // Courses list
    builder
      .addCase(fetchCourses.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchCourses.fulfilled, (s, a) => {
        s.loading = false
        s.list = a.payload.data ?? a.payload
      })
      .addCase(fetchCourses.rejected, (s, a) => {
        s.loading = false; s.error = a.payload?.message || a.error.message
      })

    // Get/Save/Publish course
    builder
      .addCase(getCourse.pending, (s) => { s.loading = true; s.error = null })
      .addCase(getCourse.fulfilled, (s, a) => {
        s.loading = false
        s.current = a.payload.data ?? a.payload
      })
      .addCase(getCourse.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || a.error.message })

    builder
      .addCase(saveCourse.pending, (s) => { s.loading = true; s.error = null })
      .addCase(saveCourse.fulfilled, (s, a) => {
        s.loading = false
        const saved = a.payload.data ?? a.payload
        s.current = saved
        // Optimistically update list if present
        if (saved?.id) {
          const idx = s.list.findIndex((c) => c.id === saved.id)
          if (idx >= 0) s.list[idx] = saved
          else s.list.unshift(saved)
        }
      })
      .addCase(saveCourse.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || a.error.message })

    builder
      .addCase(publishCourse.fulfilled, (s, a) => {
        const updated = a.payload.data ?? a.payload
        s.current = { ...(s.current || {}), ...updated }
        const idx = s.list.findIndex((c) => c.id === updated.id)
        if (idx >= 0) s.list[idx] = { ...s.list[idx], ...updated }
      })

    // Sections
    builder
      .addCase(fetchSections.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchSections.fulfilled, (s, a) => {
        s.loading = false
        s.sections = a.payload.data ?? a.payload
      })
      .addCase(fetchSections.rejected, (s, a) => { s.loading = false; s.error = a.payload?.message || a.error.message })

    builder
      .addCase(saveSection.fulfilled, (s) => { /* refresh happens in page after thunk resolves */ })
      .addCase(deleteSection.fulfilled, (s) => { /* refresh happens in page after thunk resolves */ })

    // Lessons
    builder
      .addCase(fetchLessons.fulfilled, (s, a) => {
        const { courseId, sectionId, data } = a.payload
        s.lessons[`${courseId}:${sectionId}`] = data.data ?? data
      })
      .addCase(saveLesson.fulfilled, (s) => { /* page will refetch */ })
      .addCase(deleteLesson.fulfilled, (s) => { /* page will refetch */ })
  },
})

export default slice.reducer
