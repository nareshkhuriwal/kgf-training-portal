import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { showSearch: false },
  reducers: {
    toggleSearch: s => { s.showSearch = !s.showSearch }
  }
})

export const { toggleSearch } = uiSlice.actions
export default uiSlice.reducer
