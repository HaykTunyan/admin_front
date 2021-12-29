// KYC API

import { instance } from "../../services/api";
import { KYC_PANDING, KYC_VERIFYED } from "./type";

export const editKYC = (values) => (dispatch) => {
  dispatch({
    type: KYC_PANDING,
    payload: true,
  });
  return instance
    .put("/admin/kyc", values)
    .then(({ data }) => {
      dispatch({
        type: KYC_PANDING,
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
        type: KYC_PANDING,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const verifyKyc = (user_id, status_kyc) => (dispatch) => {
  dispatch({
    type: KYC_VERIFYED,
    payload: true,
  });
  return instance
    .put("/admin/kyc", { user_id, status_kyc })
    .then(({ data }) => {
      dispatch({
        type: KYC_VERIFYED,
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
        type: KYC_VERIFYED,
        payload: false,
      });
      return Promise.reject(err);
    });
};
