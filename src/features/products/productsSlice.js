import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'An error occurred while fetching products'
      );
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    retryCount: 0,
  },
  reducers: {
    resetError: (state) => {
      state.error = null;
      state.status = 'idle';
    },
    incrementRetryCount: (state) => {
      state.retryCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
        state.retryCount = 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
        // If we've tried less than 3 times, we'll show a retry button
        if (state.retryCount >= 3) {
          state.error = 'Maximum retry attempts reached. Please try again later.';
        }
      });
  },
});

export const { resetError, incrementRetryCount } = productsSlice.actions;
export default productsSlice.reducer; 