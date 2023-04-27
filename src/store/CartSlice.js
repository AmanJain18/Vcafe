import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload._id);
      if (!item) {
        state.cartItems.push({
          ...action.payload,
          qty: 1,
          TolalPrice: action.payload.price,
        });
      } else {
        item.qty++;
        item.TolalPrice = item.qty * item.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload._id);
      if (item) {
        item.qty++;
        item.TolalPrice = item.qty * item.price;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload._id);
      if (item.qty === 1) {
        state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
        toast.success("Product removed from cart");
      } else {
        item.qty--;
        item.TolalPrice = item.qty * item.price;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((x) => x._id === action.payload._id);
      // if (item.qty === 1) {
      state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
      // } else {
      //   item.qty--;
      //   item.TolalPrice = item.qty * item.price;
      // }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, decreaseQty, increaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
