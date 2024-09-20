import { createSlice } from '@reduxjs/toolkit';
import api from '../config/api'; // Servis importi

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setLoading, setError } = categorySlice.actions;

export default categorySlice.reducer;
;
