import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: null,
    data: null,
    isAdmin: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.data = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.data = null;
    },
    isValid(state, action) {
      state.isLoggedIn = action.payload.valid;
      state.data = action.payload.data;
      state.isAdmin = action.payload.isAdmin;
    },
    isAdmin(state, action) {
      state.isAdmin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, isValid, isAdmin } = authSlice.actions;

export default authSlice.reducer;
