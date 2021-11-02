import { createSlice } from "@reduxjs/toolkit";

export const referralSlice = createSlice({
  name: "referral",
  initialState: {
    referralRow: [
      {
        key: 0,
        name: "User One",
        link: "https://coin.com",
        reg_user: " 100",
        imp_user: " 50 ",
        big_price: " 10 000 ",
        all_coin: " 100 000 ",
      },
      {
        key: 1,
        name: "User Two",
        link: "https://coin.com",
        reg_user: " 100",
        imp_user: " 50 ",
        big_price: " 10 000 ",
        all_coin: " 100 000 ",
      },
      {
        key: 2,
        name: "User Three",
        link: "https://coin.com",
        reg_user: " 100",
        imp_user: " 50 ",
        big_price: " 10 000 ",
        all_coin: " 100 000 ",
      },
      {
        key: 3,
        name: "User Four",
        link: "https://coin.com",
        reg_user: " 100",
        imp_user: " 50 ",
        big_price: " 10 000 ",
        all_coin: " 100 000 ",
      },
      {
        key: 4,
        name: "User Five",
        link: "https://coin.com",
        reg_user: " 100",
        imp_user: " 50 ",
        big_price: " 10 000 ",
        all_coin: " 100 000 ",
      },
    ],
  },
  reducers: {},
  extraReducers: {},
});
export const userSelector = (state) => state.referral;
