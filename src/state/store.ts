import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./auth/userSlice";
import errorSlice from "./auth/errorSlice";
import productSlice from "./products/productSlice";

export const store = configureStore({
  reducer: {
    error: errorSlice,
    user: userSlice,
    products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
