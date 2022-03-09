import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../../services/api";

const initialState = {
  data: [],
  userListData: [],
};

const userListSlice = createSlice({
  name: "listUser",
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

export const getUserList_req = () => (dispatch) => {
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
