import {
  TRANSACTION_EDIT,
  SWAP_EDIT,
  SWAP_ADD,
  SAVING_ADD,
  SAVING_EDIT,
} from "./type";
import { instance } from "../../services/api";

// Edit Coin.
export const editCoin = (values) => (dispatch) => {
  dispatch({
    type: TRANSACTION_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/coin-settings", values)
    .then(({ data }) => {
      console.log("TRANSACTION_EDIT", data);
      dispatch({
        type: TRANSACTION_EDIT,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((err) => {
      dispatch({
        type: TRANSACTION_EDIT,
        payload: false,
      });
      console.log("TRANSACTION EDIT ==>", err.response);
      return Promise.reject(err);
    });
};

// Edit Swap.
export const editSwap = (values) => (dispatch) => {
  dispatch({
    type: SWAP_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/swap-settings", values)
    .then(({ data }) => {
      dispatch({
        type: SWAP_EDIT,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((error) => {
      dispatch({
        type: SWAP_EDIT,
        authorized: true,
        payload: false,
      });
      return Promise.reject(error);
    });
};

// Add Swap.
export const addSwap = (values) => (dispatch) => {
  dispatch({
    type: SWAP_ADD,
    payload: true,
  });
  return instance
    .post("/admin/swap-settings", values)
    .then(({ data }) => {
      dispatch({
        type: SWAP_ADD,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((error) => {
      dispatch({
        type: SWAP_ADD,
        authorized: true,
        payload: false,
      });
      return Promise.reject(error);
    });
};

// Edit Saving.
export const editSaving = (values) => (dispatch) => {
  dispatch({
    type: SAVING_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/saving-settings", values)
    .then(({ data }) => {
      dispatch({
        type: SAVING_EDIT,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((error) => {
      dispatch({
        type: SAVING_EDIT,
        authorized: true,
        payload: false,
      });
      return Promise.reject(error);
    });
};

// Add Saving.
export const addSaving = (values) => (dispatch) => {
  dispatch({
    type: SAVING_ADD,
    payload: true,
  });
  return instance
    .post("/admin/saving-settings", values)
    .then(({ data }) => {
      dispatch({
        type: SAVING_ADD,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      return data;
    })
    .catch((error) => {
      dispatch({
        type: SAVING_ADD,
        payload: false,
      });
      return Promise.reject(error);
    });
};
