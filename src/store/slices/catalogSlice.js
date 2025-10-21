// src/store/slices/catalogSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
export const fetchCatalog = createAsyncThunk("catalog/fetch", api.getCatalog);
const slice = createSlice({
  name: "catalog",
  initialState: { categories: [], featured: [], loading: false, error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchCatalog.pending, (s)=>{s.loading=true; s.error=null;});
    b.addCase(fetchCatalog.fulfilled, (s,{payload})=>{
      s.loading=false;
      s.categories = payload.categories ?? [];
      s.featured = payload.featured ?? [];
    });
    b.addCase(fetchCatalog.rejected, (s,a)=>{s.loading=false; s.error=a.error.message;});
  }
});
export default slice.reducer;
