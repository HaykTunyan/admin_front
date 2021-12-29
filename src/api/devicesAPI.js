import { instance } from "../services/api";

export const getAllDevices = async (data) => {
  const response = await instance.get(`/devices/data`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getMobileDevices = async (data) => {
  const response = await instance.get(`/devices/data`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getTabletDevices = async (data) => {
  const response = await instance.get(`/devices/data`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getDescktopDevices = async (data) => {
  const response = await instance.get(`/devices/data`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
