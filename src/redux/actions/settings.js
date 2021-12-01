import { TRANSACTION_WOTCH, TRANSACTION_EDIT } from "./type";
import instance, { setInstance, removeInstance } from "../../services/api";

export const editCoin = (values) => (dispatch) => {
  dispatch({
    type: TRANSACTION_EDIT,
    payload: true,
  });
  return instance
    .put("/admin-coin-settings", values)
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
