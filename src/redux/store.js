import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
