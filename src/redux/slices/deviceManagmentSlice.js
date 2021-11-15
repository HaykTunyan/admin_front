import { createSlice } from "@reduxjs/toolkit";

export const deviceManagmentSlice = createSlice({
  name: "deviceManagment",
  initialState: {
    desktopCall: [
      {
        id: "01",
        brand_name: "Dell XPS Desktop 8940",
        percent: "40",
        quantity: "4000",
      },
      {
        id: "02",
        brand_name: "Alienware Aurora R11",
        percent: "5",
        quantity: "500",
      },
      {
        id: "03",
        brand_name: "Apple iMac",
        percent: "15",
        quantity: "1500",
      },
      {
        id: "04",
        brand_name: "Apple Mac Mini M1",
        percent: "10",
        quantity: "1000",
      },
      {
        id: "05",
        brand_name: "Acer Aspire TC",
        percent: "30",
        quantity: "3000",
      },
      {
        id: "06",
        brand_name: "DELL G3 15",
        percent: "40",
        quantity: "4000",
      },
      {
        id: "07",
        brand_name: "DELL G5",
        percent: "50",
        quantity: "5000",
      },
    ],
    mobileCall: [
      {
        id: "01",
        brand_name: "Samsung",
        percent: "40",
        quantity: "4000",
      },
      {
        id: "02",
        brand_name: "Oppo",
        percent: "5",
        quantity: "500",
      },
      {
        id: "03",
        brand_name: "Xiaomi",
        percent: "15",
        quantity: "1500",
      },
      {
        id: "04",
        brand_name: "Iphone SE",
        percent: "5",
        quantity: "20",
      },
      {
        id: "05",
        brand_name: "Iphone 12 Pro Max",
        percent: "20",
        quantity: "100",
      },
      {
        id: "06",
        brand_name: "Vivo",
        percent: "10",
        quantity: "1000",
      },
      {
        id: "07",
        brand_name: "Apple",
        percent: "15",
        quantity: "3000",
      },
      {
        id: "08",
        brand_name: "Iphone SE",
        percent: "5",
        quantity: "20",
      },
      {
        id: "09",
        brand_name: "Iphone 12 Pro Max",
        percent: "20",
        quantity: "100",
      },
    ],
    tableCall: [
      {
        id: "01",
        brand_name: "Galaxy Tab S7",
        percent: "40",
        quantity: "4000",
      },
      {
        id: "02",
        brand_name: "Galaxy Tab S7+",
        percent: "5",
        quantity: "500",
      },
      {
        id: "03",
        brand_name: "Galaxy Tab S6",
        percent: "15",
        quantity: "1500",
      },
      {
        id: "04",
        brand_name: "Galaxy Tab A7",
        percent: "10",
        quantity: "1000",
      },
      {
        id: "05",
        brand_name: "Galaxy Tab A 8.0",
        percent: "30",
        quantity: "3000",
      },
      {
        id: "06",
        brand_name: "Galaxy Tab A 9.0",
        percent: "80",
        quantity: "8000",
      },
      {
        id: "07",
        brand_name: "Galaxy Tab 10.0",
        percent: "80",
        quantity: "8000",
      },
    ],
  },
  reducers: {
    // Reducer comes here
  },
  extraReducers: {
    // Extra reducer comes here
  },
});

export const userSelector = (state) => state.deviceManagment;
