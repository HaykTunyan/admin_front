import { GENERET_REFERRAL, ASSIGN_REFERRAL } from "./type";
import { instance } from "../../services/api";

export const generateReferral = () => (dispatch) => {
  dispatch({
    type: GENERET_REFERRAL,
    payload: true,
  });
  return instance
    .post("/admin/referral")
    .then(({ data }) => {
      dispatch({
        type: GENERET_REFERRAL,
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
        type: GENERET_REFERRAL,
        payload: false,
      });
      return Promise.reject(err);
    });
};

export const assigneReferralUser = (values) => (dispatch) => {
  dispatch({
    type: ASSIGN_REFERRAL,
    payload: true,
  });
  return instance
    .post("/admin/referral/user", values)
    .then(({ data }) => {
      dispatch({
        type: ASSIGN_REFERRAL,
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
        type: ASSIGN_REFERRAL,
        payload: false,
      });
      return Promise.reject(err);
    });
};
