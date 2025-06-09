import { configureStore } from "@reduxjs/toolkit";
import appReducer from "@/redux/app/appSlice";
import cartSlice from "@/redux/cart/cartSlice";
import userSlice from "@/redux/user/userSlice";
import { apiSlice } from "@/redux/apiSlice/apiSlice";
import { authApi } from "@/redux/authApi/authApi";
import { cartApi } from "@/redux/cartApi/cartApi";

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartSlice,
    user: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      authApi.middleware,
      cartApi.middleware
    ),
});

// Export types to use in the app
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; // <-- This is the RootState type
