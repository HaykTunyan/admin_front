import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: [],
    submit: false,
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    // Extra reducer comes here
  },
});
export const userSelector = (state) => state.user;
