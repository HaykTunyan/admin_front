// Global API file.

import axios from "axios";
import { store } from "../redux/store";

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// });

const instance = axios.create({
  baseURL: "http://api.beincrypto.org/api",
});

export const setInstance = (access_token) => {
  localStorage.setItem("accessToken", access_token);
  instance.defaults.headers.Authorization = `Bearer ${access_token}`;
};

export const removeInstance = () => {
  localStorage.removeItem("accessToken");
  instance.defaults.headers.Authorization = "";
};

const storedToken = localStorage.getItem("accessToken");

if (storedToken) {
  setInstance(storedToken);
}

instance.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      console.log("response", response);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch({ type: "USER_LOGOUT" });
      removeInstance();
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

export default instance;
