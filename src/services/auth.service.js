// Authentication service.
import axios from "axios";

const API_URL = "http://nodejs.beincrypto.org:3000/api";

const postRegister = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const postLogin = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logOut = () => {
  localStorage.removeItem("user");
};

const authService = {
  postRegister,
  postLogin,
  logOut,
};

export default authService;
