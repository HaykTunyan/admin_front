import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
  name: "listUser",
  initialState: {
    listData: [] ,
    affiliateList: [],
    isSuccess: false,
    errorMessage: "",
    userInfo: {
      email : "admin@elsteam.com",
      password : "test321",
      role : 1,
      name : "Admin"
    },
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    // Extra reducer comes here
  },
});
export const userSelector = (state) => state.listUser;
