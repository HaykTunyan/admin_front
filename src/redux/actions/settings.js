import { TRANSACTION_EDIT, SWAP_EDIT, SWAP_ADD } from "./type";
import instance, { setInstance } from "../../services/api";

export const editCoin = (values) => (dispatch) => {
  dispatch({
    type: TRANSACTION_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/coin-settings", values)
    .then(({ data }) => {
      console.log("TRANSACTION_EDIT", data);
      setInstance(data.access_token);
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
      return Promise.reject(err);
    });
};

export const editSwap = (values) => (dispatch) => {
  dispatch({
    type: SWAP_EDIT,
    payload: true,
  });
  return instance
    .put("/admin/swap-settings", values)
    .then(({ data }) => {
      setInstance(data.access_token);
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
        payload: false,
      });
      return Promise.reject(error);
    });
};

export const addSwap = (values) => (dispatch) => {
  dispatch({
    type: SWAP_ADD,
    payload: true,
  });
  return instance
    .post("/admin/swap-settings", values)
    .then(({ data }) => {
      setInstance(data.access_token);
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
        payload: false,
      });
      return Promise.reject(error);
    });
};
