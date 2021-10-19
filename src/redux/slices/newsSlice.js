import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [
      {
        key: 1,
        name: "News one",
        description: "Lorem Ipsum",
        change: false,
      },
    ],
  },
  reducers: {},
  extraReducers: {},
});
export const userSelector = (state) => state.news;
