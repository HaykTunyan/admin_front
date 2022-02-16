// Users Acions.

import { USER_LOADING, USER_LOADED, USER_LOGOUT, USER_LIST } from "./type";
import { instance } from "../../services/api";

export const signIn_req = (values) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: true,
  });
  return instance
    .post("/admin/login", values)
    .then(({ data }) => {
      console.log("Data", data);

      localStorage.setItem("accessToken", data.accessToken);
      dispatch({
        type: USER_LOADED,
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
        type: USER_LOADING,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const logout_req = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("theme");
};

export const getUserList_req = () => (dispatch) => {
  return instance
    .get("/admin/user/all", { mode: "no-cors" })
    .then(({ data: { data } }) => {
      dispatch({ type: USER_LIST, payload: { data } });
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    .finally(() => {
      dispatch({ type: USER_LIST, payload: false });
    });
};
