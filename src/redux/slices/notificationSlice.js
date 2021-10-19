import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationSlice: [
    {
      key: 0,
      name: "",
      messages: "",
      users: "",
      actions: "",
    },
  ],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    notification: [
      {
        key: 0,
        name: "",
        messages: "",
        users: "",
        actions: "",
      },
    ],
  },
});

export const { reducers } = notificationSlice;

export default notificationSlice;
