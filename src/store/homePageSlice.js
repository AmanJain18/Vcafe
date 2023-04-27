import { createSlice } from "@reduxjs/toolkit";

export const homePageSlice = createSlice({
  name: "homepage",
  initialState: {
    url: {},
    products: {},
    categories: {},
  },
  reducers: {
    getApiConfig: (state, action) => {
      state.url = action.payload;
    },
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfig, getProducts, getCategories } =
  homePageSlice.actions;

export default homePageSlice.reducer;
