import { createSlice } from "@reduxjs/toolkit";

export const deviceManagmentSlice = createSlice({
  name: "deviceManagment",
  initialState: {
    opetionCall: [
      {
        id: "01",
        name: "Microsoft Windows",
        count: "22 000 000",
        percent: "48",
        percent: "48",
      },
      {
        id: "02",
        name: "macOS",
        count: "10 000 000",
        percent: "28",
        percent: "28",
      },
      {
        id: "03",
        name: "Linux",
        count: "3 000 000",
        percent: "10",
        percent: "10",
      },
      {
        id: "04",
        name: "Others",
        count: "1 400 000",
        percent: "5",
        percent: "5",
      },
    ],
    uniqueCall: [
      {
        id: "01",
        name: "User Name",
        device: "Desktop",
        browsers: "Google Chrome ",
        percent: "48",
      },
      {
        id: "02",
        name: "User Name",
        device: "Desktop",
        browsers: "Safari ",
        percent: "12",
      },
      {
        id: "03",
        name: "User Name",
        device: "Tablet",
        browsers: "Edge ",
        percent: "18",
      },
      {
        id: "04",
        name: "User Name",
        device: "Mobile",
        browsers: "Firefox ",
        percent: "8",
      },
      {
        id: "05",
        name: "User Name",
        device: "Mobile",
        browsers: "Samsung Internet ",
        percent: "4",
      },
      {
        id: "06",
        name: "User Name",
        device: "Desktop",
        browsers: "Opera ",
        percent: "4",
      },
      {
        id: "07",
        name: "User Name",
        device: "Desktop",
        browsers: "Google Chrome ",
        percent: "8",
      },
      {
        id: "08",
        name: "User Name",
        device: "Mobile",
        browsers: "Google Chrome ",
        percent: "8",
      },
    ],
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
