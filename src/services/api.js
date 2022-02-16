// Global API file.
import axios from "axios";
import { store } from "../redux/store";
import { Navigate } from "react-router-dom";
import { logout_req } from "../redux/actions/users";

//const baseURL = "https://api.beincrypto.org/api";
axios.defaults.baseUrl = process.env.REACT_APP_DEV_API;

export const instance = axios.create({
  baseURL: axios.defaults.baseUrl,
  timeout: 60000,
});

const successResponse = (response) => {
  console.log("Response API", response);
  return response;
};

const errorResponse = (error) => {
  if (error.response?.status === 401) {
    console.log("ERROR in API ==>", error.response);
    console.log("Store ==>", store);
    store.dispatch(logout_req());
  }
  if (error.config.method !== "get" && error.response?.data?.message) {
    let message = error.response.data.message;
    if (error.response.data.errors) {
      message += `\n ${Object.values(error.response.data.errors)
        .map(({ msg }) => msg)
        .join(`\n`)}`;
    }
    if (error.config.url !== "/auth/login") {
    }
  }
  return Promise.reject(error);
};

const setHeaders = async (reqConfig) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    reqConfig.headers.Authorization = "Bearer " + accessToken;
    //console.log("AccessToken", accessToken);
  }

  return reqConfig;
};

instance.interceptors.response.use(successResponse, errorResponse);
instance.interceptors.request.use(setHeaders);
