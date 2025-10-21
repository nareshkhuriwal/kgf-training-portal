// src/store/slices/categorySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchCategories = createAsyncThunk("cat/fetch", api.listCategories);
export const saveCategory = createAsyncThunk("cat/save", async (payload) => {
  return payload.id ? api.updateCategory(payload.id, payload) : api.createCategory(payload);
});
export const deleteCategory = createAsyncThunk("cat/delete", api.deleteCategory);

const slice = createSlice({
  name: "categories",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCategories.pending, (s) => { s.loading = true; s.error = null; });
    b.addCase(fetchCategories.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload.data ?? payload; });
    b.addCase(fetchCategories.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
    b.addCase(saveCategory.fulfilled, (s) => {/* refetch in page */});
    b.addCase(deleteCategory.fulfilled, (s) => {/* refetch in page */});
  }
});
export default slice.reducer;
