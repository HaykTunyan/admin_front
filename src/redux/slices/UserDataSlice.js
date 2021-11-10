import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userData",
  initialState: {
    data: [],
    adminList: [
      {
        id: 0,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
      {
        id: 1,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
      {
        id: 2,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
      {
        id: 3,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
      {
        id: 4,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
      {
        id: 5,
        name: "Admin Name",
        email: "admin@email.com",
        type: "active",
      },
    ],
    submit: false,
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    // Extra reducer comes here
  },
});
export const userSelector = (state) => state.userData;
