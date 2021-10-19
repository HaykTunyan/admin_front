// Users Acions.

import { USER_LOADING, USER_LOADED, USER_LOGOUT, USER_LIST } from "./type";
import instance, { setInstance, removeInstance } from "../../services/api";

export const signIn_req = (values) => (dispatch) => {
  dispatch({
    type: USER_LOADING,
    payload: true,
  });
  return instance
    .post("/admin/login", values)
    .then(({ data }) => {
      console.log("Data", data);
      setInstance(data.access_token);
      dispatch({
        type: USER_LOADED,
        payload: {
          data: data,
          authorized: true,
          loading: false,
        },
      });
      console.log("date auth", data);
      console.log("date login ", data.access_token);
      return data;
    })
    .catch((err) => {
      dispatch({ type: USER_LOADING, payload: false });
      return Promise.reject(err);
    });
};

export const logout_req = () => (dispatch) => {
  instance.get("/admin/logout");
  dispatch({ type: USER_LOGOUT });
  removeInstance();
};

export const getUserList_req = () => (dispatch) => {
  return instance
    .get("/admin/user/all")
    .then(({ data: { data } }) => {
      dispatch({ type: USER_LIST, payload: { data } });
      console.log("data users list", data);
      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    .finally(() => {
      dispatch({ type: USER_LIST, payload: false });
    });
};
