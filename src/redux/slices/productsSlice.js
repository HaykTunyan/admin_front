// Product Slice.

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
};

const slice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setProducts(state, payload) {
      state.products = [];
    },
  },
});

export const { reducer } = slice;

export default slice;

export function getProducts() {
  return async (dispatch) => {
    const response = await axios.get("//api.beincrypto.org/api/admin/user/all");
    dispatch(slice.actions.setProducts(response.data));
  };
}
