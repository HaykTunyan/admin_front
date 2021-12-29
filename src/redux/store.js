import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import userListSlice from "./slices/userListSlice";
import { deviceManagmentSlice } from "./slices/deviceManagmentSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deviceManagment: deviceManagmentSlice.reducer,
    // API SLice.
    listUser: userListSlice,
    products: productsReducer.reducer,
  },
});
