import { configureStore } from "@reduxjs/toolkit";

import homePageSlice from "./homePageSlice";
import cartSlice from "./CartSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    homepage: homePageSlice,
    cart: cartSlice,
  },
});
