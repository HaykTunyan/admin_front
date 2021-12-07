import axios from "axios";

const baseURL = "https://api.beincrypto.org/api";

const accessToken = localStorage.getItem("accessToken");
export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 6000,
});

const successResponse = (response) => {
  return response;
};
const errorResponse = (error) => {
  return Promise.reject(error);
};

const setHeaders = (reqConfig) => {
  reqConfig.headers["Content-Type"] = "application / json";
  if (accessToken) {
    reqConfig.headers.Authorization = "Bearer " + accessToken;
  }
  console.log("accessToken", accessToken);

  return reqConfig;
};

// axiosInstance.interceptors.response.use(successResponse, errorResponse);
axiosInstance.interceptors.request.use(setHeaders);
