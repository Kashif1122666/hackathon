// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./feature/user/userSlice.js"; // keep your user slice
import userReducer from "./features/user/userSlice.js"; // keep your user slice
import cartReducer from "./features/cart/cartSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});
