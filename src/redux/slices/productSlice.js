import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
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

export const { setProducts, setCategories, setLoading, setError } = productSlice.actions;

export default productSlice.reducer;
