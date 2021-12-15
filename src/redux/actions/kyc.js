// KYC API

import instance, { setInstance } from "../../services/api";
import { KYC_PANDING } from "./type";

export const editKYC = (values) => (dispatch) => {
  dispatch({
    type: KYC_PANDING,
    payload: true,
  });
  return instance
    .put("/admin/kyc", values)
    .then(({ data }) => {
      setInstance(data.accessToken);
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
