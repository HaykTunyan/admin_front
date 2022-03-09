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
      },
      {
        id: "02",
        name: "macOS",
        count: "10 000 000",
        percent: "28",
      },
      {
        id: "03",
        name: "Linux",
        count: "3 000 000",
        percent: "10",
      },
      {
        id: "04",
        name: "Unix",
        count: "200 000",
        percent: "10",
      },
      {
        id: "05",
        name: "Others",
        count: "1 400 000",
        percent: "5",
      },
    ],
    uniqueCall: [
      {
        id: "01",
        users: 120000,
        device: "1680 × 1050",
        browsers: "Google Chrome ",
        percent: "48",
      },
      {
        id: "02",
        users: 60000,
        device: "1280 × 800",
        browsers: "Safari ",
        percent: "12",
      },
      {
        id: "03",
        users: 58000,
        device: "1400 × 1050",
        browsers: "Edge ",
        percent: "18",
      },
      {
        id: "04",
        users: 34000,
        device: "1920 × 1200",
        browsers: "Firefox ",
        percent: "8",
      },
      {
        id: "05",
        users: 30000,
        device: "1680 × 1050",
        browsers: "Samsung Internet ",
        percent: "4",
      },
      {
        id: "06",
        users: 24000,
        device: "1600 × 1200",
        browsers: "Opera ",
        percent: "4",
      },
      {
        id: "07",
        users: 21000,
        device: "1280 × 1024",
        browsers: "Google Chrome ",
        percent: "8",
      },
      {
        id: "08",
        users: 2000,
        device: "760 × 520",
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
        percent: "3",
        quantity: "300",
      },
      {
        id: "06",
        brand_name: "DELL G3 15",
        percent: "7",
        quantity: "700",
      },
      {
        id: "07",
        brand_name: "DELL G5",
        percent: "5",
        quantity: "500",
      },
    ],
    mobileCall: [
      {
        id: "01",
        brand_name: "Samsung",
        percent: "20",
        quantity: "2000",
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
        percent: "10",
        quantity: "1000",
      },
      {
        id: "04",
        brand_name: "Iphone SE",
        percent: "5",
        quantity: "500",
      },
      {
        id: "05",
        brand_name: "Iphone 12 Pro Max",
        percent: "2",
        quantity: "200",
      },
      {
        id: "06",
        brand_name: "Vivo",
        percent: "2",
        quantity: "200",
      },
      {
        id: "07",
        brand_name: "Apple",
        percent: "2",
        quantity: "200",
      },
      {
        id: "08",
        brand_name: "Iphone SE",
        percent: "2",
        quantity: "200",
      },
      {
        id: "09",
        brand_name: "Iphone 12 Pro Max",
        percent: "2",
        quantity: "200",
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
        percent: "5",
        quantity: "500",
      },
      {
        id: "04",
        brand_name: "Galaxy Tab A7",
        percent: "1",
        quantity: "100",
      },
      {
        id: "05",
        brand_name: "Galaxy Tab A 8.0",
        percent: "3",
        quantity: "300",
      },
      {
        id: "06",
        brand_name: "Galaxy Tab A 9.0",
        percent: "9",
        quantity: "800",
      },
      {
        id: "07",
        brand_name: "Galaxy Tab 10.0",
        percent: "7",
        quantity: "700",
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
