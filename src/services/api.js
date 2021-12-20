// Global API file.
import axios from "axios";

const baseURL = "https://api.beincrypto.org/api";

export const instance = axios.create({
  baseURL: baseURL,
  timeout: 60000,
});

const successResponse = (response) => {
  return response;
};
const errorResponse = (error) => {
  return Promise.reject(error);
};

const setHeaders = async (reqConfig) => {
  //reqConfig.headers.Accept = "multipart/form-data";
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    reqConfig.headers.Authorization = "Bearer " + accessToken;
    //console.log("AccessToken", accessToken);
  }

  return reqConfig;
};

//instance.interceptors.response.use(successResponse, errorResponse);
instance.interceptors.request.use(setHeaders);
instance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      console.log("response", response);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // store.dispatch({ type: "USER_LOGOUT" });
      // removeInstance();
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
  }
);
