import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import { newsSlice } from "./slices/newsSlice";
import { dashboardSlice } from "./slices/dashboardSlice";
import { notificationSlice } from "./slices/notificationSlice";
import userListSlice from "./slices/userListSlice";
import { referralSlice } from "./slices/referralSlice";
import { deviceManagmentSlice } from "./slices/deviceManagmentSlice";
import userCard from "./slices/usersCardSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    deviceManagment: deviceManagmentSlice.reducer,
    news: newsSlice.reducer,
    dashboard: dashboardSlice.reducer,
    notification: notificationSlice.reducer,
    referral: referralSlice.reducer,
    listUser: userListSlice,
    userCard: userCard,
    products: productsReducer,
  },
});
