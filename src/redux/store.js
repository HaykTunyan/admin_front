import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import counterReducer from "./slices/counter";
import { newsSlice } from "./slices/newsSlice";
import { dashboardSlice } from "./slices/dashboardSlice";
import { transactionSlice } from "./slices/transactionSlice";
import { notificationSlice } from "./slices/notificationSlice";
import authReducer from "./slices/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice.reducer,
    counter: counterReducer,
    news: newsSlice.reducer,
    dashboard: dashboardSlice.reducer,
    transaction: transactionSlice.reducer,
    notification: notificationSlice.reducer,
  },
});
