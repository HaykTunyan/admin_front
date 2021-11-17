import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../services/api";

const initialState = {
  data: [],
  userListData: [],
  affiliateList: [
    {
      key: 1,
      id: "001",
      email: "Jon@elsteam.com",
      phone: "011000000",
      balance: "100",
      flexible_saving: "100",
      locked_saving: "100",
      receive: "500",
      status_kyc: "status",
      date_register: "01/10/2021",
    },
    {
      key: 2,
      id: "002",
      email: "Cersei@elsteam.com",
      phone: "011000000",
      balance: "100",
      flexible_saving: "100",
      locked_saving: "100",
      receive: "500",
      status_kyc: "status",
      date_register: "01/10/2021",
    },
    {
      key: 3,
      id: "003",
      email: "Jaime@elsteam.com",
      phone: "011000000",
      balance: "100",
      flexible_saving: "100",
      locked_saving: "300",
      receive: "300",
      status_kyc: "status",
      date_register: "01/03/2021",
    },
    {
      key: 4,
      id: "004",
      email: "Arya@elsteam.com",
      phone: "014000000",
      balance: "400",
      flexible_saving: "400",
      locked_saving: "400",
      receive: "400",
      status_kyc: "status",
      date_register: "01/04/2021",
    },
    {
      key: 5,
      id: "005",
      email: "Daenerys@elsteam.com",
      phone: "015000000",
      balance: "500",
      flexible_saving: "500",
      locked_saving: "500",
      receive: "500",
      status_kyc: "status",
      date_register: "01/05/2021",
    },
    {
      key: 6,
      id: "006",
      email: "Ferrara@elsteam.com",
      phone: "016000000",
      balance: "600",
      flexible_saving: "600",
      locked_saving: "600",
      receive: "600",
      status_kyc: "status",
      date_register: "01/06/2021",
    },
    {
      key: 7,
      id: "007",
      email: "Rossini@elsteam.com",
      phone: "017000000",
      balance: "700",
      flexible_saving: "700",
      locked_saving: "700",
      receive: "700",
      status_kyc: "status",
      date_register: "01/07/2021",
    },
    {
      key: 8,
      id: "008",
      email: "Harvey@elsteam.com",
      phone: "018000000",
      balance: "800",
      flexible_saving: "800",
      locked_saving: "800",
      receive: "800",
      status_kyc: "status",
      date_register: "01/08/2021",
    },
    {
      key: 9,
      id: "009",
      email: "Jon@elsteam.com",
      phone: "019000000",
      balance: "900",
      flexible_saving: "900",
      locked_saving: "900",
      receive: "900",
      status_kyc: "status",
      date_register: "01/09/2021",
    },
    {
      key: 10,
      id: "010",
      email: "Emma@elsteam.com",
      phone: "012000000",
      balance: "200",
      flexible_saving: "200",
      locked_saving: "200",
      receive: "600",
      status_kyc: "status",
      date_register: "01/11/2022",
    },
    {
      key: 11,
      id: "011",
      email: "Tom@email.com",
      phone: "013000000",
      balance: "300",
      flexible_saving: "300",
      locked_saving: "300",
      receive: "700",
      status_kyc: "status",
      date_register: "01/12/2022",
    },
    {
      key: 12,
      id: "012",
      email: "Jim@email.com",
      phone: "014000000",
      balance: "400",
      flexible_saving: "400",
      locked_saving: "400",
      receive: "800",
      status_kyc: "status",
      date_register: "12/12/2022",
    },
  ],
  UserInfoInList: [
    {
      id: "number",
      email: String,
      phone: String,
      balance: Number,
      flexible: {
        active: Number,
        finish: Number,
      },
      locked: {
        active: Number,
        finish: Number,
      },
      receive: Number,
      status: Boolean,
      registrationDate: Date,
      geoPosition: String,
      send: Number,
      referal: Number,
      currency: String,
    },
  ],
  listData: [
    {
      key: 1,
      number: "001",
      email: "name.example@gmail.com",
      phone: null,
      balance: 1,
      flexible: {
        active: 10,
        finish: 10,
      },
      locked: {
        active: 10,
        finish: 10,
      },
      receive: 10,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
    {
      key: 2,
      number: "002",
      email: "anahitv@elseteam.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
    {
      key: 3,
      number: "003",
      email: "email@email.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },

    {
      key: 4,
      number: "004",
      email: "mcozplorc@emlpro.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
    {
      key: 5,
      number: "005",
      email: "itspace.users.001@gmail.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
    {
      key: 6,
      number: "006",
      email: "fea@elseteam.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
    {
      key: 7,
      number: "007",
      email: "lilit@elseteam.com",
      phone: "89439394",
      balance: 100,
      flexible: {
        active: 100,
        finish: 40,
      },
      locked: {
        active: 100,
        finish: 40,
      },
      receive: 40,
      status: true,
      registrationDate: "11/11/21",
      geoPosition: "Yerevan",
      send: 100,
      referal: 100,
      currency: "RUB",
    },
  ],
};

const userListSlice = createSlice({
  name: "listUser",
  initialState,
  reducers: {
    setProducts(state, payload) {
      state.products = [];
    },
    success: (state, { payload }) => {
      state.data = payload;
    },
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const { reducer, success } = userListSlice.actions;

export const getUserList_req = () => (dispatch) => {
  return instance
    .get("/admin/user/all", { mode: "no-cors" })
    .then(async (data) => {
      console.log("data users list", data);
      // dispatch({ type: USER_LIST, payload: { data } });
      dispatch(await success(data));

      return data;
    })
    .catch((err) => {
      return Promise.reject(err);
    })
    .finally(() => {
      // dispatch({ type: USER_LIST, payload: false });
    });
};
export default userListSlice.reducer;
