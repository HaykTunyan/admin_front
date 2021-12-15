import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserDataSlice";
import counterReducer from "./slices/counter";
import authReducer from "./slices/auth";
import { newsSlice } from "./slices/newsSlice";
import { dashboardSlice } from "./slices/dashboardSlice";
import { transactionSlice } from "./slices/transactionSlice";
import { notificationSlice } from "./slices/notificationSlice";
import userListSlice from "./slices/userListSlice";
import { settingsSlice } from "./slices/settingsSlice";
import { referralSlice } from "./slices/referralSlice";
import { messageSlice } from "./slices/messageSlice";
import { deviceManagmentSlice } from "./slices/deviceManagmentSlice";
import userCard from "./slices/usersCardSlice";
import productsReducer, { getProducts } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authReducer,
    deviceManagment: deviceManagmentSlice.reducer,
    userData: userSlice.reducer,
    counter: counterReducer,
    news: newsSlice.reducer,
    dashboard: dashboardSlice.reducer,
    transaction: transactionSlice.reducer,
    notification: notificationSlice.reducer,
    settings: settingsSlice.reducer,
    referral: referralSlice.reducer,
    listUser: userListSlice,
    userCard: userCard,
    products: productsReducer,
  },
});
