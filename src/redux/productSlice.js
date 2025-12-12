import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { signal, rejectWithValue }) => {
    try {
      const controller = new AbortController();

      // If Redux aborts the thunk, abort fetch
      signal.addEventListener("abort", () => controller.abort());

      const res = await fetch("/api/products", {
        signal: controller.signal,
      });

      if (!res.ok) {
        return rejectWithValue("Failed to fetch products");
      }

      return await res.json();
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("Request cancelled");
      }
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },

  reducers: {
    resetProducts(state) {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        // prevent UI jitter when refetching
        if (state.products.length === 0) {
          state.status = "loading";
        }
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload || [];
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
