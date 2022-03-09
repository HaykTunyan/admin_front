// Global API file.
import axios from "axios";
import { store } from "../redux/store";
import { logout_req } from "../redux/actions/users";

// REACT_APP_DEV_API= https://api.beincrypto.org/api => Dev Url
// REACT_APP_PRODUCTION_API=https://api.beincrypto.io/api => Production Url

axios.defaults.baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PRODUCTION_API;

axios.defaults.baseURL = process.env.NODE_ENV;

export const instance = axios.create({
  baseURL: axios.defaults.baseUrl,
  timeout: 60000,
});

const successResponse = (response) => {
  return response;
};

const errorResponse = (error) => {
  if (error.response?.status === 401) {
    store.dispatch(logout_req());
  }
  return Promise.reject(error);
};

const setHeaders = async (reqConfig) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    reqConfig.headers.Authorization = "Bearer " + accessToken;
  }

  return reqConfig;
};

instance.interceptors.response.use(successResponse, errorResponse);
instance.interceptors.request.use(setHeaders);
