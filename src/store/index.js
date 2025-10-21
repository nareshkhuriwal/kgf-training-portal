import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice.js'
import userReducer from './slices/userSlice.js'

// src/store/index.js (add these reducers)
import categories from './slices/categorySlice.js'
import catalog from './slices/catalogSlice.js'
import course from './slices/courseSlice.js'


const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    categories: categories,
    catalog: catalog,
    course: course,
  },
  devTools: true,
})
export default store
