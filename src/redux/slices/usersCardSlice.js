import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { instance } from "../../services/api";

const initialState = {
  data: [],
  userListData: [],
  flexibleData: [
    {
      key: 1,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: false,
    },
    {
      key: 2,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: true,
    },
    {
      key: 3,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: false,
    },
    {
      key: 4,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: true,
    },
    {
      key: 4,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: true,
    },
    {
      key: 5,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: true,
    },
    {
      key: 6,
      coin: "BIT",
      total_balance: "0.58",
      total_time: "20/08/20",
      accounring_interest: "0.001",
      aveilible_interest: "0.001",
      redeeming: "0.001",
      cumulative_interest: "0.001",
      apy: "0.001",
      operation: false,
    },
  ],
  lockedData: [
    {
      key: 1,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: true,
      status: false,
    },
    {
      key: 2,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: false,
      status: true,
    },
    {
      key: 3,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: true,
      status: true,
    },
    {
      key: 4,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: false,
      status: true,
    },
    {
      key: 5,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: true,
      status: false,
    },
    {
      key: 6,
      coin: "BIT",
      amount_data: "0.581",
      total_time: "20/08/20",
      annaulized_rate: "21.31",
      duretion_day: "30",
      subscription_progress: "30.80",
      ra_saving: true,
      status: false,
    },
  ],
};

const userListSlice = createSlice({
  name: "usersCard",
  initialState,
  reducers: {
    setProducts(state, payload) {
      state.products = [];
    },
    success: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const { reducer, success } = userListSlice.actions;

export const getFlexibleList_req = () => (dispatch) => {
  return instance
    .get("/admin/user/all", { mode: "no-cors" })
    .then(async (data) => {
      console.log("data users list", data);
      // dispatch({ type: USER_LIST, payload: { data } });
      dispatch(await success(data));

      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    .finally(() => {
      // dispatch({ type: USER_LIST, payload: false });
    });
};
export default userListSlice.reducer;
