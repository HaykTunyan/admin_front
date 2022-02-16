// User Managment API.

import {
  ADMIN_WOTCH,
  CREATE_ADMIN,
  CREATE_AFFILIATE,
  EDIT_ADMIN,
  EDIT_AFFILIATE,
} from "./type";
import { instance } from "../../services/api";

export const createAdmin = (values) => (dispatch) => {
  dispatch({
    type: ADMIN_WOTCH,
    payload: true,
  });
  return instance
    .post("/admin", values)
    .then(({ data }) => {
      dispatch({
        type: CREATE_ADMIN,
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
        type: CREATE_ADMIN,
        authorized: true,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const editAdmin = (values) => (dispatch) => {
  dispatch({
    type: EDIT_ADMIN,
    payload: true,
  });
  return instance
    .put("/admin", values)
    .then(({ data }) => {
      dispatch({
        type: EDIT_ADMIN,
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
        type: EDIT_ADMIN,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const createAffiliate = (values) => (dispatch) => {
  dispatch({
    type: CREATE_AFFILIATE,
    payload: true,
  });
  return instance
    .post("/admin/user", values)
    .then(({ data }) => {
      dispatch({
        type: CREATE_AFFILIATE,
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
        type: CREATE_AFFILIATE,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const editAffiliate = (values) => (dispatch) => {
  dispatch({
    type: EDIT_AFFILIATE,
    payload: true,
  });
  return instance
    .post("/admin/user", values)
    .then(({ data }) => {
      console.log("Data Edit Affiliate", data);
      dispatch({
        type: EDIT_AFFILIATE,
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
        type: EDIT_AFFILIATE,
        payload: false,
      });
      return Promise.reject(err);
    });
};
