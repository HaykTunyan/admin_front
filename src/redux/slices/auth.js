import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./messageSlice";
import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const postRegister = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.postRegister(
        username,
        email,
        password
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const postLogin = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.postLogin(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async () => {
  await AuthService.logOut();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: true, user: user };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [postRegister.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [postRegister.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [postLogin.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [postLogin.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logOut.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
